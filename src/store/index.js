import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth' // ^表示全部导入 使用时候直接用别名 auth.方法名即可
Vue.use(Vuex)

// vuex 解决数据共享问题
// 一初始化就要读取token
// vuex 和缓存数据的 同步
export default new Vuex.Store({
// 遮罩数据的地方 初始化的时候直接将用户信息给我们 的公共状态
  state: {
    user: auth.getToken
  },
  // state  数据的更改必须通过mutations
  mutations: {
    // 设置更新token
    // payload 中 携带user
    updatedUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setToken(payload.user) // 将数据同步设置在本地储存中
    },
    clearUser (state) {
      state.user = {}
      auth.removeToken()
    }

  },
  actions: {
  },
  modules: {
  }
})
