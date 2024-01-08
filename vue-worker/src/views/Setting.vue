<template>
  <div class="main">
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 20px">Personal Information Modification</h3>

    <div>
      <el-form style="width: 350px;float: left" ref="form" :model="worker"
               label-width="90px" :rules="rules">
        <el-form-item style="padding: 0" label="username" prop="username">
          <el-input v-model="worker.username"></el-input>
        </el-form-item>
        <el-form-item style="padding-top: 12px" label="nickname" prop="nickname">
          <el-input v-model="worker.nickname"></el-input>
        </el-form-item>
        <!-- <el-form-item style="padding-top: 12px" label="password" prop="password">
          <el-input type="password" v-model="worker.password"></el-input>
        </el-form-item> -->
        <el-form-item label="gender" prop="gender" style="padding-top: 12px">
          <el-select style="width: 200px" v-model="worker.gender" placeholder="Please select gender">
            <el-option label="male" value="male"></el-option>
            <el-option label="female" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-top: 12px" label="phone" prop="phone" >
          <el-input v-model="worker.phone"></el-input>
        </el-form-item>
        <el-form-item  style="padding-top: 12px; height: 150px;" label="department" prop="department">
          <el-input v-model="worker.department" disabled></el-input>
        </el-form-item>
        <el-form-item style="padding-top: 0px">
          <el-button type="primary" @click="onSubmit">Update basic information</el-button>
        </el-form-item>
      </el-form>
      <div>
        <img style="padding-bottom: 10px;padding-left: 150px;width: 150px; height: 150px;" alt=""
             :src="worker.avatar">
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
  import config from "@/config";
  import {FindWorkerById, UpdateWorker} from "@/api/worker";

  export default {

    data() {
      const isEmpty = (rule, value, callback) => {
        if (value == '') {
          callback(new Error(rule.message))
        } else {
          callback()
        }
      };
      return {
        rules: {
          username: [
            { required: true, message: 'username Cannot be empty！', trigger: 'blur' },
            { required: true, min:1, message: 'Please enter a username of no less than 1 character!', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: 'gender Cannot be empty！', trigger: 'change' }
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
          url: [
            { validator: isEmpty, message: 'Please upload Movie Cover!', trigger: ['blur','change'] }
          ],

        },
        header: {
          "Authorization": localStorage.getItem("token")
        },
        uploadAction: config.API_URL + '/common/upload-file',
        worker: {
          nickname: '',
          phone: '',
          gender: '',
          avatar: '',
          department: '',
        }
      }
    },

    mounted() {
      FindWorkerById(localStorage.getItem("wid")).then(res => {
        this.worker = res.data;
      })
    },

    methods: {

      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            delete this.worker.password
            UpdateWorker(this.worker).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: 'Successful update of basic user information!'
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
        console.log(res)
        this.worker.avatar = res.result.url;
        UpdateWorker(this.worker).then(res => {
          if (res.success) {
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

  .main {
    padding: 50px;
    height: 800px;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
</style>
