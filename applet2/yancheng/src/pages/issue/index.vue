<template>
  <div class="issue">
    <navigation-bar :title="'话题'" :navBackgroundColor="'#fff'"></navigation-bar>
    <div class="fixbox">
      <img class="issue_top" src="../../../static/images/issue_top.png" mode="aspectFill" />
      <img
        class="issueIcon issue_activity"
        :animation="animation1"
        src="../../../static/images/issue_activity.png"
        mode="aspectFill"
      />
      <img
        class="issueIcon issue_vote"
        :animation="animation2"
        src="../../../static/images/issue_vote.png"
        mode="aspectFill"
      />
      <img
        class="issueIcon issue_collect"
        :animation="animation3"
        src="../../../static/images/issue_collect.png"
        mode="aspectFill"
      />
      <img
        class="issueIcon issue_seek"
        :animation="animation4"
        src="../../../static/images/issue_seek.png"
        mode="aspectFill"
      />
    </div>
    <i class="close iconfont icon-close" @click="closeFun"></i>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      animation1: {},
      animation2: {},
      animation3: {},
      animation4: {}
    };
  },
  onShow() {
    setTimeout(() => {
      this.showAnimation();
    }, 500);
  },
  methods: {
    showAnimation() {
      console.log("执行动画");
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
        delay: 150,
        timingFunction: "ease"
      });
      //表示一组动画完成
      animation1
        .translateY(-200)
        .opacity(1)
        .step()
        .translateY(-180)
        .step();
      animation2
        .translateY(-200)
        .opacity(1)
        .step()
        .translateY(-180)
        .step();
      animation3
        .translateY(-200)
        .opacity(1)
        .step()
        .translateY(-180)
        .step();
      animation4
        .translateY(-200)
        .opacity(1)
        .step()
        .translateY(-180)
        .step();
      //清掉之前的动画操作
      that.animation1 = animation1.export();
      that.animation2 = animation2.export();
      that.animation3 = animation3.export();
      that.animation4 = animation4.export();
    },
    hiddenAnimation() {
      console.log("隐藏动画执行");
      //隐藏动画
      var that = this;
      var animation1 = wx.createAnimation({
        duration: 300,
        delay: 150,
        timingFunction: "ease"
      });
      var animation2 = wx.createAnimation({
        duration: 300,
        delay: 100,
        timingFunction: "ease"
      });
      var animation3 = wx.createAnimation({
        duration: 300,
        delay: 50,
        timingFunction: "ease"
      });
      var animation4 = wx.createAnimation({
        duration: 300,
        delay: 0,
        timingFunction: "ease"
      });
      //表示一组动画完成
      animation1.opacity(0).step();
      animation2.opacity(0).step();
      animation3.opacity(0).step();
      animation4.opacity(0).step();
      //清掉之前的动画操作
      that.animation1 = animation1.export();
      that.animation2 = animation2.export();
      that.animation3 = animation3.export();
      that.animation4 = animation4.export();
    },
    closeFun() {
      this.hiddenAnimation();
    }
  }
};
</script>

<style lang="less" scoped>
.issue {
  .fixbox {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .issue_top {
      position: absolute;
      width: 120px;
      height: 60px;
      top: 22%;
      left: 50%;
      margin-left: -60px;
    }
    .issueIcon {
      width: 50px;
      height: 50px;
      position: absolute;
      bottom: -100px;
    }
    .issue_activity {
      left: 10%;
    }
    .issue_vote {
      left: 32%;
    }
    .issue_collect {
      right: 32%;
    }
    .issue_seek {
      right: 10%;
    }
  }
  .close {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    color: #f82d2d;
  }
}
</style>
