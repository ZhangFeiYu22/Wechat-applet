<template>
  <div class="discover">
    <p class="info">这里有发现哦</p>
    <div class="gameList yellow">
      <i class="iconfont icon-liwu leftI"></i>
      <p>发现更多活动</p>
      <i class="iconfont icon-right rightI"></i>
    </div>
    <div class="gameList blue">
      <i class="iconfont icon-navicon-tp leftI"></i>
      <p>发现投票专区</p>
      <i class="iconfont icon-right rightI"></i>
    </div>
    <div class="gameList red">
      <i class="iconfont icon-touzi  leftI"></i>
      <p>发现骰子出没</p>
      <i class="iconfont icon-right rightI"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  moubted() {}
};
</script>

<style lang="less" scoped>
.discover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  .info {
    color: #fff;
    font-size: 20px;
    margin-top: 15%;
    margin-bottom: 10px;
  }
  .gameList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 90%;
    margin: 0 auto;
    color: #fff;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px 10px 10px 20px;
    &.yellow {
      background-color: #ffd257;
    }
    &.blue {
      background-color: #57d1ff;
    }
    &.red {
      background-color: #fe8d8d;
    }
    .leftI{
      font-size: 40px;
    }
    .rightI{
      font-size: 20px;
    }
  }
}
</style>
