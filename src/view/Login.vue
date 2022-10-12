<template>
    <div id="login">
        <div class="star">
            <div>★</div>
            <div>.</div>
            <div>★</div>
            <div>★</div>
        </div>
        <div class="line">
            <div></div>
            <div></div>
        </div>
        <div class="login-content">
            <div class="title">登录</div>
            <el-divider></el-divider>
            <el-form label-position="left" v-model="form">
                <el-form-item label="用户名">
                    <el-input clearable v-model="form.userCode"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" clearable v-model="form.passWord"></el-input>
                </el-form-item>
            </el-form>
            <div class="button" @click="login">登录</div>
        </div>
    </div>
</template>

<script>
import axios from '@/assets/axios/User.js'
export default {
    data() {
        return {
            form: {}
        }
    },
    methods: {
        login() {
            if(!this.form.userCode)
            return this.$message.info('请输入用户名')
            if(!this.form.passWord)
            return this.$message.info('请输入密码')
            axios.login(this.form)
            .then(res => {
                this.$message.success('登录成功')
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('ruleId', res.data.ruleId)
                sessionStorage.setItem('userName', res.data.userName)
                if(res.data.ruleId == 1) this.$router.push({name: 'User'})
                else this.$router.push({name: 'DailyPlan'})
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#login {
    height: 100%;
    width: 100%;
    // background-image: radial-gradient(farthest-corner at 30% 45%, #fffbfa, #c18bb0, #d7aefe, #2f518b, #001344, #05123b);
    background-image: radial-gradient(farthest-corner at 30% 45%, #fffbfa, #c18bb0, #2f518b, #001344, #05123b);
    .star {
        cursor: default;
        >div {
            position: fixed;
            color: #e4e9c8;
        }
        :nth-child(1) {
            right: 40px;
            top: 100px;
            font-size: 10px;
            // font-size: 40px;
        }
        :nth-child(2) {
            right: 100px;
            top: 300px;
            // font-size: 10px;
            font-size: 25px;
        }
        :nth-child(3) {
            right: 150px;
            bottom: 50px;
            font-size: 20px;
        }
        :nth-child(4) {
            right: 300px;
            bottom: 150px;
            font-size:13px;
        }
    }
    .line {
        >div {
            cursor: default;
            position: fixed;
            background: #ffffff;
        }
        :nth-child(1) {
            width: 3px;
            height: 3px;
            right: 500px;
            top: 150px;
            border-radius: 50%;
            box-shadow: 0 0 4px 4px #636262;
        }
        :nth-child(1):after {
            content: "";
            display: block;
            border: 0px solid #fff;
            border-width: 1px 200px;
            border-color: transparent transparent transparent
            rgba(255, 255, 255, 0.3);
            transform: rotate(-30deg) translate3d(1px, 1px, 0);
            transform-origin: 0% 0%;
        }
        :nth-child(2) {
            width: 4px;
            height: 4px;
            right: 700px;
            bottom: 150px;
            border-radius: 50%;
            box-shadow: 0 0 5px 6px #636262;
        }
        :nth-child(2):after {
            content: "";
            display: block;
            border: 0px solid #fff;
            border-width: 2px 260px;
            border-color: transparent transparent transparent
            rgba(255, 255, 255, 0.3);
            transform: rotate(20deg) translate3d(0px, 0px, 1px);
            transform-origin: 0% 0%;
        }
    }
    .login-content {
        position: relative;
        top: 150px;
        left: 300px;
        height: 500px;
        width: 600px;
        border: 1px solid #000000;
        border-radius: 50%;
        box-shadow: 0 0 5px 2px;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 30px;
        overflow: hidden;
        .title {
            color: #0004ff;
            text-align: center;
            font-size: 40px;
            letter-spacing: 5px;
            padding-top: 0px;
            font-weight: bold;
        }
        .el-divider {
            margin-top: 10px;
            height: 2px;
            width: 464px;
            margin-left: 37px;
        }
        .el-form {
            margin-top: 50px;
            padding: 0px 37px;
        }
        .button {
            position: absolute;
            cursor: pointer;
            width: 70%;
            padding: 20px;
            font-size: 18px;
            text-align: center;
            left: 15%;
            bottom: 0px;
            margin-top: 20px;
            text-align: center;
            border-radius: 50% / 0 0 100% 100%;
            border-top: 1px solid #000000;
            box-shadow: 0px -4px 10px 1px #000000;
            background-color: #0004ff;
            color: #ffe100;
        }
        .button:hover {
            background-color: #3f42e0;
        }
        .button:active {
            background-color: #0004ff;
        }
    }
}
</style>