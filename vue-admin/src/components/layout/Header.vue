<template>
  <div class="header">
    <div class="a">
      <div class="header-avatar">
        <el-dropdown>
          <el-button type="text">
            <div v-if="role === 'admin'" class="header-name">Admin</div>
            <el-avatar  v-if="role === 'admin'" style="margin-top: 4px" :size="29"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            </el-avatar>

            <div v-if="role === 'worker'" class="header-name">{{ worker.nickname }}</div>
            <img v-if="role === 'worker'" style="margin-top: 5px;width: 29px;height: 29px;border-radius: 50%"
                 :src="worker.avatar" alt="null"/>

          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-link v-if="role==='worker'" :underline="false" href="/setting">
                <i style="font-size: 15px; padding-right: 3px" class="el-icon-setting"></i>personal settings
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-button type="text" @click="handleLogout">
                <i style="font-size: 15px; padding-right: 3px" class="el-icon-switch-button"></i>Log out
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="header-icon" style="padding-top: -15px">
        <el-dropdown>
          <el-badge value="new" class="item">
            <i style="font-size: 18px" class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in list" :key="index">{{ item.content }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="header-icon" style="margin-top: 22px">
        <el-tooltip content="Cinema Booking System - Management System" placement="top">
          <i style="font-size: 20px;" class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>

    </div>
  </div>
</template>

<script>
  import {ListDailyWork, FindWorkerById} from "../../api/worker";

  export default {
    name: "Header",

    data() {
      return {
        list: [],
        role: localStorage.getItem('role'),
        worker: {
          nickname: '',
          password: '',
          phone: '',
          gender: '',
          avatar: '',
          department: '',
        },
      }
    },

    mounted() {

      // FindWorkerById(localStorage.getItem("wid")).then(res => {
      //   this.worker = res.data;
      // });
      ListDailyWork().then(res => {
        setTimeout(() => {
          this.list = res.data
        }, 700)
      })
    },


    methods: {

      handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("wid")
        this.$router.push("/login")
      }

    },

  }
</script>

<style scoped>

  .header {
  }

  .header-icon {
    float: right;
    font-size: 20px;
    padding-right: 30px;
    margin-top: 20px;

  }

  .header-avatar {
    float: right;
    padding-left: 20px;
  }

  .header-name {
    float: right;
    padding-top: 0px;
    font-size: 15px;
    padding-right: 10px;
    padding-left: 9px;
    margin-top: 15px;

  }

  .el-button {
    padding-top: 8px;
    color: #000000;
    letter-spacing: 2px;
  }


  .d2{
    font-size: 20px;
    color: #8c939d;
    letter-spacing: 1px;
    position: absolute;
    right: 550px;
    /*margin-left: 450px;*/
  }
</style>
