export default {
  // Vue.use(obj) => 会使用 obj中的 install方法
  install (Vue) {
    // 封装别人的方法
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
  }

}
