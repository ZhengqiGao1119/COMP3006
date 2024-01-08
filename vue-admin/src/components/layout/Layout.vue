<template>
  <el-container style="height: 100%">

    <el-aside class="app-aside" :width="!isCollapse?'64px':'230px'">
      <Aside @collapse="Collapse"/>
    </el-aside>
    <el-container>
      <el-header shadow="always" class="app-header">
        <Header/>
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="{ path: item.path}">{{item.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-main style="padding: 20px 20px 100px;" class="app-main">
        <div class="content">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Header from "./Header";
  import Aside from "./Aside";

  export default {
    name: "Layout",
    data() {
      return {
        isCollapse: true
      }
    },
    components: {
      Header,
      Aside,
    },
    computed: {
      routes () {
        return this.$router.options.routes.filter((item) => {
          return item.meta.showInbreadcrumb
        });
      },
      breadcrumb () {
        let matchedArr = this.$route.matched.filter((item) => {
            return item.meta.showInbreadcrumb
          }
        );
        if (matchedArr[0].meta.title !== 'Home') {
          matchedArr.unshift(
            {
              path: '/home',
              meta: {
                title: "Home",
                showInbreadcrumb: true
              }
            },
          )
        }
        return matchedArr;
      },
    },

    methods: {
      Collapse(isCollapse) {
        console.log('isCollapse'+isCollapse)
        this.isCollapse = isCollapse
      }
    }
  }
</script>

<style scoped>


  .app-aside {
    /*width: 250px !important;*/
    background: #242930;
    height: 100%;
  }



  .app-main {
    background: #f5f6f7;
    height: 100%;
  }

  .app-header {
    height: 60px !important;
  }

  .content {
    background: #FFFFFF;
  }


  .breadcrumb {
    font-size: 25px;
    transform: translate(0%,50%);
  }


</style>
