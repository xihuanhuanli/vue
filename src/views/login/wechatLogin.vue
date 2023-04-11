<template>
    <div class="wxLogin">
      <div style="margin-left:600px;margin-bottom: 25px;margin-top:30px;">
        <span class="title" style="border:1px solid #000;font-family: Arial;
    font-size: 18px;
    line-height: 10px;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 0 10px white;">微信扫一扫登录</span>
      </div>
      <div style="margin-left:572px;margin-top: 20px;margin-bottom: 25px;">
        <img style="border:1px solid #000" src="../../icons/img/test.png">
      </div>
      <div style="margin-left:520px;margin-top: 20px;margin-bottom: 25px;">
        <span class="title" style="border:1px solid #000;font-family: Arial;
    font-size: 18px;
    line-height: 10px;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 0 10px white;"> 请先使用微信扫描二维码关注公众号</span>
      </div>
      <div style="margin-left:597px;margin-top: 20px;margin-bottom: 20px;">
        <img  id="id" src="../../icons/img/login.png" height="150" width="150" style="border:1px solid #000;visibility:hidden" >
      </div>
      <div style="margin-left:590px;margin-top: 10px;margin-bottom: 10px;">
        <el-button  id="btn" @click="myclose()" v-if="flag">点击打开登录二维码</el-button>
      </div>
      
    </div>
  </template>
  
  <script>
   import request from "../../utils/re";
  export default {
    name: 'wxLogin',
    components: { },
    data () {
      return {
        i:0,
        flag:true,
      }
    },
    mounted () {
    },
    methods: {
      myclose(){
        this.flag=false
        this.i=0
        var imgId = document.getElementById("id"); 
        imgId.style.visibility ="visible";
        this.wechatLogin()
      },
      myref(){
        var imgId = document.getElementById("id"); 
        imgId.style.visibility ="hidden";
        this.flag=true;
        this.$message({
              type: "error",
              message:"二维码过期",
            });
      },
      checkLogin(){
        var i=1
      console.log(this.i)
    	request.post("/wechat/polling?sessionId=123")
      .then((res) => {//最多轮询20次，间隔3秒一次，总时长1分钟
        if(this.i<19){
        this.i=this.i+i
        const {code, data } = res
        if(code=="200"){
          clearInterval(timer)
          this.$store.dispatch('user/wechatlogin',data)
          this.$router.push({ path:'/'})
        }
      }else{
        clearInterval(timer)
        this.myref()
      }
          })
      .catch(error => {
        reject(error)
      })
    	},
      wechatLogin(){
        window.timer = setInterval(() => {
          setTimeout(this.checkLogin(), 0)
        }, 3000)//轮询查询 
     }
    }
  }
  </script>
  <style>
  .wxLogin{
    height: 100%;
    padding-top: 10px;
    background: no-repeat url(../background/login-page-background.jpg);
    background-size: cover;
    overflow: hidden;
  }
  </style>