<template>
    <div class="wxLogin">
      <span class="title">微信扫一扫登录</span>
      <img src="../../icons/img/test.png">
      <p>
        请先使用微信扫描二维码关注公众号
      </p>
      <input v-model="code">
      <el-button  @click="myclose()">Back to home</el-button>
    </div>
  </template>
  
  <script>
  import wxlogin from 'vue-wxlogin'
  import {wachatQrUrl} from '@/api/index'
  export default {
    name: 'wxLogin',
    components: { wxlogin },
    data () {
      return {
        appid: '',
        redirect_uri: '',
        state: '1',
        href: '', // 自定义样式链接
        code:'xiexie'
      }
    },
    mounted () {
      this.getWeChatUrl()
      this.parm()
    },
    methods: {
      // 获取微信appid和回调地址redirect_uri，指定内嵌的路由地址weChatLogin
      getWeChatUrl () {
        wachatQrUrl().then(res => {
          if (res && res.code === 200) {
            const data = res.data
            this.appid = data.appid
            this.redirect_uri = data.redirect_uri + 'weChatLogin'
          }
        })
      },
      parm(){
        var tem=this.$route.query.code;
        if(tem.length>0){
            this.code=tem
        }
      },
      myclose(){
        this.code="nihao"
      }
    }
  }
  </script>