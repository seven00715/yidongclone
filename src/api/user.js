// 用户相关的请求模块
import request from '@/utils/request' // 引入封装的模块
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  })
}
