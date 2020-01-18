<template>
  <div class="discover" :style="{backgroundImage:'url('+bgurl +')'}">
    <div class="container">
      <div class="balloon">
        <div class="gameBox game1" @click="goGame1" :style="{backgroundImage:'url('+cir2 +')'}">
          <span>真心话</span>
        </div>
        <div class="gameBox game2" @click="goGame2" :style="{backgroundImage:'url('+cir1 +')'}">
          <span>摇骰子</span>
        </div>
        <div class="gameBox game3" :style="{backgroundImage:'url('+cir3 +')'}">
          <span>Game Center</span>
        </div>
        <div class="gameBox game4" @click="goVote">
          <span>投票专区</span>
        </div>
        <div class="gameBox game5" @click="goActivity">
          <span>活动中心</span>
        </div>
        <!-- <div class="gameBox game6">
          <span>game6</span>
        </div>-->
      </div>
    </div>
    <!-- <button class="handleBtn" @click="btnClick">登录授权</button> -->
    <div class="navStyle">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgurl: `${this.$store.state.imgUrlHttp}/bg.jpeg`,
      cir1: `${this.$store.state.imgUrlHttp}/cir1.png`,
      cir2: `${this.$store.state.imgUrlHttp}/cir2.png`,
      cir3: `${this.$store.state.imgUrlHttp}/cir3.png`,
      animation1: {},
      animation2: {},
      animation3: {},
      animation4: {},
      aniStyle: false,
      stretch: false, //判断是否展开，默认不展开
      running: false //动画正在运行状态：控制动画运行完毕后才能再次运行
    };
  },
  methods: {
    goGame1() {
      wx.navigateTo({
        url: "/pages/game_truchOrDare/main"
      });
    },
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
    goGame2() {
      wx.navigateTo({
        url: "/pages/game_dice/main"
      });
    },
    btnClick() {
      wx.switchTab({
        url: "/pages/home/main"
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
    btnClick() {
      wx.switchTab({
        url: "/pages/home/main"
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
        .translateX(-125)
        .translateY(0)
        .opacity(1)
        .step();
      //表示一组动画完成
      animation2
        .translateX(-100)
        .translateY(-60)
        .opacity(1)
        .step();
      //表示一组动画完成
      animation3
        .translateX(-60)
        .translateY(-110)
        .opacity(1)
        .step();
      //表示一组动画完成
      animation4
        .translateX(-5)
        .translateY(-145)
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
  }
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
  background-size: 100% 100%;
  span {
    text-transform: uppercase;
  }

  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 0 auto;
    position: relative;
    .balloon {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding-top: 30px;
      position: relative;
      .gameBox {
        width: 70px;
        height: 70px;
        // background: rgba(182, 15, 97, 0.9);
        background-size: 100% 100%;
        border-radius: 50%;
        position: absolute;
        padding: 10px;
        // box-shadow: inset 17px 7px 10px rgba(182, 15, 97, 0.9);
        -webkit-transform-origin: bottom center;
        span {
          font-size: 14px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .game1 {
        width: 90px;
        height: 90px;
        z-index: 1;
        // background: rgba(182, 15, 97, 0.9);
        left: 5%;
        top: 45%;
        transform: translateY(-50%);
        // box-shadow: inset 0px -10px 10px rgba(135, 11, 72, 0.9);
        -webkit-animation: balloon1 6s ease-in-out infinite;
        animation: balloon1 6s ease-in-out infinite;
      }
      .game2 {
        width: 100px;
        height: 100px;
        z-index: 1;
        // background: rgba(242, 112, 45, 0.9);
        left: 22%;
        top: 17%;
        transform: translateY(-50%);
        // box-shadow: inset 0px -10px 10px rgba(222, 85, 14, 0.9);
        -webkit-animation: balloon2 6s ease-in-out infinite;
        animation: balloon2 6s ease-in-out infinite;
      }
      .game3 {
        // background: rgba(45, 181, 167, 0.9);
        width: 150px;
        height: 150px;
        z-index: 9;
        left: 50%;
        top: 42%;
        transform: translate(-50%, -50%);
        // box-shadow: inset 0px -10px 10px rgba(35, 140, 129, 0.9);
        -webkit-animation: balloon4 6s ease-in-out infinite;
        animation: balloon4 6s ease-in-out infinite;
      }
      .game4 {
        width: 115px;
        height: 115px;
        z-index: 1;
        background: rgba(190, 61, 244, 0.9);
        left: 60%;
        top: 12%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(173, 14, 240, 0.9);
        -webkit-animation: balloon1 5s ease-in-out infinite;
        animation: balloon1 5s ease-in-out infinite;
      }
      .game5 {
        width: 115px;
        height: 115px;
        z-index: 1;
        background: rgba(180, 224, 67, 0.9);
        left: 69%;
        top: 54%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(158, 206, 34, 0.9);
        -webkit-animation: balloon3 5s ease-in-out infinite;
        animation: balloon3 5s ease-in-out infinite;
      }
      .game6 {
        width: 100px;
        height: 100px;
        background: rgba(242, 194, 58, 0.9);
        left: 600px;
        z-index: 1;
        left: 30%;
        top: 62%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(234, 177, 15, 0.9);
        -webkit-animation: balloon2 5s ease-in-out infinite;
        animation: balloon2 5s ease-in-out infinite;
      }
    }
  }
  .handleBtn {
    width: 70px;
    height: 70px;
    padding: 15px;
    border-radius: 50%;
    margin-top: 10%;
    line-height: 20px;
    font-size: 14px;
    background-color: #1bad19;
    color: #fff;
    position: absolute;
    bottom: 20px;
    left: 15px;
  }
  // CSS3动画
  /*BALLOON 1 4*/
  @-webkit-keyframes balloon1 {
    0%,
    100% {
      -webkit-transform: translateY(0) rotate(-6deg) scale(1);
    }

    50% {
      -webkit-transform: translateY(-20px) rotate(8deg) scale(0.95);
    }
  }

  /* BAllOON 2 5*/
  @-webkit-keyframes balloon2 {
    0%,
    100% {
      -webkit-transform: translateY(0) rotate(6eg) scale(1);
    }

    50% {
      -webkit-transform: translateY(-30px) rotate(-8deg) scale(0.95);
    }
  }

  /* BAllOON 0*/
  @-webkit-keyframes balloon3 {
    0%,
    100% {
      -webkit-transform: translate(0, -50%) rotate(6eg) scale(1);
    }

    50% {
      -webkit-transform: translate(-10px, -52%) rotate(-8deg) scale(0.95);
    }
  }

  /* BAllOON 3*/
  @-webkit-keyframes balloon4 {
    0%,
    100% {
      -webkit-transform: translate(-46.5%, -46.5%) rotate(-5eg) scale(1);
    }

    50% {
      -webkit-transform: translate(-52%, -52%) rotate(0deg) scale(0.95);
    }
  }
  .navStyle {
    .navBottom {
      z-index: 999;
      position: fixed;
      right: 15px;
      bottom: 20px;
      width: 136rpx;
      height: 136rpx;
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
        transition: margin 300ms, width 300ms 600ms, background-color 600ms,
          border-radius 600ms;

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
        right: 10rpx;
        bottom: 20rpx;
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
