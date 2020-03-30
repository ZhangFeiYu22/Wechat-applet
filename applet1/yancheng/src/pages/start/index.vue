<template>
  <div class="welcome">
    <navigation-bar :title="'欢迎使用'" :navBackgroundColor="'#fff'" :back-visible="false"></navigation-bar>
    <!-- <div class="formBox">加载中...</div> -->
  </div>
</template>

<script>
import store from "@/store";
import { getSessionInfo, getUserInfo, userInfoGet } from "@/api/login";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      msg: ""
    };
  },
  onLoad() {
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
            wx.switchTab({
              url: "/pages/home/main"
            });
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
      if (authInfo.status == 200) {
        wx.setStorageSync("authInfo", authInfo.result);

        store.commit("changeAuthId", authInfo.result.id); //   用于判断是否显示删除

        wx.switchTab({
          url: "/pages/home/main"
        });

        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        beforePage.onLoad();
        wx.navigateBack({
          delta: 1
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.welcome {
  .formBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
