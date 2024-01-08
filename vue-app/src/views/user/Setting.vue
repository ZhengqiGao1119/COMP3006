<template>
  <div>
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 20px">Basic settings</h3>

    <div>
      <el-form style="width: 350px;float: left" label-position="top" ref="form" :model="user" label-width="80px" :rules="rules">
        <el-form-item style="padding: 0" label="nickname" prop="username">
          <el-input v-model="user.username" placeholder="Enter Username"></el-input>
        </el-form-item>
        <el-form-item style="padding-top: 12px" label="phone" prop="phone" >
          <el-input v-model="user.phone" placeholder="Please fill in your cell phone number carefully"></el-input>
        </el-form-item>
        <el-form-item label="gender" prop="gender" style="padding-top: 12px">
          <el-select style="width: 200px" v-model="user.gender" placeholder="Please select gender">
            <el-option label="male" value="male"></el-option>
            <el-option label="female" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="birthday" prop="birthday">
          <el-col>
            <el-date-picker
              type="date" placeholder="Select Date"
              v-model="user.birthday"
              value-format="yyyy-MM-dd"
              :picker-options="birthday"
              style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item style="padding: 0" label="email" prop="email">
          <el-input type="email" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="info" prop="info">
          <el-input :rows="3" type="textarea" v-model="user.info" placeholder="You may input up to 500 characters." maxlength="500"></el-input>
        </el-form-item>
        <el-form-item style="padding-top: 10px; transform: translate(140%, -400%);">
          <el-button type="primary" @click="onSubmit">Save</el-button>
        </el-form-item>
      </el-form>
      <div>
        <img style="padding-bottom: 10px;padding-left: 150px;width: 150px; height: 150px;" alt=""
             :src="user.avatar">
        <el-upload
          style="padding-left: 500px;letter-spacing: 1px"
          class="upload-demo"
          accept=".png,.jpg"
          :headers="header"
          :action="uploadAction"
          :on-success="handleUploadSuccess"
          multiple
          :limit="1">
          <el-button style="width: 150px" size="small" type="primary">
            <i class="el-icon-upload2"></i> Click to upload
          </el-button>
          <div slot="tip" class="el-upload__tip">Only jpg/png files can be uploaded</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import {findById, updateUser} from "@/api/user";
  import config from "@/config";

  export default {

    data() {
      return {
        rules: {
          username: [
            { required: false, min:1, message: 'Please enter a username with at least 1 character!', trigger: 'blur' },
          ],
          info: [
            { required: false, max: 500, trigger: 'blur' },
          ],
          phone: [
            { required: true, message: 'Phone cannot be empty！', trigger: 'blur' },
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
          email: [
            {
              validator: function(rule, value, callback) {
                if (value == null || value == '' || value == undefined) {
                  callback("Please enter.");
                } else {
                  if (/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) == false) {
                    callback(new Error("Email format error"));
                  } else {
                    callback()
                  }
                }
              },
              trigger: "blur"
            }
          ],

        },
        header: {
          "Authorization": localStorage.getItem("token")
        },
        uploadAction: config.API_URL + '/common/upload-file',
        user: {
          username: '',
          password: '',
          email: '',
          birthday: '',
          gender: '',
          info: '',
          avatar: ''
        },
        birthday: {
          disabledDate: time => {
              return (time.getTime() > Date.now() - 8.64e7)
          },
        },
      }
    },

    mounted() {
      if (localStorage.getItem("uid") !== null) {
        findById(localStorage.getItem("uid")).then(res => {
          console.log(res.result, 'rr');
          this.user = res.result;
        })
      }
    },

    methods: {

      onSubmit() {
        console.log(456789);
        this.$refs.form.validate((valid) => {
          console.log(valid, 'val');
          if (valid) {
            updateUser(this.user).then(res => {
              if (res.success) {
                this.user = res.data;
                this.$message({
                  type: 'success',
                  message: "User's basic information updated successfully!"
                });
              }
            })
          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        });
      },

      handleUploadSuccess(res) {
        console.log(res, 'rrrr');
        this.user.avatar = res.result.url;
        console.log(this.user);
        updateUser(this.user).then(res => {
          if (res.success) {
            this.user = res.data;
            this.$message({
              type: 'success',
              message: 'Avatar uploaded successfully!'
            });
          }
        })
      }

    },

  }

</script>

<style scoped>
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
</style>
