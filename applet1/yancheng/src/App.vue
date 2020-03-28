<script>
import store from "@/store";
import { getSessionInfo, getUserInfo, userInfoGet } from "@/api/login";
export default {
  getSysInfo() {
    const res = wx.getSystemInfoSync();
    return res;
  },
  created() {
    // 调用store里面的getSystemInfo，获取手机信息
    store.dispatch("getSystemInfo");
    this.getLogin();
  },
  methods: {
    getLogin() {
      var _this = this;
      // 获取用户的当前设置。本项目里判断用户是否已授权登录
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.login({
              success(logRes) {
                if (logRes.code) {
                  // 通过code获取sessionKey 和 openid
                  getSessionInfo(logRes.code).then(sessionRes => {
                    if (sessionRes.status == 200) {
                      store.commit(
                        "changeSessionKey",
                        sessionRes.result.sessionKey
                      );
                      store.commit("changeOpenId", sessionRes.result.openid);
                      wx.getUserInfo({
                        success: function(userRes) {
                          // 如果用户已经授权则会调用该方法
                          wx.setStorageSync("userInfoAll", userRes);
                          let rawData = JSON.parse(userRes.rawData);
                          _this.nickName = rawData.nickName;
                          _this.avatarUrl = rawData.avatarUrl;
                          _this.getAuthToken(
                            sessionRes.result.sessionKey,
                            userRes
                          );
                        }
                      });
                    }
                  });
                }
              }
            });
          } else {
            console.log("用户没有授权");
          }
        }
      });
    },
    // 获取token
    async getAuthToken(sessionKey, userRes) {
      let data = {
        sessionKey: sessionKey,
        signature: userRes.signature,
        rawData: userRes.rawData,
        encryptedData: userRes.encryptedData,
        iv: userRes.iv
      };
      let authToken = await getUserInfo(data);
      wx.setStorageSync("authToken", authToken.result);
      wx.setStorageSync("isLogin", true);
      let authInfo = await userInfoGet();
      wx.setStorageSync("authInfo", authInfo.result);
      this.globalData.isLoun = true;
      // wx.switchTab({
      //   url: "/pages/home/main"
      // });
      var pages = getCurrentPages();
      var beforePage = pages[pages.length - 2];
      beforePage.onLoad();
      wx.navigateBack({
        delta: 1
      });
    }
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
