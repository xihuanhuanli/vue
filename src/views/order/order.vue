<template>
  <div style="background-color: rgb(240, 240, 240)">
    <el-drawer  style="width: 100%"  title="订单详情" :visible.sync="visible" direction='rtl' :before-close="cancelForm" size="50%">
      <div class="demo-drawer__content">
        <el-form :model="form" ref="form">
          <el-form-item
            label="订单id"
            :label-width="formLabelWidth"
            prop="orderId"
          >
            <el-input
              v-model="form.orderId"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="购票张数"
            :label-width="formLabelWidth"
            prop="ordSeatNum"
          >
            <el-input
              v-model="form.ordSeatNum"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电影名"
            :label-width="formLabelWidth"
            prop="filmName"
          >
            <el-input
              v-model="form.filmName"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电影院"
            :label-width="formLabelWidth"
            prop="cinema"
          >
            <el-input
              v-model="form.cinema"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="影厅"
            :label-width="formLabelWidth"
            prop="cinemaType"
          >
            <el-input
              v-model="form.cinemaType"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="座位详情"
            :label-width="formLabelWidth"
            prop="seatInfo"
          >
            <el-input
              v-model="form.seatInfo"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="实付金额"
            :label-width="formLabelWidth"
            prop="amount"
          >
            <el-input
              v-model="form.amount"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="订单编号"
            :label-width="formLabelWidth"
            prop="orderNumber"
          >
            <el-input
              v-model="form.orderNumber"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="下单时间"
            :label-width="formLabelWidth"
            prop="orderDate"
          >
            <el-input
              v-model="form.orderDate"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="开场时间"
            :label-width="formLabelWidth"
            prop="beginTime"
          >
            <el-input
              v-model="form.beginTime"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="图片"
            :label-width="formLabelWidth"
            prop="imageSrc"
          >
            <el-input
              v-model="form.imageSrc"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>

        </el-form>
        <div class="demo-drawer__footer" style="margin-left: 80px">
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>

    </el-drawer>
  
    
    <div style="padding: 15px">
      <el-table
        :data="
          tableData
        "
        style="width: 100%"
        stripe
      >
      <el-table-column label="图片信息" >
        <template #default="scope">
          <div class="info_box_img">
              <img :src="scope.row.imageSrc" style="width: 160px;
  height: 220px;" />
            </div>
          </template>
      </el-table-column>
        <el-table-column label="电影名称" prop="filmName" style="width:40px;"></el-table-column>
        <el-table-column label="订单信息" >
          <template #default="scope">
          <div>
            <el-main>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">电影票数：{{scope.row.ordSeatNum}}张</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">电影院：{{scope.row.cinema}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">影厅类型：{{scope.row.cinemaType}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">电影场次：{{scope.row.beginTime}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark" >已购座位：{{scope.row.seatInfo}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">实付金额：{{scope.row.amount}}元</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">下单时间：{{scope.row.orderDate}}</div>
                </el-col>
              </el-row>
            </el-main>
          </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入电影名，按回车搜索"
              @keyup.enter.native="load"
              clearable
            />
          </template>
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 250]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      
    </div>
  </div>
</template>

<script>
import request from "../../utils/re";
import store from "@/store";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      search: "",
      id:"",
      pageSize: 10,
      form: {
      },
      visible: false,
      formLabelWidth: "80px",
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.id=store.getters.id
      console.log(this.id)
      request
        .post("filmscene/selectOrder", {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
            id:this.id
        })
        .then((res) => {
          this.tableData = res.data.content;
          this.tableData.forEach((td)=>{
             var s=td.beginTime
             var year=s.substring(0,4)
             var mon=s.substring(5,7)
             var day=s.substring(8,10)
             var time=s.substring(11,16)
             s=year+"年"+mon+"月"+day+"日"+time
             td.beginTime=s
             /////////
             s=td.orderDate
             year=s.substring(0,4)
             mon=s.substring(5,7)
             day=s.substring(8,10)
             time=s.substring(11,16)
             s=year+"年"+mon+"月"+day+"日"+time
             td.orderDate=s
             //////////
             s=td.seatInfo
             s=s.replaceAll(',', '座 ')
             s=s.replaceAll('/','排')
             s=s+"座"
             td.seatInfo=s
          })
          this.total = res.data.totalSize;
        });
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.visible = true;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.load();
    },
    clean(){
      this.form={}
    },
    cancelForm() {
      this.clean()
      this.visible = false;
    },
    
    
  },
};
</script>

<style>
.el-drawer.rtl {
        overflow: scroll
    }
.info_box_img {
      cursor: pointer;
      width: 50px;
      flex: 0 0 50px;
      margin-right: 6px;
      }

</style>