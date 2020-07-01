<template>
  <div class="activityDetails">
    <navigation-bar :title="'活动详情'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="imgB">
      <img v-if="acDetails.coverImage" :src="acDetails.coverImage" mode="aspectFill" />
    </div>
    <div class="content w94">
      <h5 class="title">{{acDetails.title}}</h5>
      <p class="price">{{acDetails.activityFee > 0 ? '￥'+acDetails.activityFee : '免费'}}</p>
      <p class="infoLine">
        <i class="iconfont icon-dingwei"></i>
        <span>{{acDetails.activityAddress}}</span>
      </p>
      <p class="infoLine">
        <i class="iconfont icon-shijian"></i>
        <span>{{acDetails.activityTime}}</span>
      </p>
      <p class="infoLine">
        <i class="iconfont icon-shouji"></i>
        <span>18512341234</span>
      </p>
      <div class="contentCont">
        <p class="pp">活动详情</p>
        <div class="details">
          <div v-for="(imgItem,imgIndex) in acDetails.content" :key="imgIndex">
            <img v-if="imgItem" :src="imgItem" mode="widthFix" />
          </div>
        </div>
        <p class="pp">活动须知</p>
        <div class="needKnow">
          <p>{{acDetails.subTitle}}</p>
        </div>
      </div>
    </div>

    <div class="footerBox">
      <div class="other">
        <p @click.stop="likeFun(acDetails.id)">
          <i class="iconfont" :class="likeAct?'icon-aixin1':'icon-aixin0'"></i>
          <span>关注</span>
        </p>
        <button class="share" open-type="share">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </button>
        <p @click.stop="callPhone">
          <i class="iconfont icon-kefu"></i>
          <span>客服</span>
        </p>
      </div>
      <div class="join" @click="joinMaskToggle">
        <i class="iconfont icon-canjia"></i>
        <span>参加</span>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="shadow" v-if="joinMaskShow" @click="joinMaskToggle"></div>
    <div class="joinMask" v-if="joinMaskShow">
      <i class="iconfont icon-close close" @click="joinMaskToggle"></i>
      <p class="topTitle">参与方式</p>
      <div class="cont">
        <p class="ppp">该线上活动不需要报名，请牢记活动信息，及时到场参加。如有疑问可咨询举办方</p>
        <p class="infoLine">
          <i class="iconfont icon-dingwei"></i>
          <span>{{acDetails.activityAddress}}</span>
        </p>
        <p class="infoLine">
          <i class="iconfont icon-shijian"></i>
          <span>{{acDetails.activityTime}}</span>
        </p>
        <p class="infoLine">
          <i class="iconfont icon-shouji"></i>
          <span>18512341234</span>
        </p>
        <p
          class="btn"
          :class="likeAct?'btnH':''"
          @click.stop="likeFun(acDetails.id)"
        >{{likeAct ? '取消关注' : '关注活动'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  activityDetailsGet,
  isLikeActivity,
  activitysFollow,
  activitysFollowNo
} from "@/api/activity";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      tel:'18570373920',
      acDetails: {},
      likeAct: false,
      joinMaskShow: false,
      actImg: `${this.$store.state.imgUrlHttp}/d1.png`,
      actContImg: `${this.$store.state.imgUrlHttp}/dc1.png`
    };
  },
  onLoad(options) {
    activityDetailsGet(options.activityId).then(res => {
      if (res.status == 200) {
        var resData = res.result;
        if (resData.content !== "") {
          resData.content = resData.content.split(";");
        }
        this.acDetails = resData;
      }
    });
    isLikeActivity(options.activityId).then(res => {
      if (res.status == 200) {
        this.likeAct = res.result;
      }
    });
  },
  methods: {
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: this.tel //仅为示例，并非真实的电话号码
      });
    },
    joinMaskToggle() {
      this.joinMaskShow = !this.joinMaskShow;
    },
    likeFun(id) {
      var _this = this;
      if (_this.likeAct) {
        activitysFollowNo(id).then(res => {
          if (res.status == 200) {
            _this.likeAct = false;
            wx.showToast({
              title: "取消关注",
              icon: "none",
              duration: 1500
            });
          }
        });
      } else {
        activitysFollow(id).then(res => {
          if (res.status == 200) {
            _this.likeAct = true;
            wx.showToast({
              title: "关注成功",
              icon: "none",
              duration: 1500
            });
          }
        });
      }
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: "这是分享标题",
      // path: `/pages/topicDetails/main?topic_id=${id}`,
      path: `/pages/topicDetails/main?topic_id=6`,
      imageUrl: `${this.$store.state.imgUrlHttp}/a6.png`
    };
  }
};
</script>

<style lang="less" scoped>
.activityDetails {
  padding-bottom: 60px;
  .infoLine {
    i {
      display: inline-block;
      vertical-align: middle;
      color: #707070;
      font-size: 14px;
    }
    span {
      vertical-align: middle;
      margin-left: 5px;
      color: #8e8e8e;
      font-size: 14px;
    }
  }
  .imgB {
    height: 175px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    .title {
      font-size: 16px;
      color: #111;
      font-weight: 600;
      line-height: 20px;
      text-align: justify;
      margin-bottom: 8px;
    }
    .price {
      color: #b1a1a3;
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 8px;
    }
    .contentCont {
      margin: 10px 0;
      .pp {
        color: #232323;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding-left: 5px;
        border-left: 2px solid #b1a1a3;
        margin-bottom: 10px;
      }
      .details {
        margin-bottom: 20px;
        font-size: 12px;
        color: #5e5e5e;
        img {
          width: 100%;
          margin: 5px 0;
        }
      }
      .needKnow {
        margin-bottom: 20px;
        font-size: 12px;
        color: #5e5e5e;
      }
    }
  }
  // 底部
  .footerBox {
    position: fixed;
    z-index: 2;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    line-height: 30px;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    text-align: center;
    i {
      display: inline-block;
      font-size: 20px;
      color: #707070;
      vertical-align: middle;
      margin-right: 4px;
    }
    .join {
      width: 25%;
      vertical-align: middle;
      border-left: 1px solid #e0e0e0;
      span {
        font-size: 14px;
      }
    }
    .other {
      width: 75%;
      display: flex;
      justify-content: space-around;
      text-align: center;
      p {
        span {
          font-size: 14px;
          vertical-align: middle;
          color: #393939;
        }
      }
      .share {
        vertical-align: middle;
        line-height: 30px;
        background-color: transparent;
        border-radius: 0;
        padding: 0;
        margin: 0;
        &::after {
          border: none;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }

  .shadow {
    width: 100%;
    height: 100%;
    z-index: 5;
    position: absolute;
    top: 0;
    background-color: #000;
    opacity: 0.5;
  }
  .joinMask {
    height: 237px;
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 6;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 16px;
    }
    .topTitle {
      border-bottom: 1px solid #e2e2e2;
      height: 49px;
      width: 100%;
      line-height: 50px;
      font-size: 14px;
      color: #393939;
      text-align: center;
    }
    .cont {
      width: 90%;
      margin: 0 auto;
      padding: 10px;
      .ppp {
        color: #393939;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .btn {
        background-color: #b1a1a3;
        color: #fff;
        font-size: 14px;
        position: absolute;
        left: 20%;
        bottom: 10px;
        width: 60%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        letter-spacing: 2px;
        border-radius: 5px;
        &.btnH {
          background-color: #ccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
