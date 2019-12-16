<script>
import store from "@/store";
export default {
  getSysInfo() {
    const res = wx.getSystemInfoSync()
    return res
  },
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        // let statusBarHeight = res.statusBarHeight,
        //   navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
        //   navHeight =
        //     statusBarHeight +
        //     menuButtonObject.height +
        //     (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        // this.globalData.navHeight = navHeight;
        // this.globalData.navTop = navTop;
        // this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    });
  },
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync("logs", logs);
    }

    // tabBar配置
    // wx.hideTabBar()
    // 获取系统信息，适配iphoneX

    console.log(store);
    store.dispatch("getSystemInfo");
  },
  log() {
    console.log(`log at:${Date.now()}`);
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
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.w95{
  width: 95%;
  margin: 0 auto;
}
</style>
