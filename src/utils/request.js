import axios from 'axios'
import JSONBig from 'json-bigint'

import store from '@/store'
import router from '@/router'
// axios.default 是对原来的axios进行封装
// axios.create 是创建一个新的axios实例 和原来的axios 没有关系
const instance = axios.create({
  // 设置一个请求地址常量
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // 处理大数字
  //  `transformResponse`允许在更改响应数据之前
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // data 就是后端响应的字符串 默认的转化是 JSON.parse (处理大数字是有问题的,需要用 JSONBig 替换)
    // 写法一
    // return data ? JSONBig.parse(data) : {}
    // 写法二
    try {
      JSONBig.parse(data)
    } catch (error) {
      return data
    }

    return data
  }]

})
// 请求拦截器

instance.interceptors.request.use(
  function (config) {
    if (store.state.user.token) { config.headers['Authorization'] = `Bearer ${store.state.user.token}` }
    return config
  },
  function (error) {
    // 返回失败
    return Promise.reject(error)
  })

// 响应拦截器

instance.instance.response.use(
  function (response) {
    // 得到 response 实际上被axios 包了一层数据
    try {
      // 直接返回 response.data.data
      return response.data.data
    } catch (error) {
      // 特殊情况
      return response.data
    }
  },
  async function (error) {
    // -------------处理 token失效(2个小时有效期)---------------------

    // 1.当错误为401时 ,表明token失效了
    // error config(请求配置) response(响应)
    if (error.response.state === 401) {
      //跳转到登录前 记录我们要访问的地址 
      let toPath = {
        path: '/login',
        query: {
          redirectUrl: router.currentRouter.path // 当前页面的地址
        }
      }
      // 判断 本地有没有refresh_token 续命的令牌
      if (store.state.user.refresh_token) {
        try {
      // 可以 续命 重新获取token
        // 为什么不能用instance 因为这个需要请求头里携带的是refresh_token  用原有的 axios
        let result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          },
          method:'put'
        })
        store.commit("updateUser",{
          user:{
            token: result.data.data.token,  // 更新到本地
            refresh_token: store.state.user.refresh_token
          }
        })
       return instance(error.config)
        } catch (error) {
          // 续命失败 上面任何一个步骤出错 跳转回登录
          // refresh_token 无法续命 ,删掉用户信息
          store.commit('clearUser') //情空信息
          router.push(toPath)
        }
      } else {
        // 否则 应该跳转到登录页 --->注意 当你正在一个页面 让你去登录 希望登录之后回到这个页面
        router.push(toPath)
      }
    }
    return Promise.reject(error)
  })
export default instance
