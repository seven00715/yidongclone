import Vue from 'vue'
import App from './App.vue'
import router from '@/permission'// 经过权限处理的router
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
// 覆盖vant样式
import './style/index.css'
import 'amfe-flexible'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
