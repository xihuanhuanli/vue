import request from '@/utils/request'


export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  const data = { 'token': token }
  return request({
    url: 'user/getUserInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
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
