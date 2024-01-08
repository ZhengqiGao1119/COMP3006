<template>

  <div class="header">
      <div class="header-avatar">
        <el-dropdown>
          <el-button type="text">
            <div class="header-name" style="margin-top: 12px">{{ worker.nickname }}</div>
            <img style="margin-top: 5px;width: 29px;height: 29px;border-radius: 50%"
                 :src="worker.avatar" alt="null"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-link :underline="false" href="/setting">
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

      <div class="header-icon" style="margin-top: 17px">
        <el-dropdown>
          <el-badge value="new" class="item">
            <i style="font-size: 18px" class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in list" :key="item">{{ item.content }}</el-dropdown-item>
            <el-dropdown-item v-if="list.length === 0">There's no news here yet.</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="header-icon" style="margin-top: 20px">
        <el-tooltip content="Cinema Booking System - Customer Service System" placement="top">
          <i style="font-size: 20px;" class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
  </div>
</template>

<script>
import {FindWorkerById, ListDailyWork} from "@/api/worker";

export default {
  name: "Header",

  data() {
    return {
      list: [],
      worker: {
        nickname: '',
        password: '',
        phone: '',
        gender: '',
        avatar: '',
        department: '',
      },
      role: localStorage.getItem('role')
    }
  },

  mounted() {
    FindWorkerById(localStorage.getItem("wid")).then(res => {
      this.worker = res.data;
    });
    ListDailyWork().then(res => {
      setTimeout(() => {
        this.list = res.data
      }, 200)
    })
  },

  methods: {
    handleLogout() {
      localStorage.removeItem("wid")
      localStorage.removeItem("token")
      this.$router.push('/login')
    }
  }


}
</script>

<style scoped>

.header {

}

.header-icon {
  float: right;
  font-size: 20px;
  padding-top: 0px;
  padding-right: 30px;
  margin-top: -5px;

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
  margin-top: -8px;

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

}
</style>
