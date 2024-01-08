<template>
  <div>
    <el-page-header @back="goBack" content="Detail page"></el-page-header>
    <div style="font-weight: bolder;font-size: 25px;padding-top: 40px;padding-bottom: 20px"><span style="color: #8d64b1;font-weight: 900;">| </span>Introduction</div>
    <div style="font-weight: bold;letter-spacing: 2px;font-size: 25px;color: red" v-if="film.introduction.length === 0">
      There is no Introduction for this movie yet.
    </div>
    <div style="line-height: 30px;text-indent:2.5em;padding-top: 20px;padding-bottom: 20px"> {{film.introduction}}
    </div>
    <div style="font-weight: bolder;font-size: 25px;padding-top: 40px;padding-bottom: 40px"><span style="color: #8d64b1;font-weight: 900;">| </span>Movie Comments</div>
    <div style="font-weight: bold;letter-spacing: 2px;font-size: 25px;color: red" v-if="evaluateList.length === 0">
      There are no reviews for this movie yet, so go ahead and comment!
    </div>
    <div style="padding-right: 100px">
      <div class="item" v-for="item in evaluateList">
        <img alt="" style="float: left;width: 55px;height: 55px;border-radius: 50%" :src="item.user.avatar">
        <div class="header-name">
          <div v-if="item.user.nickname===null" style="font-weight: 400;color: darkgrey; padding-left: 5px;">anonymous user</div>
          <div v-if="item.user.nickname!==null" style="font-weight: 400;color: darkgrey; padding-left: 5px;">
            {{ item.user.nickname }}
          </div>
          <el-rate
            style="padding-top: 7px"
            v-model="item.filmEvaluate.star"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div
          style="text-indent:2.5em;line-height: 28px;padding-left: 70px;padding-top: 80px;padding-bottom: 20px;color: #91949c">
          {{ item.filmEvaluate.comment }}
        </div>
        <i style="float: right;padding-right: 18px;color: #91949c">Comment Time : {{ $moment(item.filmEvaluate.createTime).format("YYYY-MM-DD hh:mm:ss") }}</i>
        <el-divider/>
      </div>
    </div>
  </div>
</template>

<script>
  import {FindFilmById, FindFilmEvaluateByFId} from "@/api/film";

  export default {
    name: "Info",
    data() {
      return {
        film: {},
        evaluateList: [],
        filmId: this.$route.query.fid,
      }
    },

    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },

    mounted() {
      FindFilmById(this.filmId).then(res => {
        this.film = res.data;
      });
      FindFilmEvaluateByFId(this.filmId).then(res => {
        this.evaluateList = res.data.docs;
      })
    }
  }
</script>

<style scoped>

  .item {
    padding-bottom: 40px;
  }

  .header-name {
    color: #000000;
    padding-top: 5px;
    float: left;
    padding-left: 20px;
    font-weight: bolder;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .film-content {
    padding: 80px 200px;
    letter-spacing: 2px;
  }


  .el-rate__icon {
    font-size: 25px;
  }

  .el-rate__text {
    padding-left: 8px;
    font-size: 30px;
  }

</style>
