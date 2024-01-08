<template>
  <div class="film-list">

    <el-dialog
      title="Movie information modification"
      :visible.sync="dialog1"
      width="60%">

      <el-form ref="form1" style="padding: 20px" :model="form" :data="form" label-width="180px" :rules="rules">

        <el-form-item label="Movie Cover">
          <el-upload
            class="upload-demo"
            drag
            accept=".png,.jpg"
            :limit="1"
            :headers="header"
            :action="uploadAction"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag files here, or<em>Click to upload</em></div>
            <div class="el-upload__tip" slot="tip">Only jpg/png files can be uploaded and should not exceed 20MB</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Movie Cover">
          <div v-text="url"></div>
        </el-form-item>

        <el-form-item label="Movie Name" prop="name" :required="form.name?false:true">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="Region of release">
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

        <el-form-item label="Screening type">
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

        <el-form-item label="Instant listing">
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

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">Cancel</el-button>
        <el-button type="primary" @click="submitUpdate()">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="schedule a movie"
      :visible.sync="dialog2"
      width="50%"
      @close="handleClose">

      <el-form ref="form" :model="arrangement" label-width="180px" :rules="rules">

        <el-form-item label="Movie Name">
          <el-input :disabled="true" v-model="arrangement.name"></el-input>
        </el-form-item>

        <el-form-item label="Open Seating" prop="seatNumber">
          <el-input-number v-model="arrangement.seatNumber" :min="10" :max="100"></el-input-number>
        </el-form-item>

        <el-form-item label="Type of screening">
          <el-select v-model="arrangement.type" placeholder="Please select" :disabled="true">
            <el-option label="2D" value="2D"></el-option>
            <el-option label="3D" value="3D"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="width: 500px" label="Screening Date" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Select Date" v-model="arrangement.date"
                            value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item style="width: 500px" label="Screening Time">
          <el-col :span="11">
            <el-form-item prop="startTime">
             <el-time-picker placeholder="Starting time" value-format="HH:mm:ss" v-model="arrangement.startTime"
                            style="width: 100%;" :picker-options="{selectableRange: `00:00:00 - ${arrangement.endTime ? arrangement.endTime : '23:59:59'}`}"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-time-picker placeholder="End Time" value-format="HH:mm:ss" v-model="arrangement.endTime"
                            style="width: 100%;" :picker-options="{selectableRange: `${arrangement.startTime ? arrangement.startTime : '00:00:00'} - 23:59:59`}"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Movie Ticket Prices" prop="price">
          <el-input-number v-model="arrangement.price" :precision="2" :step="0.1"
                           :min="9.99" :max="999.99"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">Cancel</el-button>
        <el-button type="primary" @click="submitArrange()">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table
      v-loading="tableLoading"
      :data="filmList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="630"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >

      <el-table-column label="Movie Name" prop="name" width="300px">
        <template slot-scope="scope">
          <el-image
            style="width: 90px; height: 90px"
            :src="scope.row.cover">
          </el-image>
          <el-tooltip
            v-model="scope.row.showTooltip"
            effect="dark"
            :disabled="!scope.row.showTooltip"
            :content="scope.row.name"
            placement="top"
            :open-delay="100"
          >
           <div
             style="font-size: 12px;padding-top: 5px;padding-left: 3px;"
             @mouseover="isShowTooltip($event, scope.row)"
             >
             {{scope.row.name | ellipsis}}
           </div>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="Screening Date"
        :formatter="formatter"
        prop="releaseTime"
        sortable
        width="160px">
      </el-table-column>

      <el-table-column
        label="Film Genres"
        prop="type"
        width="300px">
      </el-table-column>

      <el-table-column label="status" prop="status" sortable width="100px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === true" type="success" disable-transitions>up</el-tag>
          <el-tag v-if="scope.row.status === false" type="warning" disable-transitions>down</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Type of screening" prop="showType" sortable width="180px">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.showType === '2D'" type="success" disable-transitions>2D</el-tag>
          <el-tag effect="dark" v-if="scope.row.showType === '3D'" type="primary" disable-transitions>3D</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="region"
        prop="region"
        width="300px">
      </el-table-column>

      <el-table-column label="duration" width="100px">
        <template slot-scope="scope">
          <el-tag size="medium" effect="plain">{{ scope.row.duration }} min</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="400" align="right">
        <template slot="header" slot-scope="scope">
          <el-form>
            <el-input v-model="name"  size="mini" placeholder="Enter Movie Name to search" style="width:320px;float: left;" />
            <el-button type="primary" size="mini" @click="searchByName">Find</el-button>
          </el-form>
        </template>
        <template style="white-space: nowrap" slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">update
          </el-button>
          <el-button
            size="mini"
            icon="el-icon-circle-plus"
            type="success"
            @click="handleArrange(scope.$index, scope.row)">schedule a movie
          </el-button>
          <el-popconfirm
            confirm-button-text='Confirm'
            cancel-button-text='Cancel'
            icon="el-icon-info"
            icon-color="red"
            @confirm=handleDelete(scope.$index,scope.row)
            title=" Are you sure you want to delete this movie? "
          >
            <el-button
              style="margin-left: 8px"
              size="mini"
              icon="el-icon-delete"
              type="danger"
              slot="reference">delete
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <div style="text-align:center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.params.page"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="this.params.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {ListAllFilm, DeleteById, UpdateFilm, AddArrangement, findFilmById} from "@/api/film";
  import config from "@/config";
  import { formatDate } from "@/utils/formatter";


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
          seatNumber: [
            { required: true, message: 'Please specify the number of seats!', trigger: 'blur' }
          ],
          date: [
            { required: true, message: 'The screening date cannot be empty!', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: 'The screening start time cannot be empty!', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: 'The screening end time cannot be empty!', trigger: 'blur' }
          ],
          price: [
            { required: true, message: 'Movie ticket price cannot be empty!', trigger: 'blur' }
          ],
          name: [
            {  validator: isEmpty, message: 'Movie Name cannot be empty!', trigger: ['blur','change'] }
          ],
          duration: [
            { required: true, message: 'The full movie duration cannot be empty!', trigger:  'change' }
          ],
          releaseTime: [
            { required: true, message: 'The release date cannot be empty!', trigger: 'blur' }
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
        tableLoading: false,
        form: {
          cover: 'null',
          name: '',
          region: '',
          releaseTime: '',
          duration: 120,
          introduction: '',
          type: '',
          status: true,
        },
        arrangement: {
          name: '',
          fid: '',
          seatNumber: 40,
          price: 30.50,
          date: '',
          startTime: '',
          endTime: '',
          founder: '',
          type: '2D',
          releaseTime: '',
        },
        pickerOptionsDate: {
          disabledDate: (time) => {
            if (this.arrangement.releaseTime) {
              return  time.getTime() < new Date(this.arrangement.releaseTime).getTime();
            } else {
              return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
            }
          }
        },
        filmList: [],
        searchList:[],
        search: '',
        dialog1: false,
        dialog2: false,
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
        name: '',
      }
    },

    filters:{
      ellipsis(value){
        if (!value) return '';
        if (value.length > 8) {
          return value.slice(0,8) + '...'
        }
        return value
      }
    },

    mounted() {
      this.listFilmByPage();
    },

    methods: {

      submitUpdate() {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            this.form.cover = this.url;
            UpdateFilm(this.form).then(res => {
              if (res.success) {
                this.dialog1 = false;
                this.$message({
                  message: 'Film《' + this.form.name + '》Modified successfully！',
                  type: 'success',
                });
                this.listFilmByPage();
              }
            })
          }
        });
      },

      submitArrange() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            AddArrangement(this.arrangement).then(res => {
              this.dialog2 = false;
              if (res.success) {
                this.$message({
                  message: 'movie schedule《' + this.arrangement.name + '》Added successfully！',
                  type: 'success',
                });
              }
            })
          }
        });
      },

      handleEdit(index, row) {
        this.dialog1 = true;
        this.url = row.cover;
        findFilmById(row.id).then(res => {
          setTimeout(() => {
            this.form = res.data;
          },10)
        })
      },

      handleArrange(index, row) {
        this.dialog2 = true;
        this.arrangement.name = row.name
        this.arrangement.fid = row.id
        this.arrangement.type = row.showType
        this.arrangement.releaseTime = row.releaseTime
      },

      handleDelete(index, row) {
        DeleteById(row.id).then(res => {
          if (res.success) {
            this.filmList.splice(index, 1)
            this.reload();
            this.$message({
              message: 'Film《' + row.name + '》Deleted successfully！',
              type: 'success'
            });
          }
        })
      },

      handleUploadSuccess(res) {
        this.url = res.data.url;
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

      handleClose(){
        this.$refs.form.resetFields();
      },

      formatter(row,column) {
        return formatDate('YYYY-mm-dd',row[column.property]);
      },

      isShowTooltip(obj, row) {
        if (row.name.length > 8) {
          row.showTooltip = true
        } else {
          row.showTooltip = false
        }
      },

      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listFilmByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listFilmByPage();
      },

      searchByName() {
        this.params.page = 1
        this.listFilmByPage()
      },

      listFilmByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/film/page?page=" + this.params.page + "&limit=" + this.params.limit + "&name=" + this.name,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            const data = res.data.data
            this.filmList = data.docs;
            this.total = data.total;
          });
      },

    },
  }
</script>

<style scoped>
  .film-list {
    height: 500px;
  }
</style>
