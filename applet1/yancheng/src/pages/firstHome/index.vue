<template>
  <div class="discover" :style="{paddingTop: topHeight + 'px'}">
    <div class="gameList" @click="goActivity">
      <img :src="bgUrl1" mode="aspectFill" />
    </div>
    <div class="gameList" @click="goVote">
      <img :src="bgUrl2" mode="aspectFill" />
    </div>
    <div class="gameList" @click="goGame1">
      <img :src="bgUrl3" mode="aspectFill" />
    </div>
    <div class="gameList" @click="goGame2">
      <img :src="bgUrl4" mode="aspectFill" />
    </div>
    <!-- <div class="navStyle">
      <div class="navBottom" @click="doAnimation" :class="aniStyle ? 'aniStyle3' : 'spanBack'">
        <span :class="aniStyle ? 'aniStyle1' : ''"></span>
        <span></span>
        <span :class="aniStyle ? 'aniStyle2' : ''"></span>
      </div>
      <div class="navList">
        <div class="create_ball" :animation="animation1" @click="navHome">
          <i class="iconfont icon-zu1"></i>
        </div>
        <div class="create_ball" :animation="animation2" @click="navCommunity">
          <i class="iconfont icon-zu3"></i>
        </div>
        <div class="create_ball" :animation="animation3" @click="navHome">
          <i class="iconfont icon-zu"></i>
        </div>
        <div class="create_ball" :animation="animation4" @click="navMy">
          <i class="iconfont icon-zu2"></i>
        </div>
      </div>
    </div> -->
    <div class="navStyle2">
      <div class="navList">
        <div class="create_ball" @click="navHome">
          <i class="iconfont icon-zu1"></i>
        </div>
        <div class="create_ball" @click="navCommunity">
          <i class="iconfont icon-zu3"></i>
        </div>
        <div class="create_ball" @click="navHome">
          <i class="iconfont icon-zu"></i>
        </div>
        <div class="create_ball" @click="navMy">
          <i class="iconfont icon-zu2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topHeight: '',
      bgUrl1: require("../../../static/images/home1.png"),
      bgUrl2: require("../../../static/images/home2.png"),
      bgUrl3: require("../../../static/images/home3.png"),
      bgUrl4: require("../../../static/images/home4.png"),
      animation1: {},
      animation2: {},
      animation3: {},
      animation4: {},
      aniStyle: false,
      stretch: false, //判断是否展开，默认不展开
      running: false //动画正在运行状态：控制动画运行完毕后才能再次运行
    };
  },
  mounted () {
    this.topHeight= this.$store.state.systemInfo.statusBarHeight + 40
  },
  methods: {
    goActivity() {
      wx.navigateTo({
        url: "/pages/activity/main"
      });
    },
    goVote() {
      wx.navigateTo({
        url: "/pages/vote/main"
      });
    },
    goGame1() {
      wx.navigateTo({
        url: "/pages/game_dice/main"
      });
    },
    goGame2() {
      wx.navigateTo({
        url: "/pages/game_truchOrDare/main"
      });
    },
    navHome() {
      wx.switchTab({
        url: "/pages/home/main"
      });
    },
    navCommunity() {
      wx.switchTab({
        url: "/pages/community/main"
      });
    },
    navMy() {
      wx.switchTab({
        url: "/pages/my/main"
      });
    },
    doAnimation() {
      //启动动画
      var that = this;
      if (that.running) {
        //如果动画正在运行，点击无效
        return;
      }
      that.running = true;
      setTimeout(() => {
        //默认400ms能点击一次
        var _that = this;
        _that.running = false;
      }, 400);
      if (!that.stretch) {
        //展开动作
        this.showAnimation();
      } else {
        //收起动作
        this.hiddenAnimation();
      }
      that.stretch = !that.stretch; //取反
    },
    showAnimation() {
      //展示动画
      var that = this;
      that.aniStyle = true;
      var animation1 = wx.createAnimation({
        duration: 300,
        delay: 0,
        timingFunction: "ease"
      });
      var animation2 = wx.createAnimation({
        duration: 300,
        delay: 50,
        timingFunction: "ease"
      });
      var animation3 = wx.createAnimation({
        duration: 300,
        delay: 100,
        timingFunction: "ease"
      });
      var animation4 = wx.createAnimation({
        duration: 300,
        delay: 100,
        timingFunction: "ease"
      });

      //表示一组动画完成
      animation1
        .translateX(-150)
        .translateY(0)
        .opacity(1)
        .step();
      //表示一组动画完成
      animation2
        .translateX(-75)
        .opacity(1)
        .step();
      //表示一组动画完成
      animation3
        .translateX(75)
        .opacity(1)
        .step();
      //表示一组动画完成
      animation4
        .translateX(150)
        .opacity(1)
        .step();
      //清掉之前的动画操作
      that.animation1 = animation1.export();
      that.animation2 = animation2.export();
      that.animation3 = animation3.export();
      that.animation4 = animation4.export();
    },
    hiddenAnimation() {
      //隐藏动画
      var that = this;
      that.aniStyle = false;
      var animation1 = wx.createAnimation({
        duration: 300,
        delay: 100,
        timingFunction: "ease"
      });
      var animation2 = wx.createAnimation({
        duration: 300,
        delay: 50,
        timingFunction: "ease"
      });
      var animation3 = wx.createAnimation({
        duration: 300,
        delay: 0,
        timingFunction: "ease"
      });
      var animation4 = wx.createAnimation({
        duration: 300,
        delay: 0,
        timingFunction: "ease"
      });
      animation1.opacity(0).step();
      animation2.opacity(0).step();
      animation3.opacity(0).step();
      animation4.opacity(0).step();
      that.animation1 = animation1.export();
      that.animation2 = animation2.export();
      that.animation3 = animation3.export();
      that.animation4 = animation4.export();
    }
  },
  onUnload(){ 
		this.hiddenAnimation();
	},
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
  .gameList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 132px;
    width: 90%;
    margin: 0 auto;
    color: #fff;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .navStyle {
    .navBottom {
      z-index: 999;
      position: fixed;
      left: 50%;
      margin-left: -30px;
      bottom: 10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid #fc3e9f;
      z-index: 40;
      box-shadow: 0 0 9px 2px #fc3e9f, 0 0 9px 2px #fc3e9f inset;
      transition: all 300ms ease-in-out 500ms;
      &.aniStyle3 {
        border-color: #2dfbb2;
        box-shadow: 0 0 9px 2px #2dfbb2, 0 0 9px 2px #2dfbb2 inset;
      }
      &.spanBack {
        span {
          transition: width 300ms, margin 300ms 600ms, background-color 600ms,
            border-radius 600ms;
        }
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        background-color: #fc3e9f;
        border-radius: 2px;
        box-shadow: 0 0 9px 2px #fc3e9f, 0 0 9px 2px #fc3e9f inset;
        transition: margin 300ms, width 300ms 600ms, background-color 600ms;
        &:first-child {
          margin-top: -10px;
        }
        &:last-child {
          margin-top: 10px;
        }
        &.aniStyle1 {
          width: 30px;
          margin-top: 0px;
          background-color: #2dfbb2;
          box-shadow: 0 0 9px 2px #2dfbb2, 0 0 9px 2px #2dfbb2 inset;
        }
        &.aniStyle2 {
          width: 30px;
          margin-top: 0px;
          background-color: #2dfbb2;
          box-shadow: 0 0 9px 2px #2dfbb2, 0 0 9px 2px #2dfbb2 inset;
        }
      }
    }
    .navList {
      .create_ball {
        height: 60px;
        width: 60px;
        line-height: 60px;
        border-radius: 50%;
        opacity: 0;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        left: 50%;
        margin-left: -30px;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #fc3e9f;
        transform-origin: 182.5px;
        transition: all 300ms cubic-bezier(0.64, 0.04, 0.35, 1);
        box-shadow: 0 0 9px 2px #fc3e9f, 0 0 9px 2px #fc3e9f inset;
        i {
          color: #fc3e9f;
          font-size: 22px;
          color: #dd4814;
          animation: blink 2.5s linear infinite;
        }
      }
    }
    @keyframes blink {
      0% {
        opacity: 1;
      }
      10% {
        opacity: 0.9;
      }
      20% {
        opacity: 0.8;
      }
      30% {
        opacity: 1;
      }
      40% {
        opacity: 0.8;
      }
      50% {
        opacity: 0.9;
      }
      60% {
        opacity: 1;
      }
      70% {
        opacity: 0.6;
      }
      80% {
        opacity: 0.4;
      }
      90% {
        opacity: 0.9;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .navStyle2 {
    width: 90%;
    position: fixed;
    left: 5%;
    bottom: 2%;
    .navList {
      display: flex;
      justify-content: space-between;
      .create_ball {
        height: 60px;
        width: 60px;
        line-height: 60px;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #fc3e9f;
        transform-origin: 182.5px;
        transition: all 300ms cubic-bezier(0.64, 0.04, 0.35, 1);
        box-shadow: 0 0 9px 2px #fc3e9f, 0 0 9px 2px #fc3e9f inset;
        i {
          color: #fc3e9f;
          font-size: 22px;
          color: #dd4814;
          animation: blink 2.5s linear infinite;
        }
      }
    }
    @keyframes blink {
      0% {
        opacity: 1;
      }
      10% {
        opacity: 0.9;
      }
      20% {
        opacity: 0.8;
      }
      30% {
        opacity: 1;
      }
      40% {
        opacity: 0.8;
      }
      50% {
        opacity: 0.9;
      }
      60% {
        opacity: 1;
      }
      70% {
        opacity: 0.6;
      }
      80% {
        opacity: 0.4;
      }
      90% {
        opacity: 0.9;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>
