import request from '@/utils/request'

  export function login(data) {
    return request({
      url: 'user/login',
      method: 'post',
      data
    })
  }
/**
 * 获取用户历史订单信息
 */
export function login1(data) {
    return request({
      url: '/vue-admin-template/user/login',
      method: 'post',
      data
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