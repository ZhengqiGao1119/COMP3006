<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-header">
        <img style="width: 75px; height: 75px;float: left;padding-right: 30px;" src="../assets/img/logo.jpg"
             alt=""/>
        <div class="login-form-text">Cinema Booking System - Backend Management</div>
      </div>
      <div style="color: #91949c;font-weight: bolder">

        <p>Username</p>
        <el-input class="login-form-input" v-model="username" placeholder="Account"></el-input>

        <p>Password</p>
        <el-input class="login-form-input" placeholder="Password" v-model="password" show-password></el-input>
        <el-alert
          v-if="passwordError"
          title="Please enter your password with at least 6 character."
          type="error"
          show-icon>
        </el-alert>


        <div style="padding-top: 10px">
          <el-checkbox v-model="remember">Remember the password.</el-checkbox>
        </div>
        <el-button :loading="loading" @click="postLogin" class="login-form-button" type="primary">SIGN IN
        </el-button>
      </div>
      <div class="login-form-footer">
        <div style="font-weight: bolder;font-size: 16px;color: #91949c;"
             :underline="false">
          Copyright 2024 Cinema Booking System - Backend Management
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Login} from "../api/user"
  import md5 from 'md5'

  export default {
    inject:['reload'],
    data() {
      return {
        loading: false,
        role: '',
        username: '',
        password: '',
        remember: false,
        usernameError: false,
        passwordError: false,
        roleError: false,
      }
    },
    methods: {
      postLogin() {
        this.loading = true;
        const LoginData = {
          account: this.username,
          password: md5(this.password),
          remember: this.remember,
        };

        Login(LoginData).then(res => {
          if (!res.success) {
            setTimeout(() => {
              this.loading = false;
            }, 700)
          } else {
            setTimeout(() => {
              console.log(res.data)
              console.log(this.role)
              localStorage.setItem("token", res.data.token)
              if (this.role === 'admin') {
                localStorage.setItem("username", res.data.username)
              }
              if (this.role === 'worker') {
                localStorage.setItem("wid", res.data.id)
                localStorage.setItem("username", res.data.username)
              }
              localStorage.setItem("role", this.role)
              this.$router.push("/")
              this.loading = false;
              this.$message({
                message: 'Login Successful',
                type: 'success',
              });
            }, 100)
          }
        })

      }
    }
  }
</script>

<style scoped>

  .login {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    background-position: center;
    background-size: cover;
    background-image: url("../assets/img/login-bg.jpg");
  }

  .login-form {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 2px;
  }

  .login-form-header {
    height: 20px;
    padding-left: 40px;
    padding-bottom: 100px;
  }

  .login-form-text {
    color: #FBEAFF;
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

</style>
