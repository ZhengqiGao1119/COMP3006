<template>
  <div style="width: 100%">
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 0px">My Orders</h3>
    <el-divider/>
    <div v-loading="loading">
      <el-card shadow="hover" v-for="(item, index) in orderList" :key="index" class="box-card">
        <div class="order-box">
          <div class="order-header">
            <span class="order-date">{{$moment(item.order.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss')}}</span>
            <span v-if="item.expireTime" style="position: absolute;left: 440px;top: 13px;color: #df2d2d;">Please 
              <el-tag type="danger" size="small">
                {{item.expireTime}}
              </el-tag>
              Payment within minutes
            </span>
            <el-popconfirm
              confirm-button-text='Confirm'
              cancel-button-text='Cancel'
              icon="el-icon-info"
              icon-color="red"
              @confirm="handleDelete(index, item.order.id)"
              title="Does Confirm want to delete the order?"
            >
              <el-button slot="reference"
                         type="text"
                         style="color: #7d7b7b;position: absolute;left: 730px;top: 0px;font-size: 20px;"
                         icon="el-icon-delete">
              </el-button>
            </el-popconfirm>
          </div>
        </div>
        <div style="margin-top: 10px"><img class="item-film-img" alt="" :src="item.film.cover"/>
          <div style="float: left;">
            <div class="item-film-name">《{{ item.film.name }}》</div>
            <div class="item-film-seat">Order Seats : {{ item.order.seats }}</div>
            <div class="item-film-time">Release time : {{ $moment(item.arrangement.date).format('YYYY-MM-DD') + ' ' + item.arrangement.startTime }}</div>
            <div v-if="item.order.status === 2" class="item-film-time">Payment time : {{ $moment(item.order.payTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</div>
          </div><el-button type="text" @click="handlePay(item.order, index)" v-if="item.order.status === 0" style="line-height: 75px" class="o1">
            Waiting for payment
          </el-button>
            <el-tooltip class="item" effect="dark" content="Please contact the staff to find your order." placement="top">
             <div v-if="item.order.status === 3" style="color: #E6A23C" class="o1">Order Exception</div>
            </el-tooltip>
            <div v-if="item.order.status === 2" style="color: #67C23A" class="o1">Payment successful</div>
            <div v-if="item.order.status === 1" style="color: #F56C6C" class="o1">Order Timeout</div>
            <div class="o2">
            £{{ item.order.price }}
          </div>
        </div>
      </el-card>
   </div>

  </div>
</template>

<script>
  import {FindOrderByUser, PayForOrder, DeleteOrderById} from "@/api/order";

  export default {
    name: "Order",

    data() {
      return {
        centerDialogVisible: false,
        loading: false,
        orderList: [],
        payOrderId: '',

      }
    },

    mounted() {
      this.loadOrder()
    },

    methods: {

      loadOrder() {
        this.loading = true
        FindOrderByUser(localStorage.getItem("uid")).then(res => {
          setTimeout(() => {
            console.log(res, 'rrrr');
            this.orderList = res.data.docs
            this.loading = false
          }, 100)
        })
      },

      handlePay(order, index) {
        this.open(order, index);
      },

      open(order, index) {
        this.$confirm('Please double check the Order Amount for' + order.price + '£, do you want to go on?', 'tip', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'success',
          center: true
        }).then(() => {
          // this.loading = true
          this.centerDialogVisible = true
          this.payOrderId = order.id
          PayForOrder(this.payOrderId).then(res => {
            if (!res.success) {
              this.loadOrder();
              this.centerDialogVisible = false
              this.$message({
                type: 'warning',
                message: 'Payment has timed out!'
              });
            }
            return;
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: 'The user has canceled the payment'
          });
        });
      },

      submitPay() {
        PayForOrder(this.payOrderId).then(res => {
          this.loadOrder();
          this.centerDialogVisible = false
          if (res.success) {
            this.$message({
              type: 'success',
              message: 'Congratulations on Payment successful!'
            });
          }
        })
      },

      handleDelete(index, id) {
        DeleteOrderById(id).then(res => {
          if (res.success) {
            this.orderList.splice(index, 1)
          }
        })
      },

    },

  }
</script>

<style scoped>

  .box-card {
    margin-bottom: 10px;
  }

  .el-card__header {
    background: #C0C4CC;
  }

  .item-film-img {
    float: left;
    width: 80px;
    height: 100px;
    padding-bottom: 10px;
    padding-right: 10px;
  }

  .item-film-name {
    letter-spacing: 2px;
    font-weight: 500;
    font-size: 18px;
    padding-bottom: 15px;
    padding-top: 1px;
  }

  .c-img {
    width: 100%;
    height: 100%;
  }

  .item-film-seat {
    letter-spacing: 1px;
    font-size: 12px;
    padding-bottom: 5px;
    padding-left: 10px;
    color: #91949c;
  }


  .item-film-time {
    letter-spacing: 1px;
    font-size: 12px;
    padding-left: 10px;
    padding-bottom: 5px;
    color: #91949c;
  }

  .o1 {
    float: right;
    line-height: 100px;
    padding-right: 20px
  }

  .o2 {
    font-size: 20px;
    float: right;
    line-height: 100px;
    padding-right: 100px
  }

  .order-header {
    background-color:#f7f7f7;
    font-size:14px;
    padding:13px 20px
  }

  .del-order {
    width: 15px;
    height: 16px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAAXNSR0IArs4c6QAAAP5JREFUKBVjZMACZs2alfTv3z95kNT///9FOTg4qhITEz+gK2UEKlQDKhBEklAG8ksZGRk3QDWzAPmhLCws0UADWWDqBAUFz7MABVKAAvYwQaBCVnZ2drekpKTXMLEZM2Y8/fv37wwg/x9M7MuXLz4wNnk00NTkmTNnppGiG6jnCEg9E9BvMkCnSsM0T58+/T8+NlAtE1DeCqQGxCAbjGomMegoDrAvwLgzglmamZnJiI89Z84cdaB6sBpgemeZ9evXrx5g4rgLTDALgRqZYZrRaaA8858/f6qBdCZIDmwCMHmyAjNIDpDPz8TEBE9h6JqBNv4Fih3PyMjYC5IDACkobU1JvS12AAAAAElFTkSuQmCC) no-repeat;
    float: right
  }

  .order-date {
    color: #242323;
    display: inline-block;
    margin-right: 30px
  }

  .order-box {
    border: 1px solid #e5e5e5;
    margin: 0 40px -20px 0;
    width: 800px;
    transform: translate(-3%, -50%);
  }
</style>
