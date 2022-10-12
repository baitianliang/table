<template>
    <div class="head">
        <div class="head-left">
            <!-- <img src="../../assets/img/icon/favicon.png"> -->
            DEMO
        </div>
        <div class="head-right">
            <div>欢迎</div>
            
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="quit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button type="text">退出</el-button> -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: ''
        }
    },
    mounted() {
        this.userName = sessionStorage.getItem('userName')
    },
    methods: {
        handleCommand(command) {
            // 退出登录
            if(command === 'quit') {
                this.$alert('是否确认退出?', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message.success('退出成功!')
                        this.$router.push({name: 'Login'})
                        sessionStorage.clear()
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss">
.head {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // height: 40px;
    .head-left {
        font-size: 20px;
        color: #3C3C3C;
        line-height: 28px;
        font-weight: 500;
        display: flex;
        align-items: center;
        img {
            width: 41px;
            height: 41px;
            margin-right: 26px;
        }
        .el-dropdown {
            margin-left: 50px;
            font-size: 18px;
        }
    }
    .head-right {
        display: flex;
        align-items: center;
        font-size: 20px;
        >:nth-child(1) {
            margin-right: 20px;
            color: cadetblue;
        }
        .el-dropdown-link {
            font-size: 20px;
            // margin-left: 20px;
        }
    }
}
</style>