<template>
    <div class="a">
      <img src="../../assets/svg/404.jpg" alt=""/>
      <div class="d1">404</div>
      <div class="d2">Sorry, the page is temporarily inaccessible...</div>
      <div class="d2">Error Message: The server cannot find the requested page.</div>
      <router-link to="/">
        <el-button style="margin: 30px 118px;background-color: #8d64b1;transform: translate(100%, 30%);" type="primary" round>Back to the first page</el-button>
      </router-link>
    </div>
</template>

<style scoped>
  .main {
    background: #f5f6f7;
  }

  .a{
    position: absolute;
    left: 50%;
    top: 52%;
    transform: translate(-50%, -50%);
  }

  .main img {
    width: 300px;
    margin: auto;
  }

  .d1{
    font-size: 25px;
    text-align: center;
    padding-top: 30px;
  }

  .d2{
    padding-top: 15px;
    font-size: 15px;
    color: #8c939d;
    letter-spacing: 1px;
    text-align: center;
    font-style: oblique;
  }
</style>
