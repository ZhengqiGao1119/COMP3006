<template>
  <div class="main">

    <el-table
      v-loading="loading"
      :data="orders.filter(data => !search || data.user.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="630">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form inline class="demo-table-expand" style="margin-left: 50px">
            <el-form-item label="order ID：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-shopping-bag-2"></i>
                  <span>order ID:</span>
                </span>
              </span>
              <span>{{ props.row.order.id }}</span>
            </el-form-item>
            <el-form-item label="Field ID:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-date"></i>
                  <span>Site ID:</span>
                </span>
              </span>
              <span>{{ props.row.arrangement.id }}</span>
            </el-form-item>
            <el-form-item label="UserID：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user-solid"></i>
                  <span>User ID:</span>
                </span>
              </span>
              <span>{{ props.row.user.id }}</span>
            </el-form-item>
            <el-form-item label="username：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user"></i>
                  <span>username:</span>
                </span>
              </span>
              <span>{{ props.row.user.username }}</span>
            </el-form-item>
            <el-form-item label="Movie ID：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-video-camera-solid"></i>
                  <span>Movie ID:</span>
                </span>
              </span>
              <span>{{ props.row.film.id }}</span>
            </el-form-item>
            <el-form-item label="Movie Name：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-video-camera"></i>
                  <span>Movie Name:</span>
                </span>
              </span>
              <span>《 {{ props.row.film.name }} 》</span>
            </el-form-item>
            <el-form-item label="Seat number:">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-menu"></i>
                  <span>seat number:</span>
                </span>
              </span>
              <span>{{ props.row.order.seats }}</span>
            </el-form-item>
            <el-form-item label="Order Amount：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-shopping-cart-full"></i>
                  <span>Order Amount:</span>
                </span>
              </span>
              <span>{{ props.row.order.price }}</span>
            </el-form-item>
            <el-form-item label="Time to order：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-time"></i>
                  <span>Time to order:</span>
                </span>
              </span>
              <span>{{ $moment(props.row.order.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</span>
            </el-form-item>
            <el-form-item label="Payment time：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-time"></i>
                  <span>Payment time:</span>
                </span>
              </span>
              <span>{{ $moment(props.row.order.payTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="ordering user"
        width="180"
        sortable
        prop="user.username">
      </el-table-column>
      <el-table-column
        label="Payment time"
        width="250"
        prop="order.payTime"
        sortable>
        <template #default="{row}">
          {{ $moment(row.order.payTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>


      <el-table-column
        width="180"
        label="Order Amount"
        prop="order.price">
      </el-table-column>
      <el-table-column label="status" width="200" prop="status" sortable>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order.status === 0" type="info">Waiting for payment</el-tag>
          <el-tag v-if="scope.row.order.status === 1" type="info">Payment Failure</el-tag>
          <el-tag v-if="scope.row.order.status === 2" type="success">Payment successful</el-tag>
          <el-tag v-if="scope.row.order.status === 3" type="warning">Withdrawn</el-tag>
          <el-tag v-if="scope.row.order.status === 4" type="danger">Order Exception</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="operate" width="400">
        <template slot-scope="scope">
          <el-button @click="handle1(scope.$index, scope.row.order)" size="small" type="warning"
                     icon="el-icon-refresh-right"
                     :disabled="scope.row.order.status === 3"
                     plain>Withdrawal of orders
          </el-button>
          <el-button @click="handle2(scope.$index, scope.row.order)" size="small" type="danger"
                     icon="el-icon-circle-close"
                     :disabled="scope.row.order.status === 4 || scope.row.order.status === 3"
                     plain>Reporting exceptions
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="250" align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Enter username to search"/>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="Reporting exceptions Form" :visible.sync="dialogFormVisible" @close="handleClose" :destroy-on-close="true">
      <el-form ref="form" :model="form" style="width: 450px" :rules="rules">
        <!--
        <el-form-item style="width: 100%" label="submitter" label-width="200px">
        <el-input v-model="this.username" autocomplete="off" type="text" disabled></el-input>
        </el-form-item>
        -->
        <el-form-item style="width: 100%" label="Reason for submission" label-width="200px" prop="reason">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {CreateOrderException, FindAllOrder, UpdateOrder} from "@/api/order";
  import config from "@/config";

  export default {

    data() {
      return {
        rules: {
          reason: [
            { required: true, message: 'please fill in Reason for submission！', trigger: 'blur' }
          ],
          reviewer: [
            { required: true, message: 'please fill in submitter！', trigger: 'blur' }
          ],

        },
        loading: false,
        dialogFormVisible: false,
        orders: [],
        form: {
          oid: '',
          reason: '',
          reviewer: '',
        },
        search: '',
        username: localStorage.getItem("username"),
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
        currentData: {}
      }
    },

    mounted() {
      this.loadOrderList()
    },

    methods: {

      loadOrderList() {
        this.loading = true
        FindAllOrder().then(res => {
          if (res.success) {
            setTimeout(() => {
              console.log(res, 'rrrrr');
              this.orders = res.data.docs
              this.loading = false
            }, 0)
          }
        })
      },

      handle1(index, order) {
        this.orders[index].order.status = 3
        UpdateOrder(this.orders[index].order).then(res => {
          this.loadOrderList();
          this.$message({
            type: 'success',
            message: 'Order Cancellation Successful!'
          });
        })
      },

      handle2(index, order) {
        this.currentData = order
        this.form.oid = order.id
        this.dialogFormVisible = true
      },

      submit() {
        this.form.reviewer = this.username
        this.$refs.form.validate((valid) => {
          if (valid) {
            CreateOrderException(this.form).then(res => {
              if (res.success) {
                this.currentData.status = 4
                UpdateOrder(this.currentData).then(res => {
                  this.loadOrderList()
                  this.$message({
                    type: 'success',
                    message: 'Order Exception Successful reporting!'
                  });
                  this.dialogFormVisible = false
                })
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
        this.listOrderByPage();
      },

      handleCurrentChange(val) {
        this.params.page = val;
        this.listOrderByPage();
      },

      listOrderByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/order/page?page=" + this.params.page + "&limit=" + this.params.limit,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            this.orders = res.data.data.docs;
            this.total = res.data.data.total;
          });
      },

    }

  }
</script>

<style scoped>
  .main {
    height: 500px;
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
