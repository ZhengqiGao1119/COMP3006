<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-header">
        <img style="width: 75px; height: 75px;float: left;padding-right: 40px;" src="../assets/img/logo.jpg"
             alt=""/>
        <div class="login-form-text">Cinema Booking System - Register</div>
      </div>
      <div style="color: #91949c;font-weight: bolder">
        <p>Phone</p>
        <el-input class="login-form-input" v-model="phone" placeholder="Phone"></el-input>
        <p>Username</p>
        <el-input class="login-form-input" v-model="username" placeholder="Account"></el-input>
        <p>Password</p>
        <el-input class="login-form-input" placeholder="Password" v-model="password" show-password></el-input>

        <el-input class="login-form-input" placeholder="Confirmation Password" v-model="checkPassword"
                  show-password></el-input>
        <div style="padding-top: 10px">
          <el-checkbox v-model="agree">I agree to the "Cinema Booking System" User Registration Agreement!</el-checkbox>
          <el-button icon="el-icon-view" @click="drawer = true" type="small" style="margin-left: 16px;color: #91949c;background: #dedede;border-color: #dedede" round plain>
            Click to view
          </el-button>
        </div>
        <el-button @click="postLogin" class="login-form-button" type="primary">Register</el-button>
      </div>
      <div class="login-form-footer">
        <el-link href="/login" style="font-weight: bolder;font-size: 16px;color: #91949c;"
                 :underline="false">
                 I have an account. Go login.
          <i style="font-weight: bolder;font-size: 15px" class="el-icon-right"></i>
        </el-link>
      </div>
    </div>
    <div class="com">
      <el-drawer
        size="500px"
        title="Title"
        :visible.sync="drawer"
        :append-to-body="true"
        :with-header="false">
        <span>{{test}}</span>
      </el-drawer>
    </div>
  </div>

</template>

<script>

  import {Register} from "@/api/user"
import md5 from "md5";

  export default {
    data() {
      return {
        phone: '',
        username: '',
        password: '',
        checkPassword: '',
        agree: false,
        drawer: false,
        test: '',
      }
    },
    methods: {
      postLogin() {
        let regex = /[0-9]/;
        if (!regex.test(this.phone)) {
          this.$message({
            message: 'Please enter the correct cell phone format',
            type: 'warning'
          });
          return
        }
        if (this.username.length < 1) {
          this.$message({
            message: 'Please enter a username of at least 6 character.',
            type: 'warning'
          });
          return
        }
        if (this.password.length < 6) {
          this.$message({
            message: 'The length of the password must not be less than 6 character.',
            type: 'warning'
          });
          return
        }
        if (this.agree === false) {
          this.$message({
            message: 'Please check the box I agree to the "Cinema Booking System" User Registration Agreement!',
            type: 'warning'
          });
          return
        }
        if (this.password !== this.checkPassword) {
          this.$message({
            message: 'You entered a different password twice!!',
            type: 'warning'
          });
          return
        }
        const LoginData = {
          phone: this.phone,
          username: this.username,
          password: md5(this.password),
          remember: this.remember
        };
        console.log(LoginData);
        Register(LoginData).then(res => {
          if (res.success) {
            this.$message({
              message: 'Registration is successful, please log in!',
              type: 'success'
            });
            this.$router.push("/login")
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
    background-position: left;
    background-size: cover;
    background-image: url("../assets/img/login-bg.jpg");
  }

  .login-form {
    width: 500px;
    position: absolute;
    left: 65%;
    top: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 2px;
  }

  .login-form-header {
    height: 15px;
    padding-left: 45px;
    padding-bottom: 100px;
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
