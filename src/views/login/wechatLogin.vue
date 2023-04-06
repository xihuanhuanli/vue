<template>
    <div class="wxLogin">
      <span class="title">微信扫一扫登录</span>
      <img src="../../icons/img/test.png">
      <p>
        请先使用微信扫描二维码关注公众号
      </p>
      <img id="id" src="../../icons/img/2.png" height="200" width="200" style="visibility:hidden" >
      <el-button  @click="myclose()">点击打开登录二维码</el-button>
    </div>
  </template>
  
  <script>
   import request from "../../utils/re";
  export default {
    name: 'wxLogin',
    components: { },
    data () {
      return {
        i:0
      }
    },
    mounted () {
    },
    methods: {
      myclose(){
        this.i=0
        var imgId = document.getElementById("id"); 
        imgId.style.visibility ="visible";
        this.wechatLogin()
      },
      myref(){
        var imgId = document.getElementById("id"); 
        imgId.style.visibility ="hidden";
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
  </style>