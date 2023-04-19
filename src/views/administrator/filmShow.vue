<template>
    <div style="background-color: rgb(240, 240, 240)">
      <el-drawer  style="width: 100%"  :title="titleA" :visible.sync="visible" :direction="direction" :before-close="cancelForm" size="50%">
        <div class="demo-drawer__content">
          <el-form :model="form" ref="form">
            <el-form-item
              label="电影id"
              :label-width="formLabelWidth"
              prop="show_film_id"
              :rules="[
                { required: true, message: '电影id不能为空', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="form.show_film_id"
                autocomplete="off"
                placeholder="请输入电影id"
                oninput="value=value.replace(/^\+|[^\d]/g,'')"
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
        <el-table-column label="ID" prop="id" v-if="false"></el-table-column>
          <el-table-column label="FilmID" prop="show_film_id"></el-table-column>
          <el-table-column label="电影名称" prop="film_name" ></el-table-column>
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入电影id搜索"
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
        titleA:"请输入新增电影id",
        titleADD:"请输入新增电影id",
        titleEdit:"请修改电影id",
        style1:'width:40%;',
        direction: 'rtl',
        currentPage: 1,
        total: 0,
        tableData: [],
        search: "",
        pageSize: 10,
        form: {
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
          .post("film/selectShowFilmList", {
              pageNum: this.currentPage,
              pageSize: this.pageSize,
              search: this.search,
          })
          .then((res) => {
            this.tableData = res.data.content;
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
        request.post("film/deleteShowFilm",{"id":id}).then((res) => {
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
              request.post("film/updateShowFilm", this.form).then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: "success",
                    message: "编辑成功",
                  });
                } else if(res.code === 2){
                  this.$message({
                    type: "error",
                    message: "该电影id不存在",
                  });
                }
                else {
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
                .post("film/addShowFilm", this.form)
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
                }else if(res.code === 2){
                  this.$message({
                    type: "error",
                    message: "该电影id不存在",
                  });
                }
                else {
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