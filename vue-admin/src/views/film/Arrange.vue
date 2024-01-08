<template>
  <div class="main">

    <el-dialog
      title="update movie schedule"
      :visible.sync="dialog"
      width="50%">

      <el-form ref="form" :model="arrangement" label-width="180px" :rules="rules">

        <el-form-item label="Movie Name">
          <el-input :disabled="true" v-model="arrangement.name"></el-input>
        </el-form-item>

        <el-form-item label="Open Seating" prop="seatNumber">
          <el-input-number v-model="arrangement.seatNumber" :min="10" :max="100"></el-input-number>
        </el-form-item>

        <el-form-item label="Type of screening">
          <el-select v-model="arrangement.type" placeholder="place choose Type of screening" :disabled="true">
            <el-option label="2D" value="2D"></el-option>
            <el-option label="3D" value="3D"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="width: 500px" label="Screening Date" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Select Date" v-model="arrangement.date"
                            value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item style="width: 500px" label="Release time">
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-time-picker placeholder="Starting time" value-format="HH:mm:ss" v-model="arrangement.startTime"
                              style="width: 100%;" :picker-options="{selectableRange: `00:00:00 - ${arrangement.endTime ? arrangement.endTime : '23:59:59'}`}"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-time-picker placeholder="End Time" value-format="HH:mm:ss" v-model="arrangement.endTime"
                              style="width: 100%;" :picker-options="{selectableRange: `${arrangement.startTime ? arrangement.startTime : '00:00:00'} - 23:59:59`}"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Movie Ticket Prices" prop="price">
          <el-input-number v-model="arrangement.price" :precision="2" :step="0.1" :max="999.99"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" @click="submitEditArrange">Confirm</el-button>
      </span>
    </el-dialog>

    <el-table
      v-loading="loading"
      :data="List.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="630"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        label="Movie Name"
        prop="name"
      >
        <template slot-scope="scope">
          <el-tooltip
            v-model="scope.row.showTooltip"
            effect="dark"
            :disabled="!scope.row.showTooltip"
            :content="scope.row.name"
            placement="top"
            :open-delay="100">
            <div
              style="font-size: 12px;font-weight: bold;padding-top: 5px;padding-left: 3px;"
              @mouseover="isShowTooltip($event, scope.row)"
            >
              {{scope.row.name | ellipsis}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        label="Release time"
        prop="date"
        sortable
      >
        <template #default="{row}">
          {{ $moment(row.date).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>

      <el-table-column
        label="Open Seating"
        prop="seatNumber">
      </el-table-column>

      <el-table-column label="Type of screening">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.type === '2D'" type="success" disable-transitions>2D</el-tag>
          <el-tag effect="dark" v-if="scope.row.type === '3D'" type="primary" disable-transitions>3D</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="Box office statistics/£"
        prop="boxOffice">
      </el-table-column>

      <el-table-column
        label="End Time"
        prop="endTime">
      </el-table-column>

      <el-table-column label="Ticket Price">
        <template slot-scope="scope">
          <el-tag size="medium" effect="plain">{{ scope.row.price }} £</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="300" align="right">
        <template slot="header" slot-scope="scope">
          <el-form>
            <el-input v-model="name"  size="mini" placeholder="Please enter Movie Name to search" style="width:200px;float: left;margin-left: 18px" />
            <el-button type="primary" size="mini" @click="searchByName">Find</el-button>
          </el-form>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">update
          </el-button>

          <el-popconfirm
            confirm-button-text='Confirm'
            cancel-button-text='Cancel'
            icon="el-icon-info"
            icon-color="red"
            @confirm="handleDelete(scope.$index, scope.row)"
            title=" Sure you want to delete this movie slot? "
          >
            <el-button
              style="margin-left: 8px"
              size="mini"
              icon="el-icon-delete"
              type="danger"
              slot="reference">delete
            </el-button>
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
  </div>
</template>

<script>
  import {FindAllArrangement, FindArrangementById, DeleteArrangement, UpdateArrangement, UpdateArrangementByPrice} from "@/api/film";
  import {GetPrices} from "@/api/order"
  import config from "@/config";


  export default {
    name: "Arrange",
    data() {
      return {
        rules: {
          seatNumber: [
            { required: true, message: 'Please specify the number of seats!', trigger: 'blur' }
          ],
          date: [
            { required: true, message: 'The screening date cannot be empty!', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: 'The screening start time cannot be empty!', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: 'The screening end time cannot be empty!', trigger: 'blur' }
          ],
          price: [
            { required: true, message: 'Movie ticket price cannot be empty!', trigger: 'blur' }
          ],
        },
        dialog: false,
        search: '',
        List: [],
        loading: false,
        arrangement: {
          name: '',
          fid: '',
          seatNumber: 40,
          price: 30.50,
          date: '',
          startTime: '',
          endTime: '',
          createName: '',
          type: '2D',
        },
        total: 0,
        params: {
          page: 1,
          limit: 10,
        },
        name: '',
      }
    },

    filters:{
      ellipsis(value){
        if (!value) return '';
        if (value.length > 8) {
          return value.slice(0,8) + '...'
        }
        return value
      }
    },

    mounted() {
      this.listArrangementByPage();
    },

    methods: {

      load () {
        this.loading = true;
        FindAllArrangement().then(res => {
          setTimeout(() => {
            this.loading = false;
            this.List = res.data
          }, 100)
        })
      },

      searchByName() {
        let params = {
          page: this.params.page,
          limit: this.params.limit,
          name: this.name
        };
        this.$axios({
          method: 'get',
          url: config.API_URL + "/arrangement/like",
          params: params,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            const data = res.data.data
            
            this.List = data.docs;
            this.total = data.total;
          })
          .catch((error) => {
            let errMsg = error.response.data.msg;
            this.$message.error(errMsg)
          })
      },

      handleEdit (index, row) {
        this.dialog = true;
        FindArrangementById(row.id).then(res => {
          this.arrangement = res.data.arrangement;
        })
      },

      submitEditArrange () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            UpdateArrangement(this.arrangement).then(res => {
              if (res.success) {
                this.dialog = false;
                this.$message({
                  message: 'Scheduled movie Modified successfully!',
                  type: 'success'
                });
              }
              this.listArrangementByPage();
            })
          } else {
            this.$message.error('Please complete the information on the form!');
            return false;
          }
        });
      },

      handleDelete (index, row) {
        DeleteArrangement(row.id).then(res => {
          if (res.success) {
            this.List.splice(index, 1)
            this.$message({
              message: 'Scheduling Information Deleted successfully!',
              type: 'success'
            });
          }
        })
      },

      isShowTooltip (obj, row) {
        if (row.name.length > 8) {
          row.showTooltip = true
        } else {
          row.showTooltip = false
        }
      },

      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.params.limit = val;
        this.listArrangementByPage();
      },

      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.params.page = val;
        this.listArrangementByPage();
      },

      listArrangementByPage:function(){
        this.$axios({
          method: 'get',
          url: config.API_URL + "/arrangement/page?page=" + this.params.page + "&limit=" + this.params.limit + "&name=" + this.name,
          headers: {
            "Authorization": localStorage.getItem("token")
          },
        })
          .then((res) => {
            const data = res.data.data

            this.List = data.docs;
            this.total = data.total;
          });
      },

    }

  }
</script>

<style scoped>
  .main {
    height: 500px;

  }
</style>
