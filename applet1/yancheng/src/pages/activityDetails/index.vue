<template>
  <div class="activityDetails">
    <div class="imgB">
      <img src="../../../static/images/aaa1.png" mode="aspectFill" />
    </div>
    <div class="content w94">
      <h5 class="title">这个是活动的标题,可以展示两行，两行展示两行展示两行</h5>
      <p class="price">免费</p>
      <p class="infoLine">
        <i class="iconfont icon-dingwei"></i>
        <span>江苏省南京市秦淮区</span>
      </p>
      <p class="infoLine">
        <i class="iconfont icon-shijian"></i>
        <span>2019.12.12-12.21</span>
      </p>
      <p class="infoLine">
        <i class="iconfont icon-shouji"></i>
        <span>18512341234</span>
      </p>
      <div class="contentCont">
        <p class="pp">活动详情</p>
        <div class="details">这个是活动详情,富文本编辑过来，有图片有文字</div>
        <p class="pp">活动须知</p>
        <div class="needKnow">
          <p>1. 这里是活动须知</p>
          <p>1. 这里是活动须知</p>
          <p>1. 这里是活动须知</p>
        </div>
      </div>
    </div>

    <div class="footerBox">
      <div class="other">
        <p @click.stop="likeFun">
          <i class="iconfont icon-aixin" :class="likeAct?'icon-aixin1':'icon-aixin0'"></i>
          <span>喜欢</span>
        </p>
        <!-- <p>
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </p>-->
        <button class="share" open-type="share">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </button>
        <p>
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
      <i class="iconfont icon-iconless close" @click="joinMaskToggle"></i>
      <p class="topTitle">参与方式</p>
      <div class="cont">
        <p class="ppp">该线上活动不需要报名，请牢记活动信息，及时到场参加。如有疑问可咨询举办方</p>
        <p class="infoLine">
          <i class="iconfont icon-dingwei"></i>
          <span>江苏省南京市秦淮区</span>
        </p>
        <p class="infoLine">
          <i class="iconfont icon-shijian"></i>
          <span>2019.12.12-12.21</span>
        </p>
        <p class="infoLine">
          <i class="iconfont icon-shouji"></i>
          <span>18512341234</span>
        </p>
        <p class="btn">关注活动</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeAct: false,
      joinMaskShow: false
    };
  },
  methods: {
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    joinMaskToggle() {
      this.joinMaskShow = !this.joinMaskShow;
    },
    likeFun() {
      this.likeAct = !this.likeAct;
      if (this.likeAct) {
        wx.showToast({
          title: "关注成功",
          icon: "none",
          duration: 1500
        });
      } else {
        wx.showToast({
          title: "取消关注",
          icon: "none",
          duration: 1500
        });
      }
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: "分享标题",
      // path: `/pages/topicDetails/main?topic_id=${id}`,
      path: `/pages/topicDetails/main?topic_id=6`,
      imageUrl: "https://www.vue-js.com//public/images/vue.png"
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
      }
    }
  }
}
</style>
