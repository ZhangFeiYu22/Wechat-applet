<script>
import store from "@/store";
export default {
  getSysInfo() {
    const res = wx.getSystemInfoSync();
    return res;
  },
  onLaunch() {
    // wx.getSystemInfo({
    //   success: res => {
    //     let statusBarHeight = res.statusBarHeight,
    //       navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
    //       navHeight =
    //         statusBarHeight +
    //         menuButtonObject.height +
    //         (menuButtonObject.top - statusBarHeight) * 2; //导航高度
    //     this.globalData.navHeight = navHeight;
    //     this.globalData.navTop = navTop;
    //     this.globalData.windowHeight = res.windowHeight;
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // });
  },
  created() {
    this.globalData = {
      userInfo: null,
      serverimage: "https://minip.cndfmg.com:83/",
      serverXiaoyao: "/image/"
    };

    // tabBar配置
    // wx.hideTabBar()
    // 获取系统信息，适配iphoneX

    // console.log(store);
    store.dispatch("getSystemInfo");
  }
};
</script>

<style>
@import "./../static/iconfont/iconfont.css";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
div,
view {
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.w94 {
  width: 94%;
  margin: 0 auto;
}
.icon-aixin1 {
  color: #f00 !important;
}
</style>
