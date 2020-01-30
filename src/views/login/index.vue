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
        <van-button type="info" size="small" round block>登录</van-button>
      </div>
    </van-cell-group>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      logForm: {
        mobile: '139111111111',
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
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box{
padding: 20px;
}
</style>
