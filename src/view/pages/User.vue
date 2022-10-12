<template>
    <div class="user-list">
        <div class="search">
            <el-form label-position="left" inline v-model="searchForm">
                <el-form-item label="姓名">
                    <el-input clearable v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                        v-model="searchForm.birthday"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input clearable v-model="searchForm.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="augment">新增</el-button>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                border>
                <el-table-column
                    v-for="(el, index) in tableHead"
                    :key="index"
                    :prop="el.prop"
                    align="center"
                    header-align="center"
                    :label="el.name">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    align="center"
                    header-align="center"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="warning" round @click="compile(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" round @click="deleteData(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageInfo.currentPage"
                :page-sizes="[10,15,20,30]"
                :page-size="pageInfo.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <el-drawer
            title="新增表单"
            :visible.sync="dialog"
            v-if="dialog"
            :before-close="beforeClose">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input clearable v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userCode">
                    <el-input clearable v-model="form.userCode"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input clearable v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <div class="button">
                <el-button @click="beforeClose">取消</el-button>
                <el-button type="primary" @click="add">保存</el-button>
            </div>
        </el-drawer>
        <el-drawer
            title="修改表单"
            :visible.sync="dialog2"
            v-if="dialog2"
            :before-close="beforeClose">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input clearable v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userCode">
                    <el-input clearable v-model="form.userCode"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input clearable v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <div class="button">
                <el-button @click="beforeClose">取消</el-button>
                <el-button type="primary" @click="modify">保存</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import axios from '@/assets/axios/User.js'
export default {
    name: 'blog',
    data() {
        return {
            // 查询表单
            searchForm: {
                name: '',
                birthday: '',
                address: ''
            },
            // 新建表单
            form: {},
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                userCode: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            },
            // 表格数据
            tableData: [],
            // 表头
            tableHead: [{
                name: '姓名',
                prop: 'name'
            }, {
                name: '用户名',
                prop: 'userCode'
            }, {
                name: '生日',
                prop: 'birthday'
            }, {
                name: '家庭住址',
                prop: 'address'
            }],
            // 分页信息
            pageInfo: {
                currentPage: 1,
                pageSize: 10,
            },
            // 总条数
            total: 0,
            // 新增表单
            dialog: false,
            // 修改表单
            dialog2: false,
        }
    },
    mounted() {
        // axios.getUserTableHead()
        // .then(res => {
        //     this.tableHead = res.data
        // })
        this.getTableData()
    },
    methods: {
        // 查询方法
        getTableData() {
            let {searchForm, pageInfo} = this
            axios.getUserTableData({
                page: pageInfo.currentPage,
                size: pageInfo.pageSize,
                ...searchForm
            })
            .then(res => {
                this.tableData = res.data.tableData
                this.total = res.data.count
            })
        },
        // 查询按钮
        search() {
            this.getTableData()
        },
        // 重置按钮
        reset() {
            for (let val in this.searchForm) {
                this.searchForm[val] = ''
            }
            this.getTableData()
        },
        // 新增按钮
        augment() {
            this.dialog = true
        },
        // 编辑按钮
        compile(row) {
            this.form = {...row}
            this.dialog2 = true
        },
        // 删除按钮
        deleteData(row) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                let id = row.id
                axios.deleteUserInfo(id)
                .then(() => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTableData()
                })
                .catch(err => {
                    this.$message({
                        message: res,
                        type: 'warning'
                    });
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 修改按钮
        modify() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    axios.updateUserInfo(this.form)
                    .then(() => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.beforeClose()
                        this.getTableData()
                    })
                }
            })
        },
        // 关闭弹窗回调方法
        beforeClose(done) {
            this.form = {}
            if (typeof done === 'function') done()
            else this.dialog = this.dialog2 = false
        },
        // 确认新增
        add() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    axios.addUserInfo(this.form)
                    .then(res => {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.dialog = false
                        this.getTableData()
                    })
                }
            })
        },
        // 改变每页显示条数
        handleSizeChange(val) {
            this.pageInfo.pageSize = val
            this.pageInfo.currentPage = 1
            this.getTableData()
        },
        // 改变页数
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val
            this.getTableData()
        },
    }
}
</script>

<style lang="scss" scoped>

.search{
    display: flex;
    justify-content: space-between;
    // margin: 30px 20px;
    .el-form{
        .el-form-item{
            .el-input{
                width: 200px;
            }
        }
    }
}
.table {
    margin: 20px 0px;
}
.pagination {
    display: flex;
    justify-content: flex-end;
    margin-right: 30px;
}
.el-drawer__wrapper {
    .el-drawer__container {
        .el-drawer {
            .el-drawer__header {}
            .el-drawer__body {
                .el-form {
                    margin-top: 60px;
                    .el-form-item {
                        margin-left: 50px;
                        width: 450px;
                        display: flex;
                        justify-content: space-between;
                        .el-form-item__label {
                        }
                        .el-form-item__content {
                            .el-input,.el-date-editor {
                                width: 300px;
                            }
                        }
                    }
                    .el-form-item::before {
                        display: none;
                    }
                    .el-form-item::after {
                        display: none;
                    }
                }
                .button {
                    margin-left: 25%;
                    height: 10%;
                    width: 50%;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                }
            }
        }
    }
}
</style>