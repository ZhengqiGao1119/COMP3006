<template>
  <div class="film-list">

    <el-form ref="form" :model="form" label-width="180px" :rules="rules">

      <el-form-item label="Movie Cover" :required="form.cover?false:true">
        <el-upload
          class="upload-demo"
          drag
          accept=".png,.jpg,.webp"
          :limit="1"
          :headers="header"
          :action="uploadAction"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          :on-exceed="handleExceed"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drag files here, or<em>Click to upload</em></div>
          <div class="el-upload__tip" slot="tip">Only jpg/png files can be uploaded and should not exceed 20MB</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="Movie Cover" prop="url" v-show="false" :required="this.url?false:true">
        <el-input v-model="this.url"></el-input>
      </el-form-item>

      <el-form-item label="Movie Name" prop="name" :required="form.name?false:true">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Region of release" prop="region" :required="form.region?false:true">
          <el-select v-model="form.region" placeholder="Please select">
            <el-option label="Japanese" value="Japanese"></el-option>
            <el-option label="US" value="US"></el-option>
            <el-option label="South Korea" value="South Korea"></el-option>
            <el-option label="United Kingdom" value="United Kingdom"></el-option>
            <el-option label="French" value="French"></el-option>
            <el-option label="India" value="India"></el-option>
            <el-option label="Other" value="Other"></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="Type of screening" prop="showType" :required="form.showType?false:true">
        <el-select v-model="form.showType" placeholder="Please select">
            <el-option label="2D" value="2D"></el-option>
            <el-option label="3D" value="3D"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Full film duration" prop="duration">
          <el-input-number v-model="form.duration" :min="10" :max="550"></el-input-number>
          <span>  /min</span>
        </el-form-item>

      <el-form-item label="Release time" prop="releaseTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Select Date" value-format="yyyy-MM-dd" v-model="form.releaseTime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="Instant listing" prop="status" :required="form.status?false:true">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>

      <el-form-item label="Film Genres">
        <el-radio-group v-model="form.type">
          <el-radio style="padding-bottom: 20px" label="Romance"></el-radio>
          <el-radio label="Comedy"></el-radio>
          <el-radio label="Sci-Fi"></el-radio>
          <el-radio label="Animation"></el-radio>
          <el-radio label="Drama"></el-radio>
          <el-radio style="padding-bottom: 20px" label="Horror"></el-radio>
          <el-radio label="Mystery"></el-radio>
          <el-radio label="Adventure"></el-radio>
          <el-radio label="Action"></el-radio>
          <el-radio style="padding-bottom: 20px" label="Crime"></el-radio>
          <el-radio label="Historical"></el-radio>
          <el-radio label="War"></el-radio>
          <el-radio style="padding-bottom: 20px" label="Family"></el-radio>
          <el-radio label="Biography"></el-radio>
          <el-radio label="Kong fu sowordsmen"></el-radio>
          <el-radio label="Children"></el-radio>
          <el-radio label="Animation short"></el-radio>
          <el-radio label="Other"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Introduction" prop="introduction" :required="form.introduction?false:true">
        <el-input rows="8" type="textarea" v-model="form.introduction"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
        <el-button type="danger" @click="resetForm()" plain>Clear</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {AddFilm} from "@/api/film";
  import config from "@/config";

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
          url: [
            { validator: isEmpty, message: 'Please upload Movie Cover!', trigger: 'blur' }
          ],
          name: [
            {  required: true, message: 'Movie Name cannot be empty!', trigger: ['blur','change'] }
          ],
          region: [
            { required: true, message: 'Region of release cannot be empty!', trigger: 'blur' }
          ],
          showType: [
            { required: true, message: 'Screening type cannot be empty!', trigger: 'blur' }
          ],
          duration: [
            { required: true, message: 'The full movie duration cannot be empty!', trigger:  'change' }
          ],
          releaseTime: [
            { required: true, message: 'The release date cannot be empty!', trigger: 'blur' }
          ],
          status: [
            { required: true, message: 'Status cannot be empty!', trigger: 'blur' }
          ],
          type: [
            { required: true, message: 'Movie Type cannot be empty!', trigger: 'blur' }
          ],
          introduction: [
            { validator: isEmpty, message: 'The content profile cannot be empty!', trigger: ['blur','change'] }
          ],
        },
        header: {
          "Authorization": localStorage.getItem("token")
        },
        uploadAction: config.API_URL + '/common/upload-file',
        url: '',
        form: {
          cover: 'null',
          name: '',
          region: '',
          releaseTime: '',
          duration: 120,
          introduction: '',
          type: '',
          status: true,
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.cover = this.url;
            const film = this.form;
            AddFilm(film).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: 'Movie added successfully!'
                });
                this.$router.push("/film/list")
              }
            })
          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        });
      },

      beforeUpload(file) {
        let isLt10M = file.size / 1024 / 1024 / 20 < 1
        if(!isLt10M) {
          this.$message.error("Uploaded files cannot exceed 20MB in size!")
        }
        return isLt10M;
      },

      handleExceed(files, fileList) {
        this.$message.warning('If there are more than 1 file, please delete the current file and re-upload it again.')
        return false
      },

      handleUploadSuccess(res) {
        this.url = res.data.url;
      },

      resetForm() {
        this.$refs.form.resetFields()
      },

    }
  }
</script>

<style scoped>
  .film-list {
    padding: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
