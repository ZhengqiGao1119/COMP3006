<template>
  <div style="width: 100%">
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 0px">shopping cart</h3>
    <el-divider/>
    <div style="font-weight: bold;letter-spacing: 2px;font-size: 25px;color: #8861c9" v-if="cartList.length === 0">
      The shopping cart is still empty, so get your tickets now!
      <router-link to="/">
        <el-button style="margin: 10px 118px;background-color: #8d64b1;color: #fcefef;transform: translate(-110%, -15%);" type="medium" round>Back to the first page</el-button>
      </router-link>
    </div>
    <div v-loading="loading">

      <el-card shadow="hover" v-for="(item, index) in cartList" :key="index" class="box-card">
        <div>
          <div style="float: left;line-height: 100px;padding-right: 20px">
            <el-checkbox @change="handleCheck" v-model="selectList[index].checked"></el-checkbox>
          </div>
          <img class="item-film-img" alt="" :src="item.film.cover"/>
          <div style="float: left;">
            <div class="item-film-name">《{{ item.film.name }}》</div>
            <div class="item-film-seat">seats : {{ item.cart.seats }}</div>
            <div class="item-film-seat">phone : {{ item.cart.phone }}</div>
            <div class="item-film-time">startTime :
              <span style="color: red">{{ $moment(item.arrangement.date).format('YYYY-MM-DD') }} - {{ item.arrangement.startTime }}</span>
            </div>
          </div>
          <div style="float: right;color: #f34d41;letter-spacing: 2px; line-height: 100px;padding-right: 5px">
            £{{ item.cart.price }}
            <el-popconfirm
              confirm-button-text='Confirm'
              cancel-button-text='Cancel'
              icon="el-icon-info"
              icon-color="red"
              @confirm="handleDelete(index)"
              title="Does Confirm want to delete the shopping cart order?"
            >
              <el-button slot="reference"
                         type="text"
                         style="color: red;padding-left: 50px"
                         icon="el-icon-delete">delete
              </el-button>
            </el-popconfirm>
          </div>
        </div>
      </el-card>

      <div v-if="cartList.length !==0" style="height: 60px;background: #C0C4CC">
        <div>
          <div style="float: left;line-height: 60px;padding: 0 20px;font-size: 14px">
            <el-checkbox @change="handleCheckAll" v-model="checkAll">All</el-checkbox>
          </div>
          <el-button @click="submitCart" type="text" class="sub-btn">payments</el-button>
          <div class="order-footer1">Total Price : £{{ price }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {DeleteCartById, ListCarts} from "@/api/cart"
  import {CreateOrder} from "@/api/order";

  export default {
    inject:['reload'],
    data() {
      return {
        i: 0,
        success: false,
        centerDialogVisible: false,
        loading: false,
        price: 0,
        selectList: [],
        checkAll: false,
        cartList: [],
        uid: localStorage.getItem("uid"),
        items: [],
      }
    },

    mounted() {
      this.loadCarts()
    },

    methods: {

      loadCarts() {
        this.loading = true;
        ListCarts(this.uid).then(res => {
          setTimeout(() => {
            this.cartList = res.data
            console.log(res.data);
            for (let i = 0; i < this.cartList.length; i++) {
              this.selectList[i] = {checked: false, cart: this.cartList[i].cart}
            }
            this.loading = false
          }, 100)
        })
      },

      handleCheck() {
        this.checkOut()
      },

      handleCheckAll() {
        if (this.checkAll) {
          this.changeAllChecked(true)
          this.checkOut()
        } else {
          this.changeAllChecked(false)
          this.price = 0
        }
      },

      changeAllChecked(status) {
        for (let i = 0; i < this.selectList.length; i++) {
          this.selectList[i].checked = status
        }
      },

      checkOut() {
        this.price = 0
        for (let i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].checked) {
            this.price += this.selectList[i].cart.price
          }
        }
      },

      handleDelete(index) {
        DeleteCartById(this.cartList[index].cart.id).then(res => {
          if (res.success) {
            this.cartList.splice(index, 1)
          }
        })
      },

      submitCart() {
        this.$confirm('Please double-check that the Order Amount is ' + this.price + ' £, Confirm payment?', 'tip', {
          confirmButtonText: 'Confirmation of payment',
          cancelButtonText: 'cancel payments',
          type: 'success',
          center: true
        }).then(() => {
          for (let i = 0; i < this.selectList.length; i++) {
            console.log(this.selectList)
            if (this.selectList[i].checked) {
              this.selectList[i].cart.status = 2
              this.items.push(i)
              this.submitPay()
            }
          }
        }).catch(() => {
          this.loadCarts()
        });
      },

      submitPay() {
        for (let i = 0; i < this.items.length; i++) {
        CreateOrder(this.selectList[this.items[i]].cart).then(res => {
          if (res.success) {
            this.centerDialogVisible = false
            DeleteCartById(this.selectList[this.items[i]].cart.id).then(res => {
              if (res.success){
                this.$message({
                  type: 'success',
                  message: 'Congratulations on Payment successful!'
                });
                this.loadCarts();
              }
            })
          }
        });
        }
      },


    },

  }
</script>

<style scoped>

  .box-card {
    margin-bottom: 5px;
  }

  .el-card__header {
    background: #C0C4CC;
  }

  .item-film-img {
    float: left;
    width: 80px;
    height: 100px;
    padding-bottom: 20px;
    padding-right: 10px;
  }

  .item-film-name {
    letter-spacing: 2px;
    font-weight: 500;
    font-size: 18px;
    padding-bottom: 13px;
  }

  .item-film-seat {
    letter-spacing: 1px;
    font-size: 12px;
    padding-bottom: 8px;
    padding-left: 10px;
    color: #91949c;
  }


  .item-film-time {
    font-size: 12px;
    padding-left: 10px;
    letter-spacing: 1px;
    color: #91949c;
  }

  .c-img {
    width: 100%;
    height: 100%;
  }

  .sub-btn {
    float: right;
    color: #000000;
    height: 60px;
    width: 120px;
    background: #62c66b;
    letter-spacing: 2px;
    line-height: 33px;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
  }

  .order-footer1 {
    float: right;
    line-height: 60px;
    padding-right: 40px;
  }

  a {
    color: #333333;
  }

  .di {
    text-align: center;
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: bold;
    padding-top: 10px;
  }
</style>
