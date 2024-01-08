<template>
  <div class="main" style="height: 500px">

    <el-table
      v-loading="loading"
      :data="workerList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="630">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form style="margin-left: 50px" inline class="demo-table-expand">
            <el-form-item label="username">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user-solid"></i>
                  <span>username:</span>
                </span>
              </span>
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="nickname">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user"></i>
                  <span>nickname:</span>
                </span>
              </span>
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="password">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-lock"></i>
                  <span>password:</span>
                </span>
              </span>
              <el-button type="text" @click="openUpdatePassword(props.row)">
                <i class="el-icon-edit"></i>edit password
              </el-button>
            </el-form-item>
            <el-form-item label="phone number">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-mobile-phone"></i>
                  <span>phone number:</span>
                </span>
              </span>
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="gender">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-s-help"></i>
                  <span>gender:</span>
                </span>
              </span>
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="department">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-school"></i>
                  <span>department:</span>
                </span>
              </span>
              <span>{{ props.row.department }}</span>
            </el-form-item>
            <el-form-item label="status">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-view"></i>
                  <span>status:</span>
                </span>
              </span>
              <span v-if="props.row.entry">incumbency
              <el-button @click="changeEntry(props.$index, props.row)" type="text">Employee has left?</el-button></span>
              <span style="color: #f56c6c" v-else>quit a job</span>
            </el-form-item>
            <el-form-item label="update time">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-time"></i>
                  <span>update time:</span>
                </span>
              </span>
              <span>{{ $moment(props.row.updateTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</span>
            </el-form-item>
            <el-form-item label="avatar">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-s-custom"></i>
                  <span>avatar:</span>
                </span>
              </span>
              <a v-if="props.row.avatar" target="_blank" :href="props.row.avatar">
                <i class="el-icon-view"></i>view
              </a>
              <span v-else>He hasn't uploaded his avatar yet.</span>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="props.row.entry"
                         @click="handleDeleteWork(props.$index, props.row.id)"
                         size="small"
                         type="danger"
                         plain>delete employee
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="user ID"
        width="350"
        prop="id">
      </el-table-column>
      <el-table-column
        label="username"
        width="200"
        prop="username">
      </el-table-column>
      <el-table-column
        label="department"
        width="400">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.department }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="phone number"
        width="150"
        prop="phone">
      </el-table-column>
      <el-table-column
        width="200"
        sortable
        label="createTime"
        prop="createTime">
        <template #default="{row}">
          {{ $moment(row.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column width="230" align="right">
        <template slot="header" slot-scope="scope">
          <el-form>
            <el-input v-model="username"  size="mini" placeholder="enter username to search" style="width:160px;float: left;margin-left: -10px" />
            <el-button type="primary" size="mini" @click="searchByName">Find</el-button>
          </el-form>
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

    <el-dialog title="user permissions" :visible.sync="roleDialogVisible">
      <el-table v-loading="loading" :data="roleList">
        <el-table-column property="value" label="permissions" width="300"></el-table-column>
        <el-table-column property="createTime" label="createTime" width="300"></el-table-column>
        <el-table-column label="operate">
          <template slot-scope="scope">
            <el-popconfirm
              @confirm="handleDeleteRole(scope.$index, scope.row.id)"
              :title="'Confirm Delete Permissions < ' + scope.row.value +' > ？'"
            >
              <el-button slot="reference" size="small" type="danger" icon="el-icon-delete" plain>delete
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog width="450px" title="New permissions" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form ref="form" :model="addRoleForm">
        <el-form-item label="permission list" label-width="180px" prop="value">
          <el-select v-model="addRoleForm.value" placeholder="Please select the added permissions">
            <el-option v-for="(item, index) in systemRoles"
                       :key="index"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitAddRole">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    CreateWorkerRole,
    DeleteRoleByWorkerId,
    DeleteWorker,
    FindAllWorker,
    FindWorkerRoles,
    ListSystemRoles,
    UpdateWorker
  } from "@/api/worker";
  import config from "@/config";
import md5 from "md5";

  export default {


    data() {
      return {
        loading: false,
        addRoleForm: {
          wid: '',
          value: '',
        },
        workerList: [],
        systemRoles: [],
        roleDialogVisible: false,
        roleList: [],
        dialogFormVisible: false,
        search: '',
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
        username: '',
      }
    },

    mounted() {
      this.listWorkerByPage();
    },

    methods: {
      searchByName() {
        let params = {
          page: this.params.page,
          limit: this.params.limit,
          username: this.username
        };
        this.$axios({
          method: 'get',
          url: config.API_URL + "/worker/like",
          params: params,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data.data)
            const data = res.data.data
            this.workerList = data.docs;
            this.total = data.total;
          })
          .catch((error) => {
            let errMsg = error.response.data.msg;
            this.$message.error(errMsg)
          })
      },

      openUpdatePassword(worker) {
        this.$prompt('Please enter a new password', 'tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'cancel',
        }).then(({value}) => {
          if (!value) {
            this.$message({
              message: 'password Cannot be empty',
              type: 'danger',
            });
            return
          }
          if (value.length < 6) {
            this.$message({
              message: 'Please enter a password of at least 6 character.',
              type: 'danger',
            });
            return
          }
          worker.password = md5(value)
          UpdateWorker(worker).then(res => {
            this.$message({
              message: 'user<' + worker.username + '>password Modified successfully!',
              type: 'success',
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel edit'
          });
        });
      },

      changeEntry(index, worker) {
        this.$confirm('This operation permanently changes the userstatus to quit a job, should I continue?', 'tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          worker.entry = false
          UpdateWorker(worker).then(res => {
            this.$message({
              type: 'success',
              message: 'userquit a job Successful!'
            });
          })
        })
      },

      handleDeleteWork(index, id) {
        DeleteWorker(id).then(res => {
          this.workerList.splice(index, 1)
          this.$message({
            type: 'success',
            message: 'user info Deleted successfully!'
          });
        })
      },

      handleListRole(worker) {
        this.roleDialogVisible = true;
        this.loading = true;
        FindWorkerRoles(worker.id).then(res => {
          setTimeout(() => {
            this.roleList = res.data
            this.loading = false
          }, 100)
        })
      },

      handleDeleteRole(index, id) {
        DeleteRoleByWorkerId(id).then(res => {
          if (res.success === true) {
            this.roleList.splice(index, 1)
            this.$message({
              type: 'success',
              message: 'user permission Deleted successfully!'
            });
          }
        })
      },

      handleAddRole(worker) {
        this.dialogFormVisible = true;
        this.addRoleForm.wid = worker.id;
      },

      submitAddRole() {
        CreateWorkerRole(this.addRoleForm).then(res => {
          if (res.success) {
            this.dialogFormVisible = false;
            this.addRoleForm.wid = '';
            this.addRoleForm.value = '';
            this.$message({
              type: 'success',
              message: 'User privileges added successfully!'
            });
          }
        })
      },

      handleClose(){
        this.$refs.form.resetFields();
      },

      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listWorkerByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listWorkerByPage();
      },

      listWorkerByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/worker/page?page=" + this.params.page + "&limit=" + this.params.limit,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data);
            const data = res.data.data
            this.workerList = data.docs;
            this.total = data.total;
          });
      },

    }

  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
