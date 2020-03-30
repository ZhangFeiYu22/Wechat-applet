<template>
  <div class="login">
    <img src="../../../static/images/loginbg.jpeg" mode="aspectFill" />
    <div class="loginMain">
      <div class="userInfo">
        <div class="welcome">欢迎使用</div>
      </div>
      <div class="info">请允许获得您的公开信息</div>
      <div class="btnBox">
        <button class="btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from "@/store/index";
import { getSessionInfo, getUserInfo, userInfoGet } from "@/api/login";
export default {
  data() {
    return {
      loginBg: require("../../../static/images/loginbg.jpeg")
    };
  },
  mounted() {
    this.getSessionKey();
  },
  methods: {
    getSessionKey() {
      // 获取code  用来获取sessionKey
      wx.login({
        success(res) {
          if (res.code) {
            //获取sessionInfo
            getSessionInfo(res.code).then(res => {
              globalStore.commit("changeSessionKey", res.result.sessionKey);
              globalStore.commit("changeOpenId", res.result.openid);
            });
          }
        }
      });
    },
    // 获取用户信息
    bindGetUserInfo(e) {
      var loRes = e.mp.detail;
      let _this = this;
      if (e.mp.detail.userInfo) {
        // 用户按了允许授权按钮
        let data = {
          sessionKey: globalStore.state.globalSessionKey,
          signature: loRes.signature,
          rawData: loRes.rawData,
          encryptedData: loRes.encryptedData,
          iv: loRes.iv
        };
        // 获取token
        getUserInfo(data).then(res => {
          if (res.status == 200) {
            wx.showToast({
              title: "授权成功", //提示文字
              duration: 2000, //显示时长
              mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false
              icon: "success", //图标，支持"success"、"loading"
              success: function() {
                // 存储token   和  用户信息
                wx.setStorageSync("authToken", res.result);
                wx.setStorageSync("userInfoAll", loRes); //用户所有信息

                userInfoGet().then(aures => {
                  if (aures.status == 200) {
                    wx.setStorageSync("authInfo", aures.result);
                    globalStore.commit("changeAuthId", aures.result.id); //   用于判断是否显示删除

                    wx.setStorageSync("isLogin", true);
                    //返回上一页并刷新数据
                    var pages = getCurrentPages();
                    var beforePage = pages[pages.length - 2];
                    beforePage.onLoad();
                    wx.navigateBack({
                      delta: 1
                    });
                  }
                });
              }, //接口调用成功
              fail: function() {}, //接口调用失败的回调函数
              complete: function() {} //接口调用结束的回调函数
            });
          }
        });
      } else {
        // 用户按了拒绝按钮
        wx.showModal({
          title: "提示",
          content:
            "您点击了拒绝授权，部分功能将无法使用,请授权登录享受更多权益!",
          showCancel: false,
          confirmText: "返回授权",
          success: function(res) {
            if (res.confirm) {
              console.log("用户点击了“返回授权”");
            }
          }
        });
      }
    }
  }
};
</script>


<style lang="less" scoped>
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
  .loginMain {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    .userInfo {
      padding: 10px;
      width: 92px;
      margin: 0 auto;
      text-align: center;
      .welcome {
        font-size: 18px;
        line-height: 20px;
        color: #fff;
      }
    }
    .info {
      margin-top: 60px;
      text-align: center;
      font-size: 16px;
      color: #f1f1f1;
    }
    .btnBox {
      width: 100%;
      margin: 80px auto;
      .btn {
        border: none;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background: #2aa144;
        color: #fff;
        border-radius: 5px;
        text-align: center;
      }
    }
  }
}
</style>
