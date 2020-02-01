// 专门处理频道的请求

import request from '../utils/request'

// 获取用户频道列表
export function getMyChannels () {
  // 返回一个Promise对象
  // axios 默认是get类型 ,所有get类型可以不写
  return request({
    url: '/user/channels'
  })
}
