<template>
  <div class="main">
    <el-timeline>
      <el-timeline-item
        style="letter-spacing: 2px"
        v-for="(item, index) in list"
        :key="index"
        :timestamp="item.startTime"
        placement="top">
        <el-card>
          <h3 style="color: #6094e5"><{{ item.title }}>:</h3>
          <h4 class="h1">{{ item.content }}</h4>
          <el-tag type="info" v-if="item.startTime > now" style="transform: translate(10%, 75%)">Not started</el-tag>
          <el-tag type="danger" v-else-if="item.endTime < now" style="transform: translate(10%, 75%)">Closed</el-tag>
          <el-button v-else @click="handleRegister(item)" type="primary" style="transform: translate(10%, 75%)" round>sign up</el-button>
          <h4 class="p1" style="text-align: right">activity End Time：{{ item.endTime }}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import {ListAllActivity, SubmitActive} from "@/api/active";

  export default {

    data() {
      return {
        list: [],
        form: {
          aid: '',
          uid: '',
        },
        now: this.$moment(new Date()).format("YYYY-MM-DD")
      }
    },

    mounted() {
      this.load()
    },

    methods: {

      load() {
        console.log(this.$moment(this.now).format("YYYY-MM-DD"))
        ListAllActivity().then(res => {
          if (res.success) {
            this.list = res.data
          }
        })
      },

      handleRegister(item) {
        if (!localStorage.getItem("uid")) {
          this.$confirm('The system has not detected your login information, whether to go to log in?', 'tip', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'cancel',
            type: 'warning'
          }).then(() => {
            this.$router.push("/login")
          })
        } else {
          this.form.aid = item.id
          this.form.uid = localStorage.getItem('uid')
          SubmitActive(this.form).then(res => {
            if (res.success) {
              this.$message({
                message: 'Event registration was successful!',
                type: 'success'
              });
            }
          })
        }
      },

    },

  }

</script>

<style scoped>
  .main {
    padding: 100px;
    margin-top: -40px;
  }

  .h1 {
    font-size: 18px;
  }

  .p1 {
    color: #666666;
    font-weight: 300;
  }
</style>
