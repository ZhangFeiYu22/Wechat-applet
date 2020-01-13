<template>
  <div class="my">
    <div class="head">
      <div class="headImg">
        <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        <div class="hierarchy">
          <img src="../../../static/images/hierarchy.png" mode="aspectFill" />
          <p>LV1</p>
        </div>
      </div>
      <div class="rightIcon">
        <i class="iconfont icon-pinglun" @click="goMessage"></i>
        <i class="iconfont icon-shezhi" @click="goMyInfo"></i>
      </div>
    </div>
    <div class="baseInfo">
      <div class="nameSexPhone">
        <p class="name">张小凡</p>
        <p class="sex">
          <i class="iconfont icon-nan"></i>
        </p>
        <p class="phone">182****1234</p>
      </div>
      <div class="inaword">要成为世界第一的梦珂宝训练大师</div>
      <div class="other">
        <p class="constellation">金牛座</p>
        <p class="address">南京市</p>
        <p class="follower">15人关注</p>
        <p class="autonym">已实名</p>
      </div>
      <!-- <div class="editInfoBtn" @click="goMyInfo">编辑资料</div> -->
    </div>
    <div class="wallet">
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
    </div>
    <div class="otherList">
      <div class="otherItem" @click="goPublish">
        <i class="iconfont icon-publish iconLeft"></i>
        <span>我的发布</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
      <div class="otherItem" @click="goAttention">
        <i class="iconfont icon-guanzhu iconLeft"></i>
        <span>我的关注</span>
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
        <span>我的勋章</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeAct: false,
      itemActive: 0,
      ItemList: [
        {
          showEllip: false,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨",
          picList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        },
        {
          showEllip: true,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨，淅淅沥沥的春雨就飘然而至，莺飞草长，一泓碧水粼粼而起，杨柳拂堤，碧草如丝，繁花似锦，飞泉鸣溅，古寺的梵音在石缝间流淌，雨后的空气溢出清新的芳香。而后是杏花雨，梨花雨，暮春过后，连绵不断的黄梅雨又弥漫江南。夜晚的雨声，清晨的花香，清绝的令人深深沉醉，秀雅的让人不舍离去。纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵",
          picList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        }
      ]
    };
  },
  methods: {
    goMessage() {
      wx.navigateTo({
        url: "/pages/message/main"
      });
    },
    goPublish() {
      wx.navigateTo({
        url: "/pages/myPublish/main"
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
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.ItemList[outIdx].picList;
      console.log(imgArr);
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
  },
  onTabItemTap(item) {
    wx.setStorageSync("tabItemClick", item.pagePath);
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
        img {
          width: 30px;
          height: 35px;
        }
        p {
          color: #e1c582;
          font-size: 13px;
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
      width: 45px;
      height: 28px;
      display: block;
      margin: 20px auto 0;
    }
  }
  .line {
    width: 100%;
    height: 8px;
    background-color: #eee;
  }
}
</style>
