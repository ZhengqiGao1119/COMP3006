<template>
  <div class="login">

    <div class="login-form">
      <el-form ref="loginForm" :model="loginForm">
        <div class="login-form-header">
          <img style="width: 75px; height: 75px;float: left;padding-right: 40px;" src="../assets/img/logo.jpg"
               alt=""/>
          <div class="login-form-text">Cinema Booking System - LOGIN</div>
        </div>
        <div style="color: #91949c;font-weight: bolder">
          <el-form-item>
            <p>Username</p>
            <el-input class="login-form-input" v-model="loginForm.username" placeholder="Account"></el-input>
          </el-form-item>
          <el-form-item>
            <p>Password</p>
            <el-input class="login-form-input" placeholder="Password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <div style="padding-top: 10px">
            <el-checkbox v-model="loginForm.remember">Remember the password.</el-checkbox>
            <div style="float: right">
              <el-link href="/forget" style="font-weight: bolder;font-size: 14px;color: #91949c;"
                       :underline="false">
                Forgot your password?
              </el-link>
            </div>
        </div>
          <el-form-item>
            <el-button
              class="login-form-button"
              type="primary"
              @click.native.prevent="handleLogin"
              >
              SIGN IN
            </el-button>
          </el-form-item>
        </div>
      </el-form>

      <div class="login-form-footer">
        <el-link href="/register" style="font-weight: bolder;font-size: 16px;color: #91949c;"
                 :underline="false">
          Don't have an account yet? Sign up.
          <i style="font-weight: bolder;font-size: 15px" class="el-icon-right"></i>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>

  import {Login} from "../api/user";
  import md5 from 'md5'
  import Cookies from "js-cookie";
  import { encrypt, decrypt } from '../utils/jsencrypt';
  import config from '../config';
  import {verifyTicker} from "../api/user";



  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          remember: false,
        },
        ticket : "",
        randstr : "",
        userIp : ""
      }
    },

    created() {
    },

    methods: {
      postLogin() {
        const LoginData = {
          account: this.loginForm.username,
          password: md5(this.loginForm.password),
          remember: this.loginForm.remember
        };
        Login(LoginData).then(res => {
          console.log(res, 'login')
          const data = res.result
          localStorage.setItem("uid", data._id);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            this.$router.push({path: '/'})
          }, 1000)
        })
      },


      handleLogin() {
        if (this.loginForm.username.length < 1) {
          this.$message({
            message: 'Enter the account number Cannot be empty',
            type: 'warning'
          });
          return
        }
        if (this.loginForm.password.length < 1) {
          this.$message({
            message: 'Enter the passwordCannot be empty',
            type: 'warning'
          });
          return
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            console.log("log in")
            this.loading = true;
            this.postLogin();
          }
        });
      },


    }
  }
</script>

<style scoped>

  .login {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    background-position: left;
    background-size: cover;
    background-image: url("../assets/img/login-bg.jpg");
  }

  .login-form {
    width: 500px;
    position: absolute;
    left: 65%;
    top: 55%;
    transform: translate(-50%, -60%);
    letter-spacing: 2px;
  }

  .login-form-header {
    height: 10px;
    padding-left: 45px;
    padding-bottom: 80px;
  }

  .login-form-text {
    color: #000000;
    font-weight: bold;
    font-size: 30px;
    padding-top: 15px;
  }

  .login-form-input {
    margin-bottom: 10px;
  }

  .login-form-button {
    border-radius: 3px;
    width: 100%;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 2px;
    height: 60px;
    background: #5a84fd;
    box-shadow: 0 5px 30px rgb(0 66 8.5%);
    margin-top: 35px;
  }

  .login-form-footer {
    font-weight: bolder;
    color: #91949c;
    padding-top: 40px;
    text-align: center;
  }

  .el-input__inner {
    height: 48px;
  }

  .el-checkbox {
    color: #91949c;
    font-weight: bolder;
    font-size: 15px;
  }

  .el-button {
    background-color: #845EC2;
    border: 1px solid #a93ac2;
    color: white;
  }

  .login-form p{
    margin-bottom:2%;
  }
</style>
