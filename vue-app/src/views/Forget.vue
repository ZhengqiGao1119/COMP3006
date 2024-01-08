<template>
  <div class="forget">
    <div class="register-container">
      <h1 class="title">Retrieve password</h1>
      <el-card class="box-card" style="background: rgba(255, 255, 255, 0.8)" shadow="hover" >
        <el-steps  :active="active" finish-status="success" align-center style="width: 580px; margin-left: -30px" >
          <el-step title="Confirm account"> </el-step>
          <el-step title="Reset password"> </el-step>
          <el-step title="Reset Successful"> </el-step>
        </el-steps>
        <div style="margin-top: 30px">
          <el-form :model="utform" ref="utform" :rules="rules"  validate-on-rule-change>

            <div v-if="active == 0">
              <el-form-item prop="username">
                <el-input v-model="utform.username" placeholder="username" prefix-icon="el-icon-user" size="medium" @blur="validateHandler('username')" />
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model="utform.phone" placeholder="phone" prefix-icon="el-icon-phone-outline" size="medium" @blur="validateHandler('phone')" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%" @click="existUsername" >Confirm</el-button>
              </el-form-item>
            </div>

            <div v-if="active == 1">
              <el-form-item prop="username">
                <el-input disabled v-model="utform.username" size="medium" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="utform.password" placeholder="New password." type="password" prefix-icon="el-icon-lock" size="medium" clearable @blur="validateHandler('password')" />
              </el-form-item>
              <el-form-item prop="password2">
                <el-input v-model="utform.password2" placeholder="Confirm new password." type="password" prefix-icon="el-icon-lock" size="medium" clearable @blur="validateHandler('password2')"/>
              </el-form-item>
              <el-button  @click="resetPassword" size="medium" type="primary" style="width: 100%;margin:5px 0 15px 0;" >Confirm</el-button>
            </div>

            <div v-if="active == 3" style="text-align: center">
              <h2 style="margin-bottom: 20px; color: black">
                The password reset was successful, please re-log in!
              </h2>
              <el-button @click="turnLogin" size="medium">Relog in</el-button
              >
            </div>

          </el-form>
        </div>
        <div class="login-form-footer">
          <el-link href="/login" style="font-weight: bolder;font-size: 16px;color: #91949c;margin-left: 150px"
                   :underline="false">
                   I remember. Back to login.
            <i style="font-weight: bolder;font-size: 15px" class="el-icon-right"></i>
          </el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        existUsernameFlag: 0,
        active: 0,
        isCodeShow: true,
        count: 0,
        timer: {},
        utform: {
          phone: '',
          username: "",
          code: "",
          password: "",
          password2: "",
        },
        rules: {
          username: [
            {required: true, message: "username Cannot be empty", trigger: "blur" },
            {required: true, min: 1,message: "username not less than 1 character",trigger: "blur"},
          ],
          phone: [
            { required: true, message: 'phone number Cannot be empty！', trigger: 'blur' },
            {
              validator: function(rule, value, callback) {
                if (/[0-9]/.test(value) == false) {
                  callback(new Error("Wrong format of cell phone number"));
                } else {
                  callback();
                }
              },
              trigger: "change"
            }
          ],
          password: [
            {required: true, message: "password Cannot be empty", trigger: "blur" },
            {pattern: /[~!@#$%^&*\_.0-9a-zA-Z]{6,16}$/,message: "password 6-16 characters consisting of letters, numbers or punctuation marks",trigger: "blur"},
          ],
          password2: [
            {required: true, message: "Verify that password Cannot be empty", trigger: "blur" },
            {validator: this.validatePassword, trigger: "blur"},
          ],
        },
      };
    },
    methods: {
      turnLogin(){
        this.$router.push('/login')
      },
      validateHandler(fieldName) {
        this.$refs.utform.validateField(fieldName);
      },
      existUsername() {
        let valid;
        this.$refs.utform.validate((v) => (valid = v));
        if (!valid){return;}
        console.log('ddd')
        this.$axios
          .get("/api/cp/user/findByUserName?username=" + this.utform.username + "&phone=" + this.utform.phone)
          .then((res) => {
            let exist = false;
            if (res.data.data != null) {
              exist = true;
            }

            this.existUsernameFlag = exist ? 2 : 1;
            if (exist) {
              this.active = 1;
            } else {
              this.$message.error("User information does not exist or User information is incorrect!");
            }
          });
      },
      resetPassword() {
        this.$refs.utform.validate((valid) => {
          if (!valid){return;}
          let params = {
            phone: this.utform.phone,
            username: this.utform.username,
            code: this.utform.code,
            password: this.utform.password,
            password2: this.utform.password2,
          };
          this.$axios
            .post("/api/cp/user/reset", params)
            .then((res) => {
              this.active = 3;
            })
            .catch((error) => {
              let errMsg = error.response.data.msg;
              this.$message.error(errMsg);
            });
        });
      },
      validatePassword(rule, value, callback){
        if (value == "") {
          callback(new Error("Please enter your password again."));
        } else if (value !== this.utform.password) {
          callback(new Error("Inconsistency between two password entries!"));
        } else {
          callback();
        }
      },
      validateEmail(rule, value, callback){
        if (!value) {
          callback(new Error("username Cannot be empty"));
        }
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        const regphone = /^[1][3,4,5,6.7,8,9][0-9]{9}$/;
        if (value.match(regEmail) || value.match(regphone)) {
          callback();
        } else {
          callback(new Error("Please enter your correct email/mobile phone number."));
        }
      },

      getQueryParam(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      },
    }
  };
</script>

<style scoped>
  .forget {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    background-position: left;
    background-size: cover;
    background-image: url("../assets/img/login-bg.jpg");
  }

  .register-container {
    width: 570px;
    height: 450px;

    transform: translate(-50%, -60%);
    position: absolute;
    left: 65%;
    top: 50%;
    /* background: violet; */
  }
  .title {
    color: black;
    letter-spacing: 2px;
    text-align: center;
    margin-bottom: 50px;
  }
  #code {
    width: 120px;
    height: 36px;
    margin-left: 33px;
  }
  .el-button {
    background-color: #a93ac2;
    border: 1px solid #a93ac2;
    color: white;
  }
</style>
