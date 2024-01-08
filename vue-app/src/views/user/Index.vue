<template>
  <div class="user">
    <div class="main-u">
      <div class="aside-u" style="width: 240px">
        <h2 style="margin-left: 15px;padding:10px 0;letter-spacing: 2px;font-weight: 400">personal center</h2>
        <el-menu
          class="el-menu-vertical-demo">
          <router-link to="/user/cart">
            <el-menu-item index="1">
              <i class="el-icon-shopping-cart-1"></i>
              <span style="letter-spacing: 1px" slot="title">shopping cart</span>
            </el-menu-item>
          </router-link>
          <router-link to="/user/order">
            <el-menu-item index="2">
              <i class="el-icon-s-order"></i>
              <span style="letter-spacing: 1px" slot="title">My Orders</span>
            </el-menu-item>
          </router-link>
          <router-link to="/user/setting">
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span style="letter-spacing: 1px" slot="title">Basic settings</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>

      <div class="content-u">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .user {
    padding: 70px 180px;
  }

  .main-u {
    min-height: 900px;
    overflow-y: scroll;
    background: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    /*z-index: 999;*/
  }

  .main-u::-webkit-scrollbar{
    display: none;
  }

  .aside-u {
    float: left;
    min-height: 900px;
    /*border-right: solid 1px #e6e6e6;*/
  }

  .el-menu {
    border-right: none;
  }

  .content-u {
    float: left;
    padding: 10px 40px;
    width: 800px;
    min-height: 900px;
    border-left: solid 1px #e6e6e6;
    overflow: auto;
  }
</style>
