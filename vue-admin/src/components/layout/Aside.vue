<template>
  <div class="aside">
    <div class="aside-header" style="padding-top: 15px" v-show="!isCollapse">
      <img style="width: 40px; height: 40px;float: left" src="../../assets/img/logo.jpg" alt=""/>
      <div style="padding-left: 15px;padding-top: 8px;float: left;margin-left: 20px">Management</div>
    </div>
    <div class="aside-header" style="padding-top: 15px" v-show="isCollapse">
      <img style="width: 40px; height: 40px;float: left" src="../../assets/img/logo.jpg" alt=""/>
    </div>
    <div class="toggle-button" @click="toggleCollapse" >|||</div>
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
            <el-menu-item index="9">
              <i class="el-icon-s-home"></i>
              <span slot="title">Home</span>
            </el-menu-item>
          </router-link>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-film"></i>
              <span>Film</span>
            </template>
            <el-menu-item-group>
              <router-link to="/film/list">
                <el-menu-item style="padding-left: 70px" index="2-1">Film List</el-menu-item>
              </router-link>
              <router-link to="/film/arrange">
                <el-menu-item style="padding-left: 70px" index="2-4">Cinema layout</el-menu-item>
              </router-link>
              <router-link to="/film/add">
                <el-menu-item style="padding-left: 70px" index="2-2">Save Film</el-menu-item>
              </router-link>
              <router-link to="/film/poster">
                <el-menu-item style="padding-left: 70px" index="2-5">Poster</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>User</span>
            </template>
            <el-menu-item-group>
              <router-link to="/user/list">
                <el-menu-item style="padding-left: 70px" index="1-1">User List</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>Order</span>
            </template>
            <el-menu-item-group>
              <router-link to="/order/list">
                <el-menu-item style="padding-left: 70px" index="6-1">Order List</el-menu-item>
              </router-link>
              <router-link to="/order/exception">
                <el-menu-item style="padding-left: 70px" index="6-2">Order Exceptions</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>Workers</span>
            </template>
            <el-menu-item-group>
              <router-link to="/worker/list">
                <el-menu-item style="padding-left: 70px" index="3-1">Workers List</el-menu-item>
              </router-link>
              <router-link to="/worker/daily">
                <el-menu-item style="padding-left: 70px" index="3-2">Daily Work</el-menu-item>
              </router-link>
              <router-link to="/worker/add">
                <el-menu-item style="padding-left: 70px" index="3-3">Save Worker</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        role: localStorage.getItem('role'),
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
