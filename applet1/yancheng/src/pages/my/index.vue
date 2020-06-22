<template>
  <div class="my">
    <navigation-bar :title="'我的'" :navBackgroundColor="'#fff'"></navigation-bar>
    <div class="head">
      <div class="headImg">
        <img :src="userInfo.avatar" mode="aspectFill" />
        <div class="hierarchy">
          <!-- <img :src="levUrl" mode="aspectFill" /> -->
          <div class="nameSex">
            <p class="name">{{userInfo.nickName}}</p>
            <p class="sex">
              <i class="iconfont icon-nan" v-if="userInfo.gender==1"></i>
              <i class="iconfont icon-nv" v-else-if="userInfo.gender==2"></i>
              <i class="iconfont" v-else></i>
            </p>
          </div>
          <p class="lv">LV5</p>
        </div>
      </div>
      <div class="rightIcon">
        <i class="iconfont icon-pinglun" @click="goMessage"></i>
        <i class="iconfont icon-shezhi" @click="goMyInfo"></i>
      </div>
    </div>
    <div class="baseInfo">
      <!-- <div class="nameSexPhone">
        <p class="name">{{userInfo.nickName}}</p>
        <p class="sex">
          <i class="iconfont icon-nan" v-if="userInfo.gender==1"></i>
          <i class="iconfont icon-nv" v-else-if="userInfo.gender==2"></i>
          <i class="iconfont" v-else></i>
        </p>
        <p class="phone">182****1234</p>
      </div>-->
      <div class="inaword ellip">{{userInfo.introduction}}</div>
      <div class="other">
        <p class="constellation">金牛座</p>
        <p class="address">{{userInfo.city}}</p>
        <p class="follower">15人关注</p>
        <p class="autonym">已实名</p>
      </div>
    </div>
    <!-- <div class="wallet">
      <div class="gold">
        <p class="p1">我的金币</p>
        <p class="p2">100.00</p>
      </div>
      <div class="balance">
        <p class="p1">我的余额</p>
        <p class="p2">0.00</p>
      </div>
      <div class="recharge" @click="goRecharge">
        <p class="p1 p1r">充值</p>
      </div>
    </div>-->
    <div class="wallet2">
      <p class="p1">我的砖头</p>
      <p class="p2">
        <i class="iconfont icon-zhuan3"></i>100.00
      </p>
    </div>
    <div class="otherList">
      <!-- <div class="otherItem" @click="goMyVip">
        <i class="iconfont icon-huiyuan iconLeft"></i>
        <span>我的会员</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>-->
      <div class="otherItem" @click="goAttention">
        <i class="iconfont icon-guanzhu iconLeft"></i>
        <span>我的关注</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
      <div class="otherItem" @click="goPublish">
        <i class="iconfont icon-publish iconLeft"></i>
        <span>我的发布</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
      <div class="otherItem" @click="goRecord">
        <i class="iconfont icon-jilu iconLeft"></i>
        <span>我的记录</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
      <div class="otherItem" @click="goAttestation">
        <i class="iconfont icon-renzheng iconLeft"></i>
        <span>我的认证</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
      <div class="otherItem" @click="goMedal">
        <i class="iconfont icon-xunzhang iconLeft"></i>
        <span>活动勋章</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
    </div>
    <div class="line"></div>
    <div class="otherList">
      <div class="otherItem" @click="goAboutUs">
        <i class="iconfont icon-guanzhu iconLeft"></i>
        <span>关于我们</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
    </div>
    <div class="logo">
      <img src="../../../static/images/logo.png" mode="aspectFill" />
    </div>
    <vue-tab-bar :selectNavIndex="4"></vue-tab-bar>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
import vueTabBar from "@/components/vueTabBar";
export default {
  components: {
    navigationBar,
    vueTabBar
  },
  data() {
    return {
      levUrl: `${this.$store.state.commonImgHttp}/lv5.png`,
      userInfo: {},
      likeAct: false,
      itemActive: 0,
      headImg: `${this.$store.state.imgUrlHttp}/head.png`
    };
  },
  onLoad() {
    if (wx.getStorageSync("isLogin")) {
      this.userInfo = wx.getStorageSync("authInfo");
    } else {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
  },
  onShow() {
    console.log("1");
    this.userInfo = wx.getStorageSync("authInfo");
  },
  methods: {
    goMyVip() {
      wx.navigateTo({
        url: "/pages/myVip/main"
      });
    },
    goMessage() {
      wx.navigateTo({
        url: "/pages/message/main"
      });
    },
    goPublish() {
      let authInfo = wx.getStorageSync("authInfo");
      wx.navigateTo({
        url: `/pages/myPublish/main?createrId=${authInfo.id}`
      });
    },
    goAttention() {
      wx.navigateTo({
        url: "/pages/myAttention/main"
      });
    },
    goRecord() {
      wx.navigateTo({
        url: "/pages/myRecord/main"
      });
    },
    goMyInfo() {
      wx.navigateTo({
        url: "/pages/myInfo/main"
      });
    },
    goTopic() {
      wx.navigateTo({
        url: "/pages/topicDetails/main"
      });
    },
    goRecharge() {
      wx.navigateTo({
        url: "/pages/recharge/main"
      });
    },
    goAttestation() {
      wx.navigateTo({
        url: "/pages/myAttestation/main"
      });
    },
    goMedal() {
      wx.navigateTo({
        url: "/pages/myMedal/main"
      });
    },
    goAboutUs() {
      wx.navigateTo({
        url: "/pages/aboutUs/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headImg {
      img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
      .hierarchy {
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
        text-align: center;
        .lv {
          background: linear-gradient(to bottom, #ffefae, #eba351);
          color: #fff;
          font-size: 13px;
          letter-spacing: 2px;
        }
        .nameSex {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          .sex {
            margin-left: 5px;
          }
        }
      }
    }
    .rightIcon {
      display: flex;
      justify-content: space-around;
      .iconfont {
        font-size: 25px;
        margin-right: 10px;
      }
    }
  }
  .baseInfo {
    width: 90%;
    margin: 10px auto;
    position: relative;
    .nameSexPhone {
      display: flex;
      justify-content: left;
      align-items: center;
      .name {
        font-size: 20px;
        font-weight: 600;
        margin-right: 10px;
      }
      .sex {
        font-size: 14px;
        color: #707070;
        margin-right: 10px;
      }
      .phone {
        font-size: 16px;
        color: #525151;
      }
    }
    .inaword {
      font-size: 12px;
      color: #333;
      margin: 10px 0;
      &.ellip {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .other {
      display: flex;
      justify-content: left;
      p {
        padding: 2px 10px;
        margin-right: 10px;
        background-color: #eee;
        font-size: 12px;
        color: #525151;
        border-radius: 5px;
      }
    }
    .editInfoBtn {
      font-size: 12px;
      color: #525151;
      background-color: #eee;
      border: 1px solid #707070;
      position: absolute;
      top: 50%;
      right: 0;
      padding: 4px 15px;
      border-radius: 5px;
      transform: translateY(-50%);
    }
  }
  .wallet {
    height: 100px;
    width: 94%;
    margin: 15px auto 10px;
    border-radius: 5px;
    background: linear-gradient(to right, #fd5139, #fe9386);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    > div {
      width: 33%;
      text-align: center;
    }
    .p1 {
      font-size: 16px;
      &.p1r {
        position: relative;
        &::after {
          position: absolute;
          top: 6px;
          right: 20%;
          content: "";
          width: 10px;
          height: 10px;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          transform: rotate(-45deg);
        }
      }
    }
    .p2 {
      font-size: 20px;
      line-height: 30px;
    }
    .balance {
      border-right: 1px solid #fff;
    }
  }
  .wallet2 {
    height: 40px;
    width: 92%;
    margin: 15px auto 10px;
    border-radius: 5px;
    background: linear-gradient(to right, #fd5139, #fe9386);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    .p2 {
      i {
        display: inline-block;
        margin-right: 5px;
        font-size: 18px;
      }
    }
  }
  .otherList {
    width: 90%;
    margin: 0 auto;
    .otherItem {
      line-height: 46px;
      i {
        display: inline-block;
        &.iconLeft {
          margin-right: 20px;
          font-size: 22px;
        }
        &.iconRight {
          float: right;
        }
      }
      span {
        font-size: 18px;
        color: #2a2a2a;
      }
    }
  }
  .logo {
    img {
      width: 70px;
      height: 45px;
      display: block;
      margin: 10px auto 20px;
    }
  }
  .line {
    width: 100%;
    height: 8px;
    background-color: #eee;
  }
}
</style>
