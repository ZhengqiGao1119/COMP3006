<template>
  <div>
    <el-page-header @back="goBack" content="Movies Ticketing">
    </el-page-header>
    <div style="width: 100%; height: 20px"></div>
    <div style="font-weight: bold;letter-spacing: 2px;font-size: 25px;color: red" v-if="list.length === 0">
      Cinema haven't added to their schedule yet
    </div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div >
        <div class="item-des">
          <div class="d1">{{ film.name }}</div>
          <div class="d2">{{ $moment(item.date).format('YYYY-MM-DD') }} {{ item.startTime }}</div>
          <el-tag effect="plain">{{ item.type }}</el-tag>
        </div>
        <div class="item-btn">
          <el-button type="danger" @click="handleSelectSeat(item.id, item.date, item.startTime)" round>select tickets</el-button>
        </div>
        <div class="item-price">£{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {FindArrangements} from "@/api/film";

  export default {

    data() {
      return {
        list: [],
        film: {},
      }
    },

    mounted() {
      FindArrangements(this.$route.query.fid).then(res => {
        console.log(res, 'rrr');
        this.list = res.data.docs
        this.film = res.data.docs[0]
      })
    },

    methods: {

      goBack() {
        this.$router.go(-1)
      },

      handleSelectSeat(id) {
        if (!localStorage.getItem("uid")) {
          this.$confirm('The system has not detected your login information, whether to go to log in?', 'tip', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'cancel',
            type: 'warning'
          }).then(() => {
            this.$router.push("/login")
          })
        } else {
          this.$router.push("/seat?id=" + id)
        }
      },

    },

  }
</script>

<style scoped>

  .item {
    padding-top: 20px;
  }

  .d1 {
    font-size: 15px;
    letter-spacing: 2px;
    padding-bottom: 7px;
  }

  .d2 {
    font-size: 13px;
    letter-spacing: 1px;
    padding-bottom: 7px;
    color: #999;
  }

  .item {
    height: 100px;
  }

  .item-des {
    float: left;
  }

  .item-btn {
    float: right;
    padding-top: 30px;
    padding-left: 50px;
  }

  .item-price {
    float: right;
    color: #f34d41;
    line-height: 100px;
  }
</style>
