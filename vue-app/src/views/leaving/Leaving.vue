<template>
  <div class="main">

    <el-container>
      <el-aside width="400px">
        <h1 style="color: #FFFFFF;padding-bottom: 40px;letter-spacing: 1px">Customer Service</h1>
        <div class="item" v-for="(item, index) in workerList" :key="index">
          <img class="av" alt="" :src="item.avatar">
          <div>
            <div class="d1">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-user-solid"></i>
                  <span>name: {{ item.nickname }}</span>
                </span>
              </span>
            </div>
            <div class="d1">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-d-caret"></i>
                  <span>gender: {{ item.gender }}</span>
                </span>
              </span>
            </div>
            <div class="d1">
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-phone"></i>
                  <span>phone: {{ item.phone }}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </el-aside>

      <el-main>
        <h1 style="color: #FFFFFF;padding-bottom: 40px;letter-spacing: 1px">Cinema Activity</h1>
        <el-button :disabled="!isLogin"
                   @click="handleLeaving"
                   class="btn"
                   type="success"
                   icon="el-icon-share"
                    style="transform: translate(-20%, -150%)">
          add activity
        </el-button>
        <div class="item2" v-for="(item, index) in leavingMessageList" :key="index">
          <div style="display: flex">
            <img class="av2" :src="item.user.avatar" alt="null">
            <div>
              <div class="d2">{{ item.user.nickname }}</div>
              <div v-if="!item.user.nickname" class="d2">anonymous user</div>
              <div class="d3">{{ item.leavingMessage.content }}</div>
              <div class="d2" style="margin-top: 10px">activity time: {{ $moment(item.leavingMessage.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</div>
            </div>
          </div>
          <div v-if="item.leavingMessage.reply && item.leavingMessage.reply!='null'" class="reply">
            <div class="d2"><span style="color: #55db3b;font-weight: 900;">></span>Customer Service Response:</div>
            <div class="d3">{{ item.leavingMessage.reply }}</div>
          </div>
          <el-divider/>
        </div>

      </el-main>
    </el-container>


    <el-dialog title="add activity" :visible.sync="dialogFormVisible2" @close="handleClose">
      <el-form ref="form2" :model="leavingMessage" :rules="rules">
        <el-form-item prop="content">
          <el-input type="textarea" placeholder="Please fill in your activity for the cinema!" :rows="8" v-model="leavingMessage.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
        <el-button type="primary" @click="submitLeaving">Submit</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    CreateEvaluate,
    CreateLeavingMessage,
    ListAllLeavingMessage,
    ListAllWorker,
    ListWorkerEvaluate
  } from "@/api/leaving";

  export default {
    inject:['reload'],
    data() {
      return {
        rules: {
          content: [
            { required: true, message: 'Please fill in this field!', trigger: 'blur' }
          ],


        },
        isLogin: false,
        evaluate: {
          wid: '',
          uid: localStorage.getItem("uid"),
          type: 'very satisfied',
          content: '',
        },
        evaluateList: [],
        workerList: [],
        leavingMessageList: [],
        leavingMessage: {
          uid: localStorage.getItem("uid"),
          reply: '',
          content: '',
          createAt: '',
        },
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
      }
    },

    mounted() {
      if (localStorage.getItem("uid")) {
        this.isLogin = true
      }
      ListAllLeavingMessage().then(res => {
        console.log(res, 'rrrrr');
        this.leavingMessageList = res.data.docs
      })
      ListAllWorker().then(res => {
        this.workerList = res.data
      })
    },

    methods: {

      handleListEvaluate(item) {
        this.dialogFormVisible3 = true
        ListWorkerEvaluate(item.id).then(res => {
          console.log(res, 'rrr');
          this.evaluateList = res.data
        })
      },

      handleEvaluate(item) {
        this.dialogFormVisible1 = true
        this.evaluate.wid = item.id
      },

      handleLeaving() {
        this.dialogFormVisible2 = true
      },


      submitLeaving() {
        this.$refs.form2.validate((valid) => {
          if (valid) {
            CreateLeavingMessage(this.leavingMessage).then(res => {
              if (res.success) {
                this.dialogFormVisible2 = false
                this.$message({
                  message: 'Thank you for leaving your valuable feedback on Cinema Booking System!',
                  type: 'success'
                });
                this.reload()
              }
            })
          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        });


      },

      handleClose(){
        this.$refs.form1.resetFields();
        this.$refs.form2.resetFields();
      },

    },

  }
</script>

<style scoped>

  .main {
    color: #FFFFFF;
    padding: 40px;
  }

  .el-aside {
    background-color: #242930;
    color: #333;
    padding: 10px 50px 40px;
    min-height: 500px;
  }

  .el-main {
    background-color: #353b43;
    color: #333;
    padding: 10px 70px 50px;
    min-height: 500px;
  }

  .item {
    margin-bottom: 40px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(255, 255, 255, .3);
  }

  .item2 {
    padding-bottom: 60px;
  }

  .av {
    width: 76px;
    height: 76px;
    border-radius: 38px;
    margin-right: 20px;
    float: left;
  }

  .av2 {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin-right: 20px;
    margin-top: 10px;
  }

  .d1 {
    letter-spacing: 2px;
    line-height: 30px;
    color: #afbac4;
    font-size: 14px;
  }

  .d2 {
    color: #afbac4;
    letter-spacing: 2px;
    font-size: 14px;
    line-height: 30px;
  }

  .d3 {
    letter-spacing: 2px;
    font-size: 15px;
    font-weight: 400;
    line-height: 30px;
    color: #FFFFFF;
  }

  .el-button--text {
    color: #57cc8a;
  }

  .btn {
    float: right;
    background: #57cc8a;
    letter-spacing: 1px;
  }

  .reply {
    padding-left: 75px;
    padding-top: 15px;
  }

</style>
