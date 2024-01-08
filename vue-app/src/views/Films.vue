<template>
  <div class="films">
    <div class="tags-panel">
      <ul class="tags-lines">
        <li class="tags-line">
          <div class="tags-title">Film Genres :</div>
          <ul class="tags">
            <li v-for="item in typeList" :key="item.id" :class="selectType===item ? 'active' : ''" @click="handleTypeSelect(item)">
              <router-link :to=" '/films?region='+ selectRegion + '&type=' + item ">{{ item }}</router-link>
            </li>
          </ul>
        </li>
        <li class="tags-line">
          <div class="tags-title">Region :</div>
          <ul class="tags">
            <li v-for="item in regionList" :key="item.id" :class="selectRegion===item ? 'active' : ''"
                @click="handleRegionSelect(item)">
              <router-link :to=" '/films?region='+ item + '&type=' + selectType ">{{ item }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div>
      <el-row :gutter="20" style="padding-top: 60px;">
        <el-col style="padding-bottom: 40px;text-align: center;" v-for="(item, index) in filmList" :key="index"
                :span="4">
          <router-link :to=" '/film/info?fid=' + item.id" target="_blank">
            <el-card shadow="hover" style="padding: 0;">
              <img style="width: 100%; height: 230px;padding-bottom: 10px" :src="item.cover"
                   alt="">
              <div class="s">
                <span>{{ item.name }}</span>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import {FindFilmByRegionAndType, ListAllFilm} from "@/api/film";

  export default {

    name: "Films",

    data() {
      return {
        selectType: 'all',
        selectRegion: 'all',
        typeList: ["all", "Family", "Sci-Fi", "Romance", "Action", "Comedy", "Horror", "Mystery", "Crime", "Adventure", "War", "Historical", "Biography", "Animation short",  "Children", "Other"],
        regionList: ["all", "US", "South Korea", "Japanese", "India", "French", "United Kingdom", "Other"],
        filmList: [],
        type: this.$route.query.type,
        region: this.$route.query.region,
      }
    },

    mounted() {
      if (this.type == undefined || this.region == undefined) {
        ListAllFilm().then(res => {
          console.log(res ,'ffff')
          this.filmList = res.data.docs
        })
      } else {
        FindFilmByRegionAndType(this.region, this.type).then(res => {
          console.log(res, 'eeee');
          this.filmList = res.data.docs
        })
      }

    },


    methods: {

      handleTypeSelect(item) {
        this.selectType = item;
        this.reloadFilmList()
      },

      handleRegionSelect(item) {
        this.selectRegion = item;
        this.reloadFilmList()
      },

      reloadFilmList() {
        FindFilmByRegionAndType(this.selectRegion, this.selectType).then(res => {
          this.filmList = res.data.docs
        })
      },

    },

  }
</script>

<style scoped>
  @import "../assets/css/movie-list.css";
  @import "../assets/css/home.css";

  .films {
    padding: 20px 220px;
  }

  .el-card__body {
    padding: 0 0 10px;
  }

  .s {
    margin-bottom: 0px;
    padding: 0 8px;
    letter-spacing: 1px;
    color: coral;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

</style>
