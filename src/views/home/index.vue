<template>
  <div class="container">
    <van-tabs swipeable v-model="activeIndex">
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!--  这里坐了一个滚动条目的是为了后面的 阅读记忆 留下伏笔 -->
        <!-- 阅读记忆 看文章看到一半滑到中部  跳转到了别的页面 当你回来时 文章还在你看的位置  -->
        <article-list></article-list>
      </van-tab>
      <span class="bar_btn">
        <van-icon name="wap-nav"></van-icon>
      </span>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/articlelist'
import { getMyChannels } from '@/api/channel'
export default {
  name: 'home',
  components: {
    ArticleList
  },
  data () {
    return {
      activeIndex: 1, // 默认启动第0个标签
      channels: [] // 声明接受频道的数据
    }
  },
  created () {
    this.getMyChannels() // 获取频道
  },
  methods: {
    async getMyChannels () {
      let { channels } = await getMyChannels()
      this.channels = channels // 将频道赋值给声明的变量
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
