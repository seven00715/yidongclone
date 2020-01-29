<template>
  <div class="container">
    <p></p>
    <van-skeleton title avatar :row="3" />
    <p ></p>
    <van-skeleton title avatar :row="3" />
    <p></p>
    <van-skeleton title avatar :row="3" />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
p {
  height: 30px;
}
</style>
