<template>
  <div class="container">

    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
     <!--  手机号 验证码 登录按钮 -->
    <van-cell-group>
      <van-field
      required
      label="手机号"
      placeholder="请输入手机号"

      ></van-field>
      <van-field
      required
      label="验证码"
      placeholder="请输入验证码"
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
  name: 'login'
}
</script>

<style lang="less" scoped>
.btn-box{
padding: 20px;
}
</style>
