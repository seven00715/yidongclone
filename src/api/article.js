// 封装有关文章的数据接口

import request from '@/utils/request'
/**
 * 获取推荐文章的数据
 */

export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { ...params, with_top: 1 }
  })
}
