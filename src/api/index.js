import request from '@/utils/request'

  export function login(data) {
    return request({
      url: 'user/login',
      method: 'post',
      data
    })
  }
/**
 * 获取微信登录信息
 */
export function wachatQrUrl() {
    return request({
      url: '/user/getUrl',
      method: 'get',
    })
  }
/**
 * 获取动态路由
 */
export function login2(data) {
    return request({
      url: '/vue-admin-template/user/login',
      method: 'post',
      data
    })
  }