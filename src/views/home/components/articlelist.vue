<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" :finished="finished" finished-text="没有啦" @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title='article' ></van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      articles: [], // 定义一个数组来接收上拉加载的数据
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否数据已经全部加载完毕
      downLoading: false, // 是否开启下拉加载
      refreshSuccessText: '' // 下拉成功显示的文本
    }
  },
  methods: {
    // 上拉加载数据时间
    onLoad () {
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.list = []
      //     this.refreshing = false
      //   }

      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   this.loading = false

      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
      setTimeout(() => {
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => index + 1 + this.articles.length) // 生成一个长度为10的数组
          this.articles.push(...arr)
          this.upLoading = false
        } else {
          this.finished = true // 告诉list组件 我已经加载完了,不要再触发onload事件了
        }
      }, 1000)
    },
    // 下拉刷新是状态
    onRefresh () {
      // // 清空列表数据
      // this.finished = false

      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      // this.upLoading = true
      // this.onLoad()

      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr)
        this.downLoading = false // 关闭下拉状态
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
