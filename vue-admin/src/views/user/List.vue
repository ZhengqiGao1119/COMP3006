<template>
  <div class="main" style="height: 500px">
    <el-table
      :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="630">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form style="margin-left: 50px" label-position="left" inline class="demo-table-expand">
            <el-form-item>
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
                <i class="el-icon-edit"></i>Edit Password
              </el-button>
            </el-form-item>
            <el-form-item label="email">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-message"></i>
                  <span>email:</span>
                </span>
              </span>
              <span>{{ props.row.email }}</span>
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
            <el-form-item label="birthday">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-potato-strips"></i>
                  <span>birthday:</span>
                </span>
              </span>
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="info">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-s-comment"></i>
                  <span>info:</span>
                </span>
              </span>
              <span>{{ props.row.info }}</span>
            </el-form-item>
            <el-form-item label="update time">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-time"></i>
                  <span>update time:</span>
                </span>
              </span>
              <span>{{ props.row.updateTime }}</span>
            </el-form-item>
            <el-form-item label="avatar URL" style="width: 1000px">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-paperclip"></i>
                  <span>avatar URL:   </span>
                    <a target="_blank" :href="props.row.avatar">{{ props.row.avatar }}</a>
                </span>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="user ID"
        width="400"
        prop="id">
      </el-table-column>
      <el-table-column
        label="username"
        width="180"
        prop="username">
      </el-table-column>
      <el-table-column
        label="nickname"
        width="180"
        prop="nickname">
      </el-table-column>
      <el-table-column
        width="180"
        label="createTime"
        prop="createTime">
        <template #default="{row}">
          {{ $moment(row.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column width="300" align="right">
        <template slot="header" slot-scope="scope">
          <el-form>
            <el-input v-model="username"  size="mini" placeholder="Enter username to search" style="width:215px;float: left" />
            <el-button type="primary" size="mini" @click="searchByName" >Find</el-button>
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
  </div>
</template>

<script>
  import {FindAllUser, UpdateUser} from "@/api/user";
  import config from "@/config";

  export default {
    inject:['reload'],
    data() {
      return {
        userList: [],
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
      this.listUserByPage();
    },

    methods: {
      openUpdatePassword(user) {
        this.$prompt('Please enter a new password', 'tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'cancel',
        }).then(({value}) => {
          if (!value) {
            this.$message({
              type: 'danger',
              message: 'Password cannot be empty'
            });
            return
          }
          if (value.length < 6) {
            this.$message({
              type: 'danger',
              message: 'Please enter a password of at least 6 characters'
            });
            return
          }
          user.password = value
          this.reload();
          UpdateUser(user).then(res => {
            if (res.success) {
              this.$message({
                message: 'Account Password Modified successfully',
                type: 'success',
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel modification'
          });
        });
      },

      searchByName() {
        let params = {
          page: this.params.page,
          limit: this.params.limit,
          username: this.username
        };
        this.$axios({
          method: 'get',
          url: config.API_URL + "/user/like",
          params: params,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data.data)
            const data = res.data.data
            this.userList = data.docs;
            this.total = data.total;
          })
          .catch((error) => {
            let errMsg = error.response.data.msg;
            this.$message.error(errMsg)
          })
      },


      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listUserByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listUserByPage();
      },

      listUserByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/user/page?page=" + this.params.page + "&limit=" + this.params.limit,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data);
            const data = res.data.data
            this.userList = data.docs;
            this.total = data.total;
          });
      },

    },

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
