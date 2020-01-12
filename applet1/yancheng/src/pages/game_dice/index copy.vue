<template>
  <div class="game">
    <div class="top">
      <i class="iconfont icon-touzi"></i>
      <p class="name">掷骰子</p>
      <p class="handle">
        请选择
        <span @click="selectNum">{{num}}</span>个骰子
      </p>
    </div>
    <div class="gameCont">
      <img src="../../../static/images/game.png" mode="aspectFill" />
    </div>
    <div class="btn">摇起来</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1
    };
  },
  methods: {
    selectNum() {
      var self = this;
      wx.showActionSheet({
        itemList: ["1", "2", "3", "4", "5", "6"],
        success(res) {
          console.log(res.tapIndex);
          self.num = res.tapIndex + 1
        },
        fail(res) {
          console.log(res.errMsg);
        }
      });
    }
  },
  moubted() {}
};
</script>

<style lang="less" scoped>
.game {
  .top {
    height: 84px;
    background-color: #000;
    position: relative;
    .icon-touzi {
      position: absolute;
      color: #fff;
      left: 20%;
      font-size: 45px;
    }
    .name {
      color: #fff;
      font-size: 20px;
      position: absolute;
      left: 40%;
      top: 15%;
    }
    .handle {
      position: absolute;
      color: #fff;
      left: 20%;
      bottom: 10px;
      font-size: 14px;
      span {
        display: inline-block;
        margin: 0 10px;
        width: 40px;
        height: 20px;
        border: 1px solid #fff;
        text-align: center;
      }
    }
  }
  .gameCont {
    width: 285px;
    height: 285px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btn {
    position: fixed;
    left: 50%;
    margin-left: -55px;
    bottom: 6%;
    width: 110px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #b1a1a3;
    color: #fff;
    font-size: 14px;
    border-radius: 30px;
  }
}
</style>
