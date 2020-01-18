<template>
  <div
    class="navigation-bar"
    :style="{paddingTop: paddingTop + 'px', height: height + 'px', backgroundColor: background||barStyle.background}"
  >
    <div
      v-if="leftShow"
      class="back-home"
      :style="{minWidth:menuSettings.width + 'px',height: menuSettings.height + 'px',borderRadius: (menuSettings.height/2) + 'px',marginTop:marginTop + 'px', transform:'scale('+scale+')'}"
    >
      <div class="back" @click="goBack" :style="{height: menuSettings.height + 'px'}">
        <i class="iconfont icon-Left"></i>
      </div>
      <div class="line"></div>
      <div class="home" @click="goHome" :style="{height: menuSettings.height + 'px'}">
        <i class="iconfont icon-zu1"></i>
      </div>
    </div>
    <div
      v-else
      class="back-home2"
      :style="{minWidth:menuSettings.width + 'px',height: menuSettings.height + 'px'}"
    ></div>
    <div
      class="title"
      :style="{textAlign: barStyle.textAlign, color: color||barStyle.color,fontSize: barStyle.fontSize + 'px',lineHeight: barStyle.fontSize + 'px', lineHeight:barStyle.height + 'px'}"
    >
    <p>{{title}}</p>
    <img :src="titleBg" mode="widthFix"></div>
    <div
      class="back-home1"
      :style="{minWidth:menuSettings.width + 'px',height: menuSettings.height + 'px'}"
    ></div>
  </div>
</template>

<script>
import { statusBar, navigationBar, navBarStyle } from "@/utils/systemSetting";
import store from "@/store";
export default {
  props: {
    title: { type: String, default: "" },
    color: { type: String, default: "" },
    background: { type: String, default: "" }
  },
  /**
   * 组件的初始数据
   */
  data() {
    return {
      titleBg: require('../../static/images/titlebg.png'),
      paddingTop: statusBar.android, // 默认为android大部分普通机型高度
      height: navigationBar.default + statusBar.android,
      barStyle: {},
      currentPage: "",
      leftShow: false,
      marginTop: 0,
      scale: 1
    };
  },
  computed: {
    showBackIcon() {
      const pages = getCurrentPages();
      this.currentPage = pages[pages.length - 1].route;
      console.log("x----", this.currentPage);
      if (pages.length > 1) {
        this.leftShow = true;
        return true;
      } else {
        if (this.currentPage !== "pages/home/main") {
          this.leftShow = true;
        }
        return false;
      }
    },
    menuSettings() {
      return store.state.menuSettings;
    }
  },
  mounted() {
    const systemInfo = wx.getSystemInfoSync();
    if (this.menuSettings.height === 0) {
      this.getMenuSettings(1, 3);
    }
    this.scale = 1 - 0.5 / this.menuSettings.height;
    this.marginTop = this.menuSettings.top - systemInfo.statusBarHeight;
    const ratio = systemInfo.screenHeight / systemInfo.screenWidth; // 高宽比例
    const isNewModel = ratio >= 2;
    const isIPhone = systemInfo.model.indexOf("iPhone") >= 0;
    const barHeight =
      systemInfo.statusBarHeight ||
      (isNewModel
        ? statusBar.newModel
        : isIPhone
          ? statusBar.iPhone
          : statusBar.android);
    this.paddingTop = barHeight;
    this.height = barHeight + navigationBar.default;
    let barStyle = { ...navBarStyle };
    barStyle.height = navigationBar.default;
    this.barStyle = barStyle;
    let hhh = this.paddingTop + this.height;
    store.commit("topHeightFun", hhh);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getMenuSettings(current, count) {
      let menuSettings = wx.getMenuButtonBoundingClientRect();
      if (menuSettings.height === 0) {
        if (current > 3) {
          return;
        }
        setTimeout(() => {
          this.getMenuSettings(current + 1, count);
        }, 200);
      } else {
        store.commit("setMenuSettings", menuSettings);
      }
    },
    goBack() {
      if (this.showBackIcon) {
        wx.navigateBack({
          delta: 1
        });
      } else {
        if (this.currentPage !== "pages/home/main") {
          wx.reLaunch({
            url: "/pages/home/main"
          });
        }
      }
    },
    goHome() {
      if (this.currentPage !== "pages/home/main") {
        wx.reLaunch({
          url: "/pages/home/main"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.navigation-bar {
  width: 100vw;
  height: 60px;
  background-color: rgba(255, 255, 255, 0);
  color: #000;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1000;
}
.back-home {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  margin-left: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 1px rgb(207, 207, 207);
  overflow: hidden;
}
.back-home2 {
  margin-left: 10px;
}
.back-home1 {
  margin-right: 10px;
}
.back,
.home {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back img {
  width: 9px;
  height: 16px;
}
.home img {
  width: 17px;
  height: 17px;
}
.line {
  width: 1px;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  transform: scaleX(0.5);
}
.title {
  flex: 1;
  box-sizing: border-box;
  padding: 0 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* font-weight: bold; */
  position: relative;
  img{
    width: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>