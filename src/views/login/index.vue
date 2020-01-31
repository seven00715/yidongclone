<template>
  <div class="container">

    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
     <!--  手机号 验证码 登录按钮 -->
    <van-cell-group>
      <van-field
      v-model='logForm.mobile'
      required
      label="手机号"
      placeholder="请输入手机号"
      :error-message="errorMsg.mobile"
      @blur="checkMobile"
      ></van-field>
      <van-field
      v-model="logForm.code"
      required
      label="验证码"
      placeholder="请输入验证码"
      :error-message="errorMsg.code"
      @blur="checkCode"
      >
        <van-button type="primary" slot="button" size='small'>请输入验证码</van-button>
      </van-field>
      <div class="btn-box">
        <!-- 按钮在默认情况下为行内块级元素，通过block属性可以将按钮的元素类型设置为块级元素 -->
        <van-button type="info" size="small" round block @click="login">登录</van-button>
      </div>
    </van-cell-group>

  </div>
</template>

<script>
import { login } from '@/api/user'
// import store from '@/store'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      logForm: {
        mobile: '13911111111',
        code: '246810'

      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断 为空 判断格式
      if (!this.logForm.mobile) {
        this.errorMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^1[3-9]\d{9}$/.test(this.logForm.mobile)) {
        this.errorMsg.mobile = ' 手机号格式错误'
        return false
      }
      this.errorMsg.mobile = '' // 情空信息
      return true
    },
    checkCode () {
      if (!this.logForm.code) {
        this.errorMsg.code = '验证码不能为空'
        return false
      }
      // 判断格式
      if (!/^\d{6}$/.test(this.logForm.code)) {
        this.errorMsg.code = '请输入6位数字验证码'
        return false
      }
      this.errorMsg.code = ''// 清空验证码错误信息
      return true
    },
    ...mapMutations(['updatedUser']),
    async login () {
      try {
        if (this.checkMobile() && this.checkCode()) {
          const data = await login(this.logForm)
          // 刷新数据
          // 第一种
          // this.$store.commit('updateUser',{user:data})
          // 第二种
          this.updatedUser({ user: data })
          // 之所以能通过 this.notify 调用到方法 =》 是因为Vue.proptotpe.notify 挂载了一个提示方法
          // 封装别人的方法
          this.$gnotify({ type: 'success', message: '登录成功' })
          // 登录成功 ,两种情况 1. redirectUrl (跳回之前要访问的页面) 2.没有redirectUrl 跳转回首页
          let { redirectUrl } = this.$route.query
          this.$router.push(redirectUrl || '/') // 短路表达式(如果前面是true,后面不执行,前面是false后面执行)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box{
padding: 20px;
}
</style>
