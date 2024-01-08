<template>
  <div v-loading="loading" style="padding: 10px">
    <el-form ref="form" :model="form" label-width="130px" :rules="rules">
      <el-form-item label="username" prop="username">
        <el-input style="width: 300px" v-model="form.username" placeholder="Username with at least 6 characters"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input style="width: 300px" v-model="form.password" placeholder="Password with at least 6 characters"></el-input>
      </el-form-item>
      <el-form-item label="nickname" prop="nickname">
        <el-input style="width: 300px" v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="gender" prop="gender">
        <el-select style="width: 200px" v-model="form.gender" placeholder="Please select gender">
          <el-option label="male" value="male"></el-option>
          <el-option label="female" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 300px" label="phone number" prop="phone">
        <el-input v-model="form.phone" placeholder="Phone Number"></el-input>
      </el-form-item>
      <el-form-item label="department" prop="department" :required="departmentList?false:true">
        <el-checkbox-group v-model="departmentList">
          <el-checkbox label="Customer Service Department" border></el-checkbox>
          <el-checkbox label="Operations Department" border></el-checkbox>
          <el-checkbox label="Public Relations Department" border></el-checkbox>
          <el-checkbox label="Planning Department" border></el-checkbox>
          <el-checkbox label="Human Resources Department" border></el-checkbox>
          <el-checkbox label="Regulatory Department" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="avatar" required>
        <el-upload
          class="upload-demo"
          drag
          accept=".png,.jpg"
          :headers="header"
          :action="uploadAction"
          :on-success="handleUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drag files here, or<em>Click to upload</em></div>
          <div class="el-upload__tip" slot="tip">Only JPG/PNG files can be uploaded, and must not exceed 50MB.</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="avatar" prop="url" v-show="false" :required="url?false:true">
        <el-input v-model="this.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button type="danger" @click="resetForm()" plain>Clear</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {CreateWorker} from "@/api/worker";
  import config from "@/config";
import md5 from "md5";

  export default {
    inject:['reload'],
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
            { required: true, min:6, message: 'Please enter a username with at least 6 characters!', trigger: 'blur' },
          ],
          password: [
            { required: true,message: 'password Cannot be empty！', trigger: 'blur' },
            { required: true, min:6, message: 'Please enter a password with at least 6 characters!', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: 'Gender Cannot be empty！', trigger: 'change' }
          ],
          phone: [
            { required: true, message: 'Phone number Cannot be empty！', trigger: 'blur' },
            {
              validator: function(rule, value, callback) {
                if (/^\d*$/.test(value) == false) {
                  callback(new Error("Wrong format of cell phone number"));
                } else {
                  callback();
                }
              },
              trigger: "change"
            }
          ],
          department: [
            {  validator: isEmpty, required: true, message: 'department Cannot be empty！', trigger: 'blur' }
          ],
          url: [
            { validator: isEmpty, message: 'Please upload Movie Cover！', trigger: ['blur','change'] }
          ],

        },
        header: {
          "Authorization": localStorage.getItem("token")
        },
        uploadAction: config.API_URL + '/common/upload-file',
        url: '',
        loading: false,
        form: {
          username: '',
          nickname: '',
          password: '',
          gender: '',
          avatar: '',
          phone: '',
          department: '',
        },
        departmentList: [],
      }
    },
    methods: {

      onSubmit() {
        this.form.department = this.departmentList.toString()
        console.log(this.form.department)
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.form.password = md5(this.form.password)
            CreateWorker(this.form).then(res => {
              if (res.success){
                setTimeout(() => {
                  this.$message({
                    message: 'Success message: User added successfully',
                    type: 'success'
                  });
                  this.$router.push("/worker/list")
                  this.loading = false
                }, 200)
              } else {
                this.loading = false
                this.resetForm();
              }
            })
          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        });

      },

      handleUploadSuccess(res) {
        console.log(res, 'upload');
        this.form.avatar = res.result.url;
        this.url = res.result.url;
      },

      resetForm() {
        this.reload()
      },

    }
  }
</script>

<style scoped>

</style>
