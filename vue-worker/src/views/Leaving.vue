<template xmlns:padding-top="http://www.w3.org/1999/xhtml">
  <div class="main">
    <h3 style="letter-spacing: 1px;padding-bottom: 1px;margin-top: 5px ">Activity content</h3>
    <div class="item2" v-for="(item, index) in leavingMessageList" :key="index">
      <div style="display: flex">
        <img class="av2" :src="item.user.avatar" alt="null" border>
        <div>
          <div class="d2">{{ item.user.nickname }}</div>
          <div v-if="!item.user.nickname" class="d2">anonymous user</div>
          <div class="d3">{{ item.leavingMessage.content }}</div>
          <div class="d2">activity time: {{ $moment(item.leavingMessage.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
      </div>
      <div class="reply" v-if="item.leavingMessage.reply != 'null'">
        <div class="d2">Customer Service Response:</div>
        <div class="d3">{{ item.leavingMessage.reply }}</div>
      </div>
      <div class="reply">
        <el-button @click="handleReply(item, index)" type="success" size="small" style="margin-top: 30px">Reply to activity</el-button>
        <el-popconfirm
            confirm-button-text='Confirm'
            cancel-button-text='Cancel'
            icon="el-icon-info"
            icon-color="red"
            @confirm=handleDelete(item,index)
            title="Does Confirm want to delete this activity?? "
          >
            <el-button slot="reference" type="danger" size="small" style="margin-left:10px;margin-top: 30px">
              delete activity
            </el-button>
          </el-popconfirm>

      </div>
      <el-divider/>
    </div>
    <div style="text-align:center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.params.page"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="this.params.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>

    <el-dialog title="Reply to activity" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="reply">
          <el-input type="textarea" :rows="8" v-model="form.reply" autocomplete="off" placeholder="Please enter your ACTIVITY reply to this user!"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitReply">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {ListAllLeavingMessage, ReplyLeavingMessage,DeleteLMById} from "@/api/leaving";
  import config from "@/config";

  export default {
    inject:['reload'],
    data() {
      return {
        rules: {
          reply: [
            {required: true, message: 'Please fill out the activity response!', trigger: 'blur' }
          ],
        },
        workerList: [],
        leavingMessageList: [],
        form: {
          username: localStorage.getItem("username"),
          reply: ''
        },
        dialogFormVisible: false,
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
      }
    },

    mounted() {
      this.listLeavingByPage();
    },

    methods: {

      handleReply(item, index) {
        this.dialogFormVisible = true
        this.form = item.leavingMessage
      },

      handleDelete(item, index) {
        console.log(item)
        DeleteLMById(item.leavingMessage.id).then(res => {
          if (res.success) {
            this.leavingMessageList.splice(index, 1)
            this.$message({
              message: 'activityDeleted successfully！',
              type: 'success'
            });
          }
        })
      },

      submitReply() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            ReplyLeavingMessage(this.form).then(res => {
              if (res.success) {
                this.reload();
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: 'Activity response successful!'
                });
              }
            })
          }
        });
      },

      handleClose(){
        this.$refs.form.resetFields();
      },

      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listLeavingByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listLeavingByPage();
      },

      listLeavingByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/lm/page?page=" + this.params.page + "&limit=" + this.params.limit,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data, 'data');
            this.leavingMessageList = res.data.data.docs;
            this.total = res.data.data.total;
          });
      },


    },

  }
</script>

<style scoped>

  .main {
    color: #000000;
    padding: 20px;
  }

  .item2 {
    padding-bottom: 20px;
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
    color: #000000;
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
    padding-top: 10px;
  }

</style>
