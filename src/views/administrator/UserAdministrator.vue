<template>
    <div id="app">
    <el-radio-group v-model="direction">
        <el-radio label='ltr'>左边</el-radio>
        <el-radio label='rtl'>右边</el-radio>
        <el-radio label='ttb'>上边</el-radio>
        <el-radio label="btt">下边</el-radio>
    </el-radio-group>
    <el-button @click='showTable'>显示抽屉表格</el-button>
    
    <el-drawer title="抽屉表格" :visible.sync="visible" :direction="direction" :before-close="handleClose" size="50%">
        <el-table :data="tableData">
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer title="抽屉表单" :visible.sync="innervisible" :direction="direction" :append-to-body="true">
            <el-form :model="formData" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="formData.userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" disabled></el-input>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-drawer>
</div>
  </template>
  <<script>
  export default {
    data() {
          return {
              direction: 'rtl',
              visible: false,
              innervisible: false,
              tableData: [
                  { userName: '张三', password: 'zhangsan' },
                  { userName: '李四', password: 'lisi' },
              ],
              formData: {}
          }
      },
      methods: {
          handleClose(done) {
              this.$confirm("确定退出吗？").then(_ => { this.visible = false; done() }).catch(_ => { });
          },
          showDetail(row) {
              this.innervisible = true;
              this.formData = row;
          },
          showTable() {
              this.visible = true;
          }
      }
  }
  </script>
<style>

</style>