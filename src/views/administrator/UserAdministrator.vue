<template>
    <div style="background-color: rgb(240, 240, 240)">
      <el-drawer  style="width: 100%"  :title="titleA" :visible.sync="visible" :direction="direction" :before-close="cancelForm" size="50%">
        <div class="demo-drawer__content">
          <el-form :model="form" ref="form">
  
            
  
            <el-form-item
              label="用户名"
              :label-width="formLabelWidth"
              prop="username"
              :rules="[
                { required: true, message: '用户名不能为空', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              :label-width="formLabelWidth"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            
  
            <el-form-item
              label="头像链接"
              :label-width="formLabelWidth"
              prop="avatar"
              :rules="[
                { required: true, message: '头像链接不能为空', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="form.avatar"
                autocomplete="off"
                placeholder="请输入头像链接"
              ></el-input>
            </el-form-item>
            <el-form-item
            label="用户角色"
            :label-width="formLabelWidth"
            prop="role"
            :rules="[
              { required: true, message: '用户角色不能为空', trigger: 'change' },
            ]"
          >
            <el-select v-model="form.role" placeholder="请选择用户角色">
              <el-option label="超级管理员" value="admin"></el-option>
              <el-option label="普通用户" value="editor"></el-option>
            </el-select>
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
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="密码" prop="password" ></el-table-column>
          <el-table-column label="角色">
            <template slot-scope="scope">
                <span v-if="scope.row.role ==='admin'">超级管理员</span>  
                <span v-else>普通用户</span>
            </template>
          </el-table-column>
          <el-table-column label="头像图片链接" prop="avatar" ></el-table-column>
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入用户名搜索"
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
          .post("http://localhost:8081/user/selectALLPage", {
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
        request.post("http://localhost:8081/user/deleteUser",{"id":id}).then((res) => {
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
              request.post("http://localhost:8081/user/updateUser", this.form).then((res) => {
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
                .post("http://localhost:8081/user/addUser", this.form)
                .then((res) => {
                  if (res.code === 0) {
                    this.$message({
                      type: "success",
                      message: "新增成功",
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