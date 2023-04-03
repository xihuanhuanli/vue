<template>
    <div class="wxLogin">
      <span class="title">微信扫一扫登录</span>
      <div class="main_wx">
        <wxlogin
          v-if="appid && redirect_uri"
          :appid="appid"
          scope="snsapi_login"
          :redirect_uri="redirect_uri"
          :href="href"
          :state="state"
        ></wxlogin>
      </div>
      <p>
        请使用微信扫描二维码登录
      </p>
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
        href: '' // 自定义样式链接
      }
    },
    mounted () {
      this.getWeChatUrl()
      console.log(this.appid)
      console.log(this.redirect_uri)
    },
    methods: {
      // 获取微信appid和回调地址redirect_uri，指定内嵌的路由地址weChatLogin
      getWeChatUrl () {
        wachatQrUrl().then(res => {
          if (res && res.code === 200) {
            const data = res.data
            console.log(data)
            this.appid = data.appid
            this.redirect_uri = data.redirect_uri + 'weChatLogin'
            console.log(this.appid)
            console.log(this.redirect_uri)
          }
        })
      }
    }
  }
  </script>