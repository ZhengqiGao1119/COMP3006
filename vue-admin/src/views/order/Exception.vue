<template>
  <div class="main">

    <el-table
      v-loading="loading"
      :data="list.filter(data => !search || data.reviewer.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="630">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form style="margin-left: 50px" inline class="demo-table-expand">
            <el-form-item label="Exception ID:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-circle-close"></i>
                  <span>Exception ID:</span>
                </span>
              </span>
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="Exception Reason:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-warning-outline"></i>
                  <span>Exception Reason:</span>
                </span>
              </span>
              <span>{{ props.row.reason }}</span>
            </el-form-item>
            <el-form-item label="submitter：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user"></i>
                  <span>submitter:</span>
                </span>
              </span>
              <span>{{ props.row.reviewer }}</span>
            </el-form-item>
            <el-form-item label="update Time：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-time"></i>
                  <span>update Time:</span>
                </span>
              </span>
              <span>{{ $moment(props.row.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</span>
            </el-form-item>
            <el-form-item label="order ID：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-shopping-cart-1"></i>
                  <span>order ID:</span>
                </span>
              </span>
              <span>{{ props.row.oid }}</span>
            </el-form-item>
            <el-form-item label="Has it been resolved:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-circle-check"></i>
                  <span>"Has it been resolved:</span>
                </span>
              </span>
              <span v-if="props.row.status">Resolved</span>
              <span v-if="!props.row.status">Unresolved</span>
            </el-form-item>
            <el-form-item label="Processing Result:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-view"></i>
                  <span>Processing Result:</span>
                </span>
              </span>
              <span>{{ props.row.result }}</span>
            </el-form-item>
            <el-form-item label="Processing Time:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-odometer"></i>
                  <span>Processing Time:</span>
                </span>
              </span>
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="order ID"
        width="350"
        prop="oid">
      </el-table-column>
      <el-table-column
        width="220"
        label="update Time"
        prop="createTime"
        sortable>
        <template #default="{row}">
          {{ $moment(row.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="submitter"
        prop="reviewer">
      </el-table-column>
      <el-table-column label="Exception Handling Status" width="250">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">Processed Successfully</el-tag>
          <el-tag v-if="!scope.row.status" type="danger">Awaiting Processing</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="operate" width="200">
        <template slot-scope="scope">
          <el-button @click="handle(scope.$index, scope.row.id)" size="small" type="primary"
                     icon="el-icon-s-check"
                     plain>Exception Handling
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="240" align="right">
        <template slot="header" slot-scope="scope">
          <el-form>
            <el-input v-model="reviewer"  size="mini" placeholder="enter submitter" style="width:150px;float: left;margin-left: 10px" />
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

    <el-dialog title="Exception Handling Results Form" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form ref="form" :model="form" style="width: 400px" :rules="rules">
        <el-form-item label="Processing Result" label-width="180px" prop="result">
          <el-input v-model="form.result" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Is the processing complete?" label-width="180px" prop="status">
          <el-select v-model="form.status" placeholder="Please select">
            <el-option label="Processing Completed" value="true"></el-option>
            <el-option label="Processing Not Completed Yet" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit()">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {CreateOrderException, HandleOrderException, ListOrderException, UpdateOrder} from "@/api/order";
  import config from "@/config";

  export default {

    data() {
      return {
        rules: {
          result: [
            { required: true, message: 'Please fill in the processing result!', trigger: 'blur' }
          ],
          status: [
            { required: true, message: 'Please select whether it is completed or not!', trigger: ['blur','change'] }
          ],

        },
        loading: false,
        dialogFormVisible: false,
        list: [],
        form: {
          id: '',
          status: '',
          result: '',
        },
        search: '',
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
        reviewer: '',
      }
    },

    mounted() {
      this.listOeByPage()
    },

    methods: {

      loadList() {
        this.loading = true
        ListOrderException().then(res => {
          if (res.success) {
            setTimeout(() => {
              this.list = res.data
              this.loading = false
            }, 0)
          }
        })
      },

      searchByName() {
        let params = {
          page: this.params.page,
          limit: this.params.limit,
          reviewer: this.reviewer
        };
        this.$axios({
          method: 'get',
          url: config.API_URL + "/oe/like",
          params: params,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            const data = res.data.data
            this.list = data.docs;
            this.total = data.total;
          })
          .catch((error) => {
            let errMsg = error.response.data.msg;
            this.$message.error(errMsg)
          })
      },

      handle(index, id) {
        this.form.id = id
        this.dialogFormVisible = true
      },

      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            HandleOrderException(this.form).then(res => {
              if (res.success) {
                this.dialogFormVisible = false
                this.loadList()
                this.$message({
                  type: 'success',
                  message: 'Order Processing Successful!'
                });
              }
            })
          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        });

      },

      handleClose(){
        this.$refs.form.resetFields();
      },

      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listOeByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listOeByPage();
      },

      listOeByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/oe/page?page=" + this.params.page + "&limit=" + this.params.limit,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data);
            const data = res.data.data
            this.list = data.docs;
            this.total = data.total;
          });
      },

    }

  }
</script>

<style scoped>
  .main {
    height: 500px
  }

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
