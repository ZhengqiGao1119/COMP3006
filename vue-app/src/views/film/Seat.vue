<template>
  <div class="seat-main">
    <el-steps style="padding-bottom: 50px" :active="2" align-center>
      <el-step title="Step1" description="Select Movies Field"></el-step>
      <el-step title="Step2" description="Select seat number"></el-step>
      <el-step title="Step3" description="Join shopping cart"></el-step>
      <el-step title="Step4" description="Settle a bill"></el-step>
    </el-steps>
    <div class="seat-content">
      <div class="seat-aside">
        <div style="display: flex">
          <img style="padding: 30px" :src="film.cover" alt=""/>
          <div>
            <div style="padding-top: 40px;padding-bottom: 10px;font-size: 25px;letter-spacing: 2px;">
              {{ film.name }}
            </div>
            <div class="seat-aside-text">Film Genres：{{ film.type }}</div>
            <div class="seat-aside-text">Region：{{ film.region }}</div>
            <div class="seat-aside-text">Hours long：{{ film.duration }} min</div>
          </div>
        </div>
        <div style="padding: 5px 30px">
          <div class="d1"><span>Movie Type：</span>{{ arrangement.type }}</div>
          <div class="d1" style="color: #f56c6c">
            <span>Start Time：</span>{{ $moment(arrangement.date).format('YYYY-MM-DD') }}
            {{ arrangement.startTime }}
          </div>
          <div class="d1"><span>End Time：</span>{{ arrangement.endTime }}</div>
          <div class="d1"><span>Price：</span>£{{ arrangement.price }}/per ticket</div>
          <el-divider></el-divider>
          <span v-if="this.userSelectSeats.length <= 0" style="font-size: 16px;letter-spacing: 2px;padding-bottom: 15px;color: #8c939d">Seats: Up to 4 seats at a time</span>
          <div class="d1" style="margin-top: 10px" v-if="this.userSelectSeats.length > 0">
            Selected:
            <el-tag v-for="(item, i) in userSelectSeats" :key="i"
                    type="danger"
                    style="margin-right: 5px"
                    effect="plain">
              {{ item }}
            </el-tag>
          </div>
          <div class="d1" style="padding-top: 10px">
            Total Price：
            <span style="color: #f56c6c">£ </span>
            <span style="color: #f56c6c; font-size: 25px; font-weight: bold">{{ cart.price }}</span>
          </div>
          <el-divider></el-divider>
          <div style="padding: 0 50px">
            <el-input
              v-model="cart.phone"
              style="padding-top: 20px; padding-bottom: 30px"
              placeholder="Please enter your cell phone number"
              clearable
            >
            </el-input>
            <el-button @click="submitSeat" class="add-cart-btn" type="danger" round
            >Join shopping cart
            </el-button>
          </div>
        </div>
      </div>

      <div class="hall seat-select">
        <div style="padding-left: 30px" class="seat-example">
          <div class="selectable-example example">
            <span>Available seats</span>
          </div>
          <div class="sold-example example">
            <span>Sold seats</span>
          </div>
          <div class="selected-example example">
            <span>Seats selected</span>
          </div>
        </div>

        <div class="seats-block">
          <div class="seats-container">
            <div class="screen-container" style="left: 5px">
              <div class="screen">center of the screen</div>
              <div class="c-screen-line"></div>
            </div>

            <div class="seats-wrapper">
              <div style="padding: 0 40px;width: 500px">
                <span v-for="(item, index) in seats" :key="index">
                  <span v-if="item.status === 0" class="seat sold item"/>
                  <span v-if="item.status === 1" @click="handleSelect(index)" class="seat selectable item"/>
                  <span v-if="item.status === 2" @click="handleDisSelect(index)" class="seat selected item"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {FindArrangementById, GetArrangementSeats} from "@/api/film";
  import {CreateCart} from "@/api/cart";

  export default {
    data() {
      return {
        cart: {
          uid: localStorage.getItem("uid"),
          aid: this.$route.query.id,
          seats: '',
          phone: "",
          price: 0
        },
        arrangement: {},
        film: {},
        seats: [],
        userSelectSeats: [],
        selectSeats: [],
      }
    },

    mounted() {
      FindArrangementById(this.$route.query.id).then((res) => {
        console.log(res, '3333333333');
        this.arrangement = res.data.arrangement;
        this.film = res.data.film;
        GetArrangementSeats(this.$route.query.id).then(res => {
          this.selectSeats = res.data;
          this.loadSeats();
        })
      });
    },

    methods: {
      loadSeats() {
        const n = this.arrangement.seatNumber
        let arr = new Array(n)
        for (let i = 0; i < n; i++) {
          if (this.selectSeats.indexOf(i + 1) === -1) {
            arr[i] = {seat: i + 1, status: 1}
          } else {
            arr[i] = {seat: i + 1, status: 0}
          }
        }
        this.seats = arr
      },

      handleSelect(index) {
        if (this.userSelectSeats.length >= 4) {
          let d = this.userSelectSeats[0] - 1
          this.seats[d].status = 1
          this.userSelectSeats.splice(0, 1)
        }
        this.userSelectSeats.push(index + 1)
        this.seats[index].status = 2
        this.cart.price = (this.arrangement.price) * (this.userSelectSeats.length)
      },

      handleDisSelect(index) {
        this.seats[index].status = 1
        this.userSelectSeats.splice(this.userSelectSeats.indexOf(index + 1), 1)
        this.cart.price = (this.arrangement.price) * (this.userSelectSeats.length)
      },

      checkPhoneAndSeats() {
        if (this.userSelectSeats.length === 0) {
          this.$message({
            message: 'Please select the seats to order',
            type: 'warning'
          });
          return false;
        }
        return true;
      },

      submitSeat() {
        if (this.checkPhoneAndSeats()) {
          for (let i = 0; i < this.userSelectSeats.length; i++) {
            this.cart.seats += this.userSelectSeats[i]+','
          }
          CreateCart(this.cart).then(res => {
            this.$message({
              message: 'Add shopping cart for you successfully, please pay as soon as possible!',
              type: 'success'
            });
            this.$router.go(-1)
          })

        }
      },

    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/seat.css";

  .seat-main {
    padding: 80px;
  }

  .seat-content {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    height: 850px;
  }

  .seat-aside {
    width: 30%;
    height: 100%;
    float: left;
    background: #f5f6f7;
  }

  .seat-aside img {
    width: 140px;
    height: 200px;
  }

  .seat-select {
    padding-top: 50px;
    padding-left: 8%;
  }

  .seat-aside-text {
    padding-top: 8px;
    font-size: 13px;
    letter-spacing: 1px;
    color: #666666;
  }

  .d1 {
    font-size: 16px;
    letter-spacing: 2px;
    padding-bottom: 15px;
  }

  .d1 span {
    color: #91949c;
  }

  .add-cart-btn {
    width: 100%;
    height: 60px;
    border-radius: 50px;
  }

  .item {
    padding-bottom: 20px;
  }

  .row-id {
    padding-bottom: 11px;
  }

  .el-input__inner {
    border-radius: 50px;
    height: 55px;
  }
</style>
