<template>
  <div style="background-color: rgb(240, 240, 240)">
    <el-drawer  style="width: 100%"  :title="titleA" :visible.sync="visible" :direction="direction" :before-close="cancelForm" size="50%">
      <div class="demo-drawer__content">
        <el-form :model="form" ref="form">

          <el-form-item
            label="影片名"
            :label-width="formLabelWidth"
            prop="filmName"
            :rules="[
              { required: true, message: '影片名不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.filmName"
              autocomplete="off"
              placeholder="请输入影片名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="影片原名"
            :label-width="formLabelWidth"
            prop="initialName"
            :rules="[
              { required: true, message: '影片原名不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.initialName"
              autocomplete="off"
              placeholder="请输入影片原名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="影片别名"
            :label-width="formLabelWidth"
            prop="alias"
            :rules="[
              { required: true, message: '影片别名不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.alias"
              autocomplete="off"
              placeholder="请输入影片别名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="评分"
            :label-width="formLabelWidth"
            prop="score"
            :rules="[
              { required: true, message: '评分不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.score"
              autocomplete="off"
              placeholder="请输入评分"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="评论人数"
            :label-width="formLabelWidth"
            prop="evaluateNumber"
            :rules="[
              { required: true, message: '评论人数不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.evaluateNumber"
              autocomplete="off"
              placeholder="请输入评论人数"
            ></el-input>
          </el-form-item>
          <el-form-item label="简评" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="form.introduction"
              autocomplete="off"
              placeholder="请输入简评"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="类型"
            :label-width="formLabelWidth"
            prop="type"
            :rules="[
              { required: true, message: '类型不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.type"
              autocomplete="off"
              placeholder="请输入类型"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="国家"
            :label-width="formLabelWidth"
            prop="country"
            :rules="[
              { required: true, message: '国家不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.country"
              autocomplete="off"
              placeholder="请输入国家"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="语言"
            :label-width="formLabelWidth"
            prop="language"
            :rules="[
              { required: true, message: '语言不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.language"
              autocomplete="off"
              placeholder="请输入语言"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="发布年份"
            :label-width="formLabelWidth"
            prop="releaseYear"
            :rules="[
              { required: true, message: '发布年份不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.releaseYear"
              autocomplete="off"
              placeholder="请输入发布年份"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="时长"
            :label-width="formLabelWidth"
            prop="time"
            :rules="[
              { required: true, message: '时长不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.time"
              autocomplete="off"
              placeholder="请输入时长"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="票价"
            :label-width="formLabelWidth"
            prop="price"
            :rules="[
              { required: true, message: '票价不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.price"
              autocomplete="off"
              placeholder="请输入票价"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="导演主演"
            :label-width="formLabelWidth"
            prop="role"
            :rules="[
              { required: true, message: '导演主演不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.role"
              autocomplete="off"
              placeholder="请输入导演主演"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item
            label="详情链接"
            :label-width="formLabelWidth"
            prop="detailsSrc"
            :rules="[
              { required: true, message: '详情链接不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.detailsSrc"
              autocomplete="off"
              placeholder="请输入详情链接"
            ></el-input>
          </el-form-item> -->
          

          <el-form-item
            label="图片链接"
            :label-width="formLabelWidth"
            prop="imageSrc"
            :rules="[
              { required: true, message: '图片链接不能为空', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.imageSrc"
              autocomplete="off"
              placeholder="请输入图片链接"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="margin-left: 80px">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          <el-popconfirm
              title="确定重置吗？"
              @onConfirm="resetForm"
            >
              <template #reference>
                <el-button type="primary" style="margin-left: 10px">重置 </el-button>
              </template>
            </el-popconfirm>
        </div>
      </div>

    </el-drawer>
    
    <div style="padding-top:15px;">
        <el-button
          type="primary"
          style="margin-left:20px"
          @click="showTable"
          >新增</el-button
        >
        <!-- <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button> -->
        <el-button type="primary" @click="load">查询</el-button>
      </div>
    
    <div style="padding: 15px">
      <el-table
        :data="
          tableData
        "
        style="width: 100%"
        stripe
      >
      <el-table-column label="电影ID" prop="id"></el-table-column>
        <el-table-column label="影片名" prop="filmName"></el-table-column>
        <el-table-column label="原名" prop="initialName" v-if="false"></el-table-column>
        <el-table-column label="别名" prop="alias" v-if="false"></el-table-column>
        <el-table-column label="评分" prop="score" sortable></el-table-column>
        <el-table-column label="评价人数" prop="evaluateNumber" v-if="false"></el-table-column>
        <el-table-column label="简评" prop="introduction"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="国家" prop="country"></el-table-column>
        <el-table-column label="语言" prop="language"></el-table-column>
        <el-table-column label="发布年份" prop="releaseYear"></el-table-column>
        <el-table-column label="时长" prop="time"></el-table-column>
        <el-table-column label="票价" prop="price"></el-table-column>
        <el-table-column label="导演主演" prop="role" v-if="false"></el-table-column>        
        <el-table-column label="详情链接" prop="detailsSrc" v-if="false"></el-table-column>
        <el-table-column label="图片链接" prop="imageSrc" v-if="false"></el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入影片名搜索"
              @keyup.enter.native="load"
              clearable
            />
          </template>
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button size="mini" type="danger">删除 </el-button>
              </template>
            </el-popconfirm>
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

export default {
  data() {
    return {
      titleA:"请输入新增信息",
      titleADD:"请输入新增信息",
      titleEdit:"请修改信息",
      style1:'width:40%;',
      direction: 'rtl',
      currentPage: 1,
      total: 0,
      tableData: [],
      search: "",
      pageSize: 10,
      form: {
        title: "",
        link: "",
        rating: "",
        inq: "",
      },
      flag: false,
      visible: false,
      formLabelWidth: "80px",
    };
  },
  created() {
    this.load();
  },
  methods: {
    showTable() {
              this.visible = true;
          },
    load() {
      request
        .post("film/selectALLPageFilm", {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
        })
        .then((res) => {
          this.tableData = res.data.content;
          // this.tableData.forEach((td)=>{
          //   var s=td.imageSrc
          //   td.imageSrc=s.substring(30)
          // })
          this.total = res.data.totalSize;
        });
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.flag=true;
      this.titleA=this.titleEdit;
      this.visible = true;
    },
    handleDelete(id) {
      console.log(1)
      request.post("film/deleteFilm",{"id":id}).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
        this.load();
      });
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
      this.titleA=this.titleADD
    },
    cancelForm() {
      this.clean()
      this.flag=false;
      this.visible = false;
    },
    resetForm() {
      this.form={}
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.flag) {
            request.post("film/updateFilm", this.form).then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "编辑成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.msg,
                });
              }
              this.load(); //刷新表格数据
              this.cancelForm(); //关闭弹窗
            });
          } else {
            request
              .post("film/addFilm", this.form)
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: "success",
                    message: "新增成功",
                  });
                } else if(res.code === 1){
                  this.$message({
                    type: "error",
                    message: "电影已存在",
                  });
                } else if(res.code === 2){
                  this.$message({
                    type: "error",
                    message: "电影价格溢出",
                  });  
                }else {
                  this.$message({
                    type: "error",
                    message: res.msg,
                  });
                }
                this.load(); //刷新表格数据
                this.cancelForm(); //关闭弹窗
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.el-drawer.rtl {
        overflow: scroll
    }
</style>