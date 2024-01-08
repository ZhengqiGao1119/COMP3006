<template>
  <div class="aside">
    <div class="aside-header" style="padding-top: 20px" v-show="!isCollapse">
      <img style="width: 40px; height: 40px;float: left" src="../../assets/img/logo.jpg" alt=""/>
      <div style="padding-left: 15px;padding-top: 8px;float: left;margin-left: 25px">Service</div>
    </div>
    <div class="aside-header" style="padding-top: 20px" v-show="isCollapse">
      <img style="width: 40px; height: 40px;float: left" src="../../assets/img/logo.jpg" alt=""/>
    </div>
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <div>
      <el-col style="padding-top: 0px">
        <el-menu
            class="menu"
            background-color="#242930"
            text-color="#FFFFFF"
            active-text-color="#409EFF"
            :collapse="isCollapse"
            :collapse-transition="false"
            >

          <router-link to="/home">
            <el-menu-item style="padding-left: 65px" index="0">
              <i class="el-icon-s-home"></i>
              <span slot="title">Home</span>
            </el-menu-item>
          </router-link>

          <router-link to="/leaving">
            <el-menu-item style="padding-left: 65px" index="1">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">Cinema Activity</span>
            </el-menu-item>
          </router-link>

          
          <router-link to="/activity">
            <el-menu-item style="padding-left: 65px" index="3">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Activity</span>
            </el-menu-item>
          </router-link>

          <router-link to="/info">
            <el-menu-item style="padding-left: 65px" index="4">
              <i class="el-icon-s-data"></i>
              <span slot="title">Order Statistics</span>
            </el-menu-item>
          </router-link>

          <router-link to="/setting">
            <el-menu-item style="padding-left: 65px" index="6">
              <i class="el-icon-setting"></i>
              <span slot="title">personal settings</span>
            </el-menu-item>
          </router-link>

        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false
    }
  },

  methods: {
    toggleCollapse() {
      this.$emit('collapse', this.isCollapse)
      console.log('aside'+this.isCollapse)
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.aside {
  color: #FFFFFF;
}

.item {
  padding-left: 100px;
}

.aside-header {
  padding: 21px;
  font-size: 18px;
  font-weight: 500;
  margin-left: -10px;

}

.menu {
  font-size: 100px;
  border-right: 0;
  letter-spacing: 1px;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
}

.toggle-button {
  background-color: #4A5064;
  font-size:10px;
  line-height:24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor:pointer;
  margin-top: 25px;
}
</style>
