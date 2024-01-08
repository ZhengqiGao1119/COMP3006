<template>
  <div class="main">

    <el-table
      v-loading="loading"
      :data="orders"
      style="width: 100%"
      height="600">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="order ID：">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-shopping-bag-2"></i>
                  <span>order ID:</span>
                </span>
              </span>
              <span>{{ props.row.order.id }}</span>
            </el-form-item>
            <el-form-item label="Site ID：">
               <span slot="label">
                <span class="span-box">
                  <i class="el-icon-date"></i>
                  <span>Site ID:</span>
                </span>
              </span>
              <span>{{ props.row.arrangement.id }}</span>
            </el-form-item>
            <el-form-item label="User ID：">
                <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user-solid"></i>
                  <span>User ID:</span>
                </span>
              </span>
              <span>{{ props.row.user.id }}</span>
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
              <span>/£</span>
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
        label="order ID"
        width="400"
        prop="order.id">
      </el-table-column>
      <el-table-column
        width="200"
        label="Movie Name"
        prop="film.name">
      </el-table-column>
      <el-table-column
        width="200"
        label="Order Seats"
        prop="order.seats">
      </el-table-column>
      <el-table-column
        width="200"
        label="Order Amount"
        prop="order.price"
        sortable>
      </el-table-column>
      <el-table-column label="status" prop="order.status" sortable>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order.status === 2" type="success">Payment successful</el-tag>
          <el-tag v-if="scope.row.order.status === 0" type="info">Waiting for payment</el-tag>
          <el-tag v-if="scope.row.order.status === 3" type="warning">Withdrawn.</el-tag>
          <el-tag v-if="scope.row.order.status === 1" type="danger">Payment Failure</el-tag>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {CreateOrderException, FindAllOrder, UpdateOrder} from "@/api/order";

  export default {

    data() {
      return {
        loading: false,
        orders: [],
      }
    },

    mounted() {
      this.loadOrderList()
    },

    methods: {

      loadOrderList() {
        this.loading = true
        FindAllOrder().then(res => {
          console.log(res.data, 'datatatatat');
          if (res.success) {
            setTimeout(() => {
              this.orders = res.data.docs
              this.loading = false
            }, 200)
          }
        })
      },

    }

  }
</script>

<style scoped>
  .main {
    padding: 30px;
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
