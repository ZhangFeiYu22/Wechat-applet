<template>
  <div class="myAttestation">
    <navigation-bar :title="'认证'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <view class="inpbox">
      <input
        placeholder="请输入手机号"
        class="inpbtn"
        type="number"
        maxlength="11"
        :value="mobile"
        @input="blurPhone"
      />
      <text
        class="dongtaima"
        :class="hui?'hui':'red'"
        v-if="isyanzhengma"
        @click.stop="dongtaima"
      >获取动态码</text>
      <text class="dongtaima" v-else>重发（{{countdown}}）</text>
    </view>
    <view class="inpbox">
      <input placeholder="请输入验证码" :value="code" maxlength="6" class="inpbtn" @input="codetap" />
    </view>

    <view class="teldl" :class="dlno ? 'tou50':''" @click.stop="teldltap">
      <text class="icontxt">验 证</text>
    </view>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
import { sendCodeGet, validationCode } from "@/api/my.js";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      mobile: "",
      code: "",
      isyanzhengma: true,
      hui: true,
      dlno: true,
      countdown: 60,
      teltrue: false,
      inter: ""
    };
  },
  methods: {
    // 手机号验证
    blurPhone(e) {
      console.log(e);
      this.mobile = e.mp.detail.value;
      let phone = this.mobile;
      if (!/^1[34578]\d{9}$/.test(phone)) {
        this.teltrue = false;
        this.hui = true;
        if (phone.length >= 11) {
          wx.showToast({
            title: "手机号有误",
            icon: "none",
            duration: 2000
          });
        }
      } else {
        this.teltrue = true;
        this.hui = false;
        console.log("验证成功", this.teltrue);
      }
    },
    dongtaima(e) {
      if (this.teltrue & !this.hui) {
        let params = {
          mobile: this.mobile
        };
        sendCodeGet(params).then(res => {
          console.log(res);
          if (res.status == 200) {
            wx.showToast({
              title: '发送成功',
              icon: "none",
              duration: 2000
            });
            this.isyanzhengma = false;
            this.daojishi();
          } else {
            wx.showToast({
              title: "发送失败，请重发！",
              icon: "none",
              duration: 2000
            });
          }
        });
      } else if (!this.teltrue) {
        wx.showToast({
          title: "请填写正确的手机号！",
          icon: "none",
          duration: 2000
        });
      }
    },
    codetap(e) {
      this.code = e.mp.detail.value;
      if (this.teltrue & (this.code != "")) {
        this.dlno = false;
      }
    },
    daojishi() {
      this.inter = setInterval(res => {
        this.fun();
      }, 1000);
    },
    fun() {
      let t = this.countdown;
      t--;
      this.countdown = t;
      if (t <= 0) {
        clearInterval(this.inter);
        this.isyanzhengma = true;
      }
    },

    teldltap() {
      let params = {
        code: this.code,
        mobile: this.mobile
      };
      if (this.teltrue & (this.code != "")) {
        validationCode(params).then(res => {
          if (res.status == 200) {
            wx.showToast({
              title: "认证成功",
              icon: "none",
              duration: 1000,
              success(data) {
                setTimeout(function() {
                  //要延时执行的代码
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1000); //延迟时间
              }
            });
          } else {
            wx.showToast({
              // title: res.data.msg, // 未成功原因
              title: "验证出错，有疑问请联系客服", // 未成功原因
              icon: "none",
              duration: 2000
            });
          }
        });
      } else if (!this.teltrue) {
        wx.showToast({
          title: "请填写正确的手机号！",
          icon: "none",
          duration: 2000
        });
      } else {
        wx.showToast({
          title: "请填写验证码！",
          icon: "none",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@fontcolor: #353535;
@red: #ff2b0a;
.myAttestation {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0 40rpx;
  box-sizing: border-box;
  .teltit {
    font-size: 50rpx;
    color: @fontcolor;
    line-height: 90rpx;
    margin-top: 35rpx;
    margin-left: 20rpx;
  }
  .inpbox {
    position: relative;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
    color: @fontcolor;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eee;
    .inpbtn {
      width: 430rpx;
      height: 100%;
      margin: 0 30rpx;
    }
    .hui {
      color: #888;
    }
    .red {
      color: @red;
    }
  }
  .teldl {
    position: relative;
    width: 100%;
    height: 94rpx;
    border-radius: 15rpx;
    line-height: 94rpx;
    text-align: center;
    font-size: 36rpx;
    margin-top: 60rpx;
    color: #fff;
    background: @red;
  }
  .tou50 {
    background: #ff9584;
  }
}
</style>
