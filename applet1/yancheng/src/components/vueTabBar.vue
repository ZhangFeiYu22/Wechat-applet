<template>
  <section class="tabBar-wrap">
    <article class="tabBar-box">
      <ul class="tabBar-nav" v-if="navList.length > 0">
        <li
          class="item"
          v-for="(item, index) in navList"
          @click="selectNavItem(index,item.pagePath)"
          :key="index"
        >
          <p class="item-images">
            <img
              :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath"
              alt="iconPath"
            />
          </p>
          <p
            :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' "
          >{{item.text}}</p>
        </li>
      </ul>
    </article>
    <div class="issue" v-if="closeShow">
      <navigation-bar :title="'话题'" :navBackgroundColor="'#fff'"></navigation-bar>
      <div class="fixbox">
        <img class="issue_top" src="../../static/images/issue_top.png" mode="aspectFill" />
        <div class="issueIcon issue_activity" :animation="animation1" @click="goPush('activity')">
          <img src="../../static/images/issue_activity.png" mode="aspectFill" />
          <p>活动发布</p>
        </div>
        <div class="issueIcon issue_vote" :animation="animation2" @click="goPush('vote')">
          <img src="../../static/images/issue_vote.png" mode="aspectFill" />
          <p>发起投票</p>
        </div>
        <div class="issueIcon issue_collect" :animation="animation3" @click="goPush('collect')">
          <img src="../../static/images/issue_collect.png" mode="aspectFill" />
          <p>征集/寻求发布</p>
        </div>
        <!-- <div class="issueIcon issue_seek" :animation="animation4" @click="goPush('seek')">
          <img src="../../static/images/issue_seek.png" mode="aspectFill" />
          <p>寻求发布</p>
        </div>-->
      </div>
      <i v-if="closeShow" class="close iconfont icon-close" @click="closeFun"></i>
    </div>
  </section>
</template>
<script>
import navigationBar from "@/components/navigationBar";
export default {
  props: ["selectNavIndex"],
  components: {
    navigationBar
  },
  data() {
    return {
      closeShow: false,
      animation1: {},
      animation2: {},
      animation3: {},
      animation4: {},
      navList: [
        {
          pagePath: "/pages/mallCenter/main",
          iconPath: "/static/tabbar/mall.png",
          selectedIconPath: "/static/tabbar/mall-active.png",
          text: "集市"
        },
        {
          pagePath: "/pages/community/main",
          iconPath: "/static/tabbar/home.png",
          selectedIconPath: "/static/tabbar/home-active.png",
          text: "社区"
        },
        {
          pagePath: "/pages/issue/main",
          iconPath: "/static/tabbar/icon_release.png",
          selectedIconPath: "/static/tabbar/icon_release.png"
        },
        {
          pagePath: "/pages/home/main",
          iconPath: "/static/tabbar/community.png",
          selectedIconPath: "/static/tabbar/community-avtive.png",
          text: "话题"
        },
        {
          pagePath: "/pages/my/main",
          iconPath: "/static/tabbar/my.png",
          selectedIconPath: "/static/tabbar/my-active.png",
          text: "我的"
        }
      ]
    };
  },
  created() {},
  methods: {
    selectNavItem(index, pagePath) {
      if (index === this.selectNavIndex) {
        return false;
      } else if (pagePath == "/pages/issue/main") {
        this.closeShow = true;
        setTimeout(() => {
          this.showAnimation();
        }, 500);
      } else {
        this.bindViewTap(pagePath);
      }
    },

    bindViewTap(url) {
      wx.switchTab({
        url
      });
    },
    showAnimation() {
      //展示动画
      var that = this;
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
        .step()
        .translateY(-180)
        .step();
      animation2
        .translateY(-200)
        .step()
        .translateY(-180)
        .step();
      animation3
        .translateY(-200)
        .step()
        .translateY(-180)
        .step();
      animation4
        .translateY(-200)
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
      //隐藏动画
      var that = this;
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
      animation1.step();
      animation2.step();
      animation3.step();
      animation4.step();
      //清掉之前的动画操作
      that.animation1 = animation1.export();
      that.animation2 = animation2.export();
      that.animation3 = animation3.export();
      that.animation4 = animation4.export();
    },
    closeFun() {
      this.hiddenAnimation();
      setTimeout(() => {
        this.closeShow = false;
      }, 450);
    },
    goPush(val) {
      this.closeFun();
      if (val == "activity") {
        wx.navigateTo({
          url: `/pages/activityAdd/main`
        });
      } else if (val == "vote") {
        wx.navigateTo({
          url: `/pages/voteAdd/main`
        });
      } else if (val == "collect") {
        wx.navigateTo({
          url: `/pages/collectAdd/main`
        });
      } else {
        wx.navigateTo({
          url: `/pages/collectAdd/main`
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tabBar-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 8px 0 10px;
  border-top: 1px solid #eee;
  background-color: #f8f8f8;
}

.tabBar-nav {
  width: 100%;
  display: flex;

  .item {
    flex: 1;
    text-align: center;
  }
  .item-text {
    color: #666;
    font-size: 10px;
    transition: 0.24s linear;
  }
  .item-text-active {
    color: #27a79a;
  }

  .item-images {
    width: 28px;
    height: 28px;
    margin: 0 auto;
    text-align: center;
    transition: 0.24s linear;
    & img {
      width: 100%;
      height: 100%;
    }
  }
}
.issue {
  .fixbox {
    position: fixed;
    z-index: 998;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .issue_top {
      position: absolute;
      width: 120px;
      height: 60px;
      top: 22%;
      left: 50%;
      margin-left: -60px;
    }
    .issueIcon {
      // width: 50px;
      width: 80px;
      height: 50px;
      position: absolute;
      bottom: -100px;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
        display: inline-block;
      }
      p {
        font-size: 12px;
        color: #2e2e2e;
      }
    }
    .issue_activity {
      // left: 10%;
      left: 15%;
    }
    .issue_vote {
      // left: 32%;
      left: 50%;
      margin-left: -40px;
    }
    .issue_collect {
      // right: 32%;
      right: 15%;
    }
    .issue_seek {
      right: 10%;
    }
  }
  .close {
    position: fixed;
    z-index: 999;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    color: #f82d2d;
  }
}
</style>