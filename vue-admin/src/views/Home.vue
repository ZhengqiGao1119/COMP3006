<template>
  <div class="dashboard-editor-container">
    Welcome to the Cinema Booking System backend management
  </div>
</template>

<script>

  import {findHome} from "@/api/home";
  import {ListDailyWork,AddDailyWork,DeleteDailyWork} from "@/api/worker";


  export default {
    name: 'index',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
  }
</script>

<style scoped lang="scss">
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>

