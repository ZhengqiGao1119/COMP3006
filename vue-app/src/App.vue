<template>
    <router-view v-if="isRouterAlive"/>
</template>

<script>

  export default {
    name: 'App',
    provide(){
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true
      }
    },
    methods:{
      reload(){
        this.isRouterAlive=false
        this.$nextTick(()=>this.isRouterAlive=true)
      }
    },

  }
</script>

<style>
  .app {
    font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
    letter-spacing: 1px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    width: 100%;
    min-width: 1500px;
    height: 100%;
    margin: 0;
  }

  html {
    width: 100%;
    height: 100%;
  }

  a{
    text-decoration: none;
    color: #409EFF;
  }


</style>
