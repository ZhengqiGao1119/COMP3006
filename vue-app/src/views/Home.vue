<template>
  <div class="app">
    <el-carousel height="500px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in posterList" :key="index">
          <img alt=""
               :src="item.url"
               style="width: 100%;height: 500px">
      </el-carousel-item>
    </el-carousel>

    <div class="main">
      <div class="movie-grid">
        <div>
          <div class="panel-header">
            <span class="panel-title">
              <span class="panel-more">
                <router-link :to="'/films?region=all&type=all'" style="color: #ffb400">
                <span class="textcolor_orange">all </span>
                <span class="panel-arrow panel-arrow-orange"></span>
                </router-link>
              </span>
              <span class="textcolor_orange">Popular  ( {{ filmList.length }} )</span>
            </span>
          </div>
          <div class="panel-content">
            <dl class="movie-list">
              <dd v-for="(item, index) in filmList" :key="index">
                <router-link :to="'/film/info?fid=' + item.id" target="_blank">
                  <div class="movie-item">
                    <div class="movie-poster">
                      <img class="poster-default" alt=""
                           :src="item.cover">
                      <img class="movie-poster-img" alt="Poster cover"
                           :src="item.cover">
                      <div class="movie-overlay movie-overlay-bg">
                        <div class="movie-info">
                          <div class="movie-title" title="">{{ item.name }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="movie-detail movie-wish" style="text-align: center;margin-right: 20px;margin: 0;padding: 0">
                      <ul>
                        <li
                          :class="{'link-item-active': item.id == activeLinkId,'link-item-hover':index==hoverIndex}"
                          @mouseover="hoverIndex = index"
                          @mouseout="hoverIndex = -1">
                          <span style="text-align: center">ticketing</span>
                        </li>
                      </ul>
                    </div>
                    <div class="movie-ver"></div>
                  </div>
                  <div class="movie-detail movie-rt">{{ $moment(item.releaseTime).format("YYYY-MM-DD hh:mm:ss") }}</div>
                </router-link>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="main" style="margin-top: 30px;">
      <div class="movie-grid">
        <div>
          <div class="panel-header">
            <span class="panel-title">
              <span class="panel-more">
                <router-link :to="'/films?region=all&type=all'" target="_blank">
                <span style="color: #0081CF">all </span>
                <span class="panel-arrow panel-arrow-blue"></span>
                </router-link>
              </span>
              <span style="color: #0081CF">Upcoming screenings  ( {{ filmList1.length }} )</span>
            </span>
          </div>
          <div class="panel-content">
            <dl class="movie-list">
              <dd v-for="(item, index) in filmList1" :key="index">
                <router-link :to="'/film/info?fid=' + item.id" target="_blank">
                  <div class="movie-item">
                    <div class="movie-poster">
                      <img class="poster-default" alt=""
                           :src="item.cover">
                      <img class="movie-poster-img" alt="Poster cover"
                           :src="item.cover">
                      <div class="movie-overlay movie-overlay-bg">
                        <div class="movie-info">
                          <div class="movie-title" title="">{{ item.name }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="movie-detail movie-wish1" style="text-align: center;margin-right: 20px;margin: 0;padding: 0">
                      <ul>
                        <li
                          :class="{'link-item-active1': item.id == activeLinkId1,'link-item-hover1':index==hoverIndex1}"
                          @mouseover="hoverIndex1 = index"
                          @mouseout="hoverIndex1 = -1">
                          <span style="text-align: center;">pre-sale</span>
                        </li>
                      </ul>
                    </div>
                    <div class="movie-ver"></div>
                  </div>
                  <div class="movie-detail movie-rt">{{ $moment(item.releaseTime).format("YYYY-MM-DD hh:mm:ss") }}</div>
                </router-link>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ListAllFilm, ListAllPoster, ListHots, ListAllFilmByStatus1, ListAllFilmByStatus2, ListBoxOffice} from "@/api/film";

  export default {

    data() {
      return {
        top1: {},
        top2: {},
        top3: {},
        topb1: {},
        topb2: {},
        topb3: {},
        filmList: [],
        filmList1: [],
        posterList: [],
        officeList: [],
        active: '',
        hoverIndex: -1,
        activeLinkId: 0,
        hoverIndex1: -1,
        activeLinkId1: 0,
      }
    },

    mounted() {
      ListAllFilmByStatus1().then(res => {
        this.filmList = res.result.docs
      })
      ListAllFilmByStatus2().then(res => {
        console.log(res, 'fff');
        this.filmList1 = res.result.docs
      })
      ListAllPoster().then(res => {
        this.posterList = res.result
      })
    },

    methods: {

    }
  }
</script>

<style scoped>
  @import "../assets/css/home.css";

  .app {
    padding: 50px 120px;
  }

  .as {
    float: right;
  }

  .main {
    padding-top: 40px;
  }

  .link-item-hover {
    background-color: #FF0032;

  }
  .link-item-active {
    color: #fff;
    background-color: #f6f6f6;
  }

  .link-item-hover1 {
    background-color: #0081CF;
    color: #faf9f9;
  }

  .link-item-active1 {
    color: #fff;
    background-color: #f6f6f6;
  }



</style>
