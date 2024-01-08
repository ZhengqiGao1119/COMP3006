<template>
  <div>
    <el-carousel v-if="posterList.length !== 0" height="500px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in posterList" :key="index">
        <img alt=""
             :src="item.url"
             class="image">
      </el-carousel-item>
    </el-carousel>
    <div class="content">
      <el-button
        @click="dialogFormVisible = true"
        type="primary"
        icon="el-icon-upload">
        Upload rotating posters
      </el-button>


      <el-table
        ref="filterTable"
        :data="posterList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;margin-top: 15px;"
        height="500"
      >
        <el-table-column
          prop="created_at"
          label="Update Time"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="180">
        </el-table-column>
        <el-table-column label="Url">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.url">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Shelf Status"
          width="220">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status"
              type="success"
              disable-transitions>Up
            </el-tag>
            <el-tag
              v-else
              type="warning"
              disable-transitions>Down
            </el-tag>
            <el-button v-if="!scope.row.status"
                       style="padding: 0 15px;color: #67C23A"
                       type="text"
                       @click="changePosterStatus(scope.$index, scope.row, true)"
                       icon="el-icon-upload2">Up
            </el-button>
            <el-button v-else
                       style="padding: 0 15px;color: #E6A23C"
                       type="text"
                       @click="changePosterStatus(scope.$index, scope.row, false)"
                       icon="el-icon-download">Down
            </el-button>
            <template style="padding-left: 100px">
              <el-popconfirm @confirm="handleDeletePoster(scope.$index, scope.row.id, scope.row.title)" title="Does Confirm want to delete this entry?">
                <el-button slot="reference"
                           style="color: #F56C6C" type="text"
                           icon="el-icon-delete">delete
                </el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="rotating poster" :visible.sync="dialogFormVisible" @close="handleClose" :destroy-on-close="true">
      <el-form ref="form" :model="uploadPoster" :rules="rules">
        <el-form-item label="Poster Title" style="margin-bottom: 35px" label-width="180px" prop="title">
          <el-input style="width: 360px" v-model="uploadPoster.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Shelf Status" style="margin-bottom: 35px" label-width="180px" prop="status">
          <el-select style="width: 360px" v-model="uploadPoster.status" placeholder="Please select">
            <el-option label="up" value="true"></el-option>
            <el-option label="down" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Select Image" label-width="180px" prop="url">
          <el-upload
            style="float: left"
            class="upload-demo"
            accept=".png,.jpg,.webp"
            :headers="header"
            :action="uploadAction"
            :on-success="handleUploadSuccess"
            multiple
            :limit="1"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed">
            <el-button type="primary" icon="el-icon-upload">Upload rotating posters</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitUpload">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import config from "@/config";
  import {AddPoster, DeleteAllPoster, DeletePosterById, ListAllPoster, UpdatePoster} from "@/api/film";

  export default {
    inject:['reload'],
    mounted() {
      ListAllPoster().then(res => {
        this.posterList = res.data
      })
    },

    data() {
      return {
        rules: {
          title: [
            { required: true, message: 'Please fill in the Poster Title!', trigger: 'blur' }
          ],
          status: [
            { required: true, message: 'Please choose Shelf Status！', trigger: ['blur','change'] }
          ],
          url: [
            { required: true, message: 'Please upload Movie Cover！', trigger: ['blur','change'] }
          ],

        },
        header: {
          "Authorization": localStorage.getItem("token")
        },
        dialogFormVisible: false,
        uploadAction: config.API_URL + '/common/upload-file',
        uploadPoster: {
          url: '',
          title: '',
          status: '',
          createTime: '',
        },
        posterList: [],
        search: '',
      }
    },

    methods: {

      handleUploadSuccess(res) {
        this.uploadPoster.url = res.result.url
      },

      handleExceed(files, fileList) {
        this.$message.warning('If there are more than 1 file, please delete the current file and re-upload it again.')
        return false
      },

      beforeUpload(file) {
        let isLt10M = file.size / 1024 / 1024 / 20 < 1
        if(!isLt10M) {
          this.$message.error("Uploaded files cannot exceed 20MB in size!")
        }
        return isLt10M;
      },

      submitUpload() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            AddPoster(this.uploadPoster).then(res => {
              this.dialogFormVisible = false;
              this.reload();
              this.$message({
                message: 'rotating poster image uploaded successfully!',
                type: 'success'
              });
            })

          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        })

      },

      deleteAllPoster() {
        this.posterList = '';
        DeleteAllPoster().then(res => {
          if (res.success === true) {
            this.$message({
              message: 'The rotating poster has been removed in its entirety!',
              type: 'success'
            });
          }
        })
      },

      changePosterStatus(index, poster, status) {
        poster.status = status
        UpdatePoster(poster).then(res => {
          this.posterList[index].status = status
          this.$message({
            message: 'Shelf Status updated successfully!',
            type: 'success'
          });
        })
      },

      handleDeletePoster(index, id, title) {
        DeletePosterById(id).then(res => {
          this.posterList.splice(index, 1);
          this.$message({
            message: 'Poster <' + title + '>delete successful!',
            type: 'success'
          });
        })
      },

      handleClose(){
        this.$refs.form.resetFields();
      },

    }
  }
</script>

<style scoped>

  .content {
    padding: 20px 40px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .image {
    width: 100%;
    height: 500px;
  }

</style>
