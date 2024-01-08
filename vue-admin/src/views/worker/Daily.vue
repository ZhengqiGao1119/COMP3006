<template>
  <div style="height: 500px">
    <el-button @click="dialogFormVisible = true" style="margin-left: 20px;margin-top: 20px" type="primary" plain>Add Today's Work Goals</el-button>

    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%;"
      height="560">
      <el-table-column
        prop="createTime"
        label="Add Time"
        width="300"
        sortable>
        <template #default="{row}">
          {{ $moment(row.createTime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="Level" width="300">
        <template slot-scope="props">
          <el-tag type="info" v-if="props.row.type === 1" effect="dark">
            Normal
          </el-tag>
          <el-tag type="success" v-if="props.row.type === 2" effect="dark">
            Important
          </el-tag>
          <el-tag type="danger" v-if="props.row.type === 3" effect="dark">
            Very Important
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="Main Content">
      </el-table-column>
      <el-table-column width="200" label="operate">
        <template slot-scope="props">
          <el-popconfirm
            confirm-button-text='Confirm'
            cancel-button-text='Cancel'
            icon="el-icon-info"
            icon-color="red"
            @confirm="handleDelete(props.$index)"
            title="Are you sure you want to delete this work goal? "
          >
           <el-button
             style="margin-right: 60px"
             type="danger"
             size="mini"
             icon="el-icon-delete"
             slot="reference" plain>delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

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

    <el-dialog title="Shipping Address" :visible.sync="dialogFormVisible"  @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="Work Level" label-width="180px" prop="type">
          <el-select v-model="form.type" placeholder="Please select the work level.">
            <el-option label="Normal" value="1"></el-option>
            <el-option label="Important" value="2"></el-option>
            <el-option label="Very Important" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="Main Content" label-width="180px" prop="content">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveDailyWork">Confirm Save</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {AddDailyWork, DeleteDailyWork, ListDailyWork} from "@/api/worker";
  import config from "@/config";

  export default {

    data() {
      return {
        rules: {
          type: [
            { required: true, message: 'Please select the work level!', trigger: ['blur','change'] }
          ],
          content: [
            { required: true, message: 'Please fill in the main content!', trigger: 'blur' }
          ],
        },
        loading: false,
        list: [],
        dialogFormVisible: false,
        form: {
          type: '',
          content: '',
        },
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
      }
    },

    mounted() {
      this.listDailyByPage();
    },

    methods: {

      loadList() {
        this.loading = true;
        ListDailyWork().then(res => {
          setTimeout(() => {
            this.list = res.data.docs
            this.loading = false
          }, 300)
        })
      },

      saveDailyWork() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            AddDailyWork(this.form).then(res => {
              this.dialogFormVisible = false
              this.loadList()
              this.$message({
                type: 'success',
                message: 'Saved successfully!'
              });
            })
          } else {
            this.$message.error('Please complete the information about the form first!');
            return false;
          }
        });

      },

      handleDelete(index) {
        DeleteDailyWork(this.list[index].id).then(res => {
          this.list.slice(index, 1)
          this.loadList()
          this.$message({
            type: 'success',
            message: 'Deleted successfully!'
          });
        })
      },

      handleClose(){
        this.$refs.form.resetFields();
      },

      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listDailyByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listDailyByPage();
      },

      listDailyByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/daily/page?page=" + this.params.page + "&limit=" + this.params.limit,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            console.log(res.data);
            this.list = res.data.data.docs;
            this.total = res.data.data.total;
          });
      },


    }

  }
</script>

<style scoped>

</style>
