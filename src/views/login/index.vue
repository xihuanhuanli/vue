<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;height:50px;margin-bottom:30px;background-color: #4AB7BD;border-color: #4AB7BD;font-size: 18px;margin-top: 20px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <div style="position:relative;float: left ">
        <div style="float: left;margin-left: 150px;cursor: pointer;" @click=" wechatLogin()">
          <svg-icon icon-class="weixin" class="svg-icon-social" />
        </div>
        <div style="float: left;margin-left: 30px">
          <svg-icon icon-class="weibo" class="svg-icon-social" />
        </div>
        <div style="float: left;margin-left: 30px">
          <svg-icon icon-class="google" class="svg-icon-social" />
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The username can not be less than 5 digits'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The password can not be less than 5 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    wechatLogin(){
      this.$router.push({ path: '/wechatLogin'})
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const _this = this
          const captchaId = '198045393'
          // eslint-disable-next-line
          var captcha = new TencentCaptcha(captchaId, function (res) {
            if (res.ret === 0) {
              // 成功
              _this.loading = true
              _this.$store.dispatch('user/login', _this.loginForm)
                .then(() => {
                  _this.$router.push({ path: _this.redirect || '/', query: _this.otherQuery })
                  _this.loading = false
                })
                .catch(() => {
                  _this.loading = false
                })
            }
          })
          captcha.langFun()
          // 滑块显示
          captcha.show()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #4ab7bd;
$light_gray: #4ab7bd;
$cursor: #4ab7bd;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      font-size: 18px;
      font-weight: bolder;
      background: transparent;
      border: 50px;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid $cursor;
    background: rgba(0, 0, 1, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-top: 30px;
  }

  .el-form-item__error {
    font-size: 12px;
  }

  .svg-icon-social {
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #4AB7BD;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: no-repeat url(../background/login-page-background.jpg);
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    height: 450px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 100px 50% auto;
    overflow: hidden;
    box-shadow: 0 0 25px #cac6c6;
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #4AB7BD;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
      display: flex;
      justify-content: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
