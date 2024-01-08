<template>
  <div style="padding: 25px">
    <el-button @click="dialogFormVisible = true" type="primary" plain>Add Cinema Activity</el-button>
    <template>
      <el-input
        style="width: 20%; margin-left: 830px"
        v-model="search"
        size="mini"
        placeholder="Please enter the event title to search"/>
    </template>

    <el-divider/>

    <el-table
      v-loading="loading"
      :data="list.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;"
      height="520">
      <el-table-column
        prop="title"
        label="Activity Title">
      </el-table-column>
      <el-table-column
        prop="number"
        label="Number of participants"
        sortable>
      </el-table-column>
      <el-table-column
        prop="content"
        width="240"
        label="Activity content"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="Starting time"
        width="200"
        sortable>
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="End Time"
        width="200"
        sortable>
      </el-table-column>
      <el-table-column width="200" label="operate">
        <template style="white-space: nowrap" slot-scope="props">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(props.$index, props.row)">update
          </el-button>
          <el-popconfirm
            confirm-button-text='Confirm'
            cancel-button-text='Cancel'
            icon="el-icon-info"
            icon-color="red"
            @confirm=handleDelete(props.$index)
            title="Sure you want to delete this activity?"
          >
            <el-button style="margin-left: 10px" size="mini" type="danger" slot="reference" icon="el-icon-delete" plain>delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="New Activity Forms" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item style="padding-right: 100px" label="Start Time" label-width="180px" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="Start Time"
            :picker-options="StartTime"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="End Time" label-width="180px" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="End Time"
            :picker-options="EndTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label-width="180px" label="Activity Title" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="Activity content" label-width="180px" prop="content">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitActivity">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Cinema Event Modification" :visible.sync="dialogFormVisible1">
      <el-form ref="form1" :model="form1" :rules="rules">
        <el-form-item style="padding-right: 100px" label="Start Time" label-width="180px" prop="startTime">
          <el-date-picker
            v-model="form1.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="Start Time"
            :picker-options="StartTime1"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="End Time" label-width="180px" prop="endTime">
          <el-date-picker
            v-model="form1.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="End Time"
            :picker-options="EndTime1"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label-width="180px" label="Activity Title" prop="title">
          <el-input v-model="form1.title"></el-input>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="Activity content" label-width="180px" prop="content">
          <el-input :rows="8" type="textarea" v-model="form1.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="submitUpdate()">Confirm</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {CreateActivity, DeleteActivityById, ListAllActivity, UpdateActivity, findActivityById} from "@/api/activity";

  export default {

    data() {
      return {
        rules: {
          startTime: [
            { required: true, message: 'Please select an event start time!', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: 'Please select an event end time!', trigger: 'blur' }
          ],
          title: [
            { required: true, message: 'Please fill in the event title!', trigger: 'blur' }
          ],
          content: [
            { required: true, message: 'Please fill in the activities!', trigger: 'blur' }
          ],
        },
        pickerOptions: {
          disabledDate(time) {
              return time.getTime() < Date.now() - 3600 * 1000 * 24;
          },
          shortcuts: [{
            text: 'today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'tomorrow',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'a week later',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        StartTime: {
          disabledDate: time => {
            if (this.form.endTime) {
              return (
                time.getTime() > new Date(this.form.endTime).getTime() || time.getTime() < Date.now() - 8.64e7
              )
            } else {
              return time.getTime() < Date.now() - 8.64e7
            }
          },
        },
        EndTime: {
          disabledDate: time => {
            if (this.form.startTime) {
              return (
                time.getTime() < new Date(this.form.startTime).getTime() - 8.64e7
              )
            } else {
              return time.getTime() < Date.now() - 8.64e7
            }
          }
        },
        StartTime1: {
          disabledDate: time => {
            if (this.form1.endTime) {
              return time.getTime() > new Date(this.form1.endTime).getTime() || time.getTime() < Date.now() - 8.64e7
            } else {
              return time.getTime() < Date.now() - 8.64e7
            }
          },
        },
        EndTime1: {
          disabledDate: time => {
            if (this.form1.startTime) {
              return time.getTime() < new Date(this.form1.startTime).getTime()
            } else {
              return time.getTime() < Date.now() - 8.64e7
            }
          }
        },
        loading: false,
        list: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form: {
          title: '',
          content: '',
          startTime: '',
          endTime: '',
        },
        form1: {
          title: '',
          content: '',
          startTime: '',
          endTime: '',
        },
        search: '',
      }
    },

    mounted() {
      this.loadList();
    },

    methods: {

      loadList() {
        this.loading = true;
        ListAllActivity().then(res => {
          setTimeout(() => {
            this.list = res.data
            this.loading = false
          }, 100)
        })
      },

      submitActivity() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            CreateActivity(this.form).then(res => {
              if (res.success) {
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: 'Cinema event Added successfully!'
                });
                this.loadList()
              } else {
                this.$message.error('Please complete the information about the form first!');
                return false;
              }
            })
          }
        });

      },

      submitUpdate() {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            UpdateActivity(this.form1).then(res => {
              if (res.success) {
                this.dialogFormVisible1 = false;
                this.$message({
                  message: 'Cinema event Modified successfully！',
                  type: 'success',
                });
              }
              this.loadList()
            })
          }
        });
      },

      handleDelete(index) {
        DeleteActivityById(this.list[index].id).then(res => {
          if (res.success) {
            this.list.slice(index, 1)
            this.$message({
              type: 'success',
              message: 'Deleted successfully!'
            });
            this.loadList()
          }
        })
      },

      handleEdit(index, row) {
        this.dialogFormVisible1 = true;
        findActivityById(row.id).then(res => {
          this.form1 = res.data;
        })
      },

      handleClose(){
        this.$refs.form.resetFields();
      },

    },

  }
</script>

<style>
  .el-tooltip__popper {
    max-width: 60% !important;
  }
  .el-tooltip__popper,
  .el-tooltip__popper.is-dark {
    max-width: 60% !important;
    line-height: 24px;
    color: #fff !important;
    background-color: #4B4453 !important;
  }
</style>
