<template>
    <el-container>
      <el-header style="padding: 0">
        <Header/>
      </el-header>
      <el-main style="padding: 0">
        <router-view/>
      </el-main>
      <el-footer style="padding: 0">
        <Footer/>
      </el-footer>
    </el-container>
</template>

<script>
  import Footer from './Footer'
  import Header from './Header'
  export default {
    name: 'Layout',
    components: { Header, Footer }
  }
</script>

<style scoped>


  .el-main {
    overflow: auto;
  }

  .el-header {
    position: sticky;
    top: 0px;
    z-index: 200;
  }


</style>
