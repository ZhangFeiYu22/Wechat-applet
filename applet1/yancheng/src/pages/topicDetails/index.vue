<template>
  <div class="topicDetails" @touchmove="hideInputFun">
    <navigation-bar :title="'话题详情'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <!-- 内容列表 -->
    <div class="contentItem w94">
      <div class="headName" @click="goPersonal">
        <div class="headImg">
          <img v-if="details.createrAvatar" :src="details.createrAvatar" mode="aspectFill" />
        </div>
        <div class="nameTime">
          <p class="name">{{details.createrName}}</p>
          <p class="time">{{details.createTime}}</p>
        </div>
      </div>
      <div
        class="content"
        id="contentInfo"
        :class="details.showEllip ?'ellip': ''"
      >{{details.content}}</div>
      <div v-if="details.showEllip" class="toggleBox">
        <div class="more_txt" @click="requireTxt">
          <span>{{details.showEllip ? '展开' : '收起'}}</span>
        </div>
      </div>
      <!-- 图片展示 -->
      <div class="imgsList">
        <div
          class="imgsItem"
          v-for="(picItem,picIndex) in details.images"
          :key="picIndex"
          @click.stop="showImg(picIndex)"
        >
          <img v-if="picItem" :src="picItem" mode="aspectFill" />
        </div>
      </div>
      <div class="timeHandle">
        <div class="reviewNum">
          评论
          <span>{{details.commentNum}}</span>
        </div>
        <div class="likeNum">
          喜欢
          <span>{{details.likeNum}}</span>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="reviceList w94" v-if="details.properties">
      <div
        class="reviceItem"
        v-for="comItem in details.properties.forumCommentList"
        :key="comItem.id"
      >
        <div class="leftHead">
          <img v-if="comItem.memberAvatar" :src="comItem.memberAvatar" mode="aspectFill" />
        </div>
        <div class="rightCont">
          <h5 class="name">{{comItem.replyName ? comItem.replyName : comItem.memberName}}</h5>
          <ul class="reviceCont">
            <li>
              <div
                class="cont"
                v-if="comItem.replyName"
              >回复&nbsp;&nbsp;{{comItem.memberName}}：{{comItem.comment}}</div>
              <div class="cont" v-else>{{comItem.comment}}</div>
              <div class="handle">
                <p>{{comItem.createTime}}</p>
                <p @click.stop="backPinLunFun(comItem)">回复</p>
                <p></p>
                <!-- <p>私聊</p> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footerBox">
      <button class="share" open-type="share">
        <i class="iconfont icon-fenxiang"></i>
        <span>分享</span>
      </button>
      <div class="other">
        <p @click.stop="likeFun(details.isLike, details.id)">
          <i class="iconfont" :class="details.isLike == 1 ?'icon-aixin1':'icon-aixin0'"></i>
          <span>喜欢</span>
        </p>
        <p @click.stop="showPinLunFun">
          <i class="iconfont icon-pinglun"></i>
          <span>评论</span>
        </p>
        <p @click.stop="openMask">
          <i class="iconfont icon-sixin"></i>
          <span>私信</span>
        </p>
      </div>
    </div>
    <div class="mask" @click.stop="closeMask" v-if="maskVal"></div>
    <div class="maskCont" v-if="maskVal">
      <div class="title">
        <img v-if="details.createrAvatar" :src="details.createrAvatar" mode="aspectFill" />
        <span>{{details.createrName}}</span>
      </div>
      <div class="textaCont">
        <textarea
          class="textA"
          auto-focus
          placeholder="请留下你想说的话，将发送到对方的消息中心"
          v-model="sixinValue"
          placeholder-style="color:#b8b8b8"
          maxlength="100"
        ></textarea>
        <span class="numSpan">限100字</span>
      </div>
      <button class="contBtn" @click="conBtnPut">发送</button>
    </div>

    <div class="pinglunMask" @click.stop="hideInputFun" v-if="showPinLun"></div>
    <div v-if="showPinLun" class="pinlunB">
      <view class="liuyan">
        <input
          class="input"
          auto-focus
          cursor-spacing="32rpx"
          v-model="commentContent"
          :placeholder="placeholderPL"
        />
        <button class="btnPut" @click="submitComment">发送</button>
      </view>
    </div>
  </div>
</template>

<script>
import {
  forumContentDetailsGet,
  forumLike,
  forumLikeNo,
  forumComment,
  messageTo
} from "@/api/home";
import { getDateDiff } from "@/utils/getDateDiff";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      maskVal: false,
      sixinValue: "", //私信内容
      commentValue: "", //评论内容
      showPinLun: false, //是否显示评论
      placeholderPL: "评论", //评论默认显示的字
      headImg1: `${this.$store.state.imgUrlHttp}/a6.png`,
      headImg2: `${this.$store.state.imgUrlHttp}/a1.png`,
      details: "",
      show_back: 1, //1位留言  2为回复
      comItemData: {}, //点击回复  存储评论人的信息
      commentContent: ""
    };
  },
  onLoad(options) {
    forumContentDetailsGet(options.forumContentId).then(res => {
      if (res.status == 200) {
        let resD = res.result;
        if (resD.images !== "") {
          resD.images = resD.images.split(";");
        }
        if (resD.content.length > 100) {
          resD["showEllip"] = true;
        } else {
          resD["showEllip"] = false;
        }
        this.details = resD;
        console.log(this.details);
      }
    });
  },
  methods: {
    requireTxt() {
      this.details.showEllip = !this.details.showEllip;
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(imgIndex) {
      let inIdx = imgIndex;
      let imgArr = this.details.picList;
      console.log(imgArr);
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    likeFun(isLike, id) {
      var _this = this;
      if (isLike == 2) {
        forumLike(id).then(res => {
          if (res.status == 200) {
            _this.details.isLike = 1;
            wx.showToast({
              title: "关注成功",
              icon: "none",
              duration: 1500
            });
          }
        });
      } else {
        forumLikeNo(id).then(res => {
          if (res.status == 200) {
            _this.details.isLike = 2;
            wx.showToast({
              title: "取消关注",
              icon: "none",
              duration: 1500
            });
          }
        });
      }
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    openMask() {
      this.sixinValue = "";
      this.maskVal = true;
    },
    closeMask() {
      this.maskVal = false;
    },
    showPinLunFun() {
      this.showZanAndPinglunNum = null;
      this.commentContent = "";
      this.placeholderPL = "留言: " + this.details.createrName;
      this.showPinLun = true;
      this.show_back = 1;
    },
    backPinLunFun(comItem) {
      this.showZanAndPinglunNum = null;
      this.commentContent = '';
      this.placeholderPL = "回复: " + comItem.memberName;
      this.showPinLun = true;
      this.show_back = 2;
      this.comItemData = comItem;
    },
    conBtnPut() {
      let data = {
        msg: this.sixinValue,
        recipient: this.details.createrId
      };
      messageTo(data).then(res => {
        if (res.status == 200) {
          this.maskVal = false;
          wx.showToast({
            title: "发送成功",
            duration: 2000 //停留时间
          });
        }
      });
    },
    //点选和评论的隐藏通过事件委托到全页面(暂时只实现当条朋友所在区域,全页面和滚动时也隐藏在考虑实现)
    hideInputFun() {
      this.showPinLun = false;
    },
    submitComment() {
      var _this = this;
      var data;
      if (this.commentContent.length <= 0) {
        wx.showToast({
          title: "内容为空",
          icon: "none"
        });
        return;
      }
      if (_this.show_back == 1) {
        data = {
          comment: _this.commentContent,
          forumId: _this.details.id
        };
      } else {
        data = {
          comment: _this.commentContent,
          forumId: _this.details.id,
          replyId: _this.comItemData.memberId,
          replyName: _this.comItemData.memberName
        };
      }
      forumComment(data).then(res => {
        if (res.status == 200) {
          wx.showToast({
            title: "发送成功",
            duration: 2000 //停留时间
          });
          _this.showPinLun = false;
          if (_this.show_back == 1) {
            data = {
              comment: res.result.comment,
              memberName: res.result.memberName,
              createTime: res.result.createTime
            };
          } else {
            data = {
              comment: res.result.comment,
              memberName: res.result.memberName,
              replyName: res.result.replyName,
              createTime: res.result.createTime
            };
          }
          _this.details.properties.forumCommentList.push(data); //成功，则丢进数组
        }
      });
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
.topicDetails {
  padding-bottom: 60px;
  // 内容列表
  .contentItem {
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 20px;
    .headName {
      display: flex;
      margin-bottom: 10px;
      .headImg {
        width: 46px;
        height: 46px;
        margin-right: 10px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nameTime {
        flex: 1;
        p {
          &.name {
            font-size: 16px;
            line-height: 26px;
            color: #403f3f;
          }
          &.time {
            font-size: 12px;
            line-height: 14px;
            color: #797979;
          }
        }
      }
    }
    .content {
      line-height: 20px;
      color: #6f6d6d;
      font-size: 16px;
      text-align: justify;
      &.ellip {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
    }
    .toggleBox {
      font-size: 16px;
      color: #6f6d6d;
      .more_txt {
        span {
          border-bottom: 1px solid #6f6d6d;
        }
      }
    }
    .imgsList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .imgsItem {
        width: 32%;
        margin-right: 1.3333%;
        height: 115px;
        margin-bottom: 5px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .timeHandle {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      align-items: center;
      font-size: 14px;
      .reviewNum {
        color: #333;
        span {
          margin-left: 4px;
        }
      }
      .likeNum {
        color: #ff6161;
        span {
          margin-left: 4px;
        }
      }
    }
  }
  // 评论
  .reviceList {
    .reviceItem {
      display: flex;
      margin-bottom: 15px;
      .leftHead {
        width: 28px;
        height: 28px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rightCont {
        flex: 1;
        margin-left: 10px;
        .name {
          color: #403f3f;
          font-size: 13px;
          line-height: 18px;
        }
        .reviceCont {
          li {
            // margin-bottom: 20px;
            .cont {
              font-size: 12px;
              color: #737373;
              line-height: 18px;
            }
            .handle {
              font-size: 10px;
              color: #737373;
              display: flex;
              width: 70%;
              p {
                width: 20%;
                line-height: 24px;
                font-size: 10px;
                color: #b1a1a3;
                &:first-child {
                  flex: 1;
                  color: #737373;
                }
              }
            }
          }
        }
      }
    }
  }
  // 底部
  .footerBox {
    position: fixed;
    z-index: 3;
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
      font-size: 24px;
      color: #707070;
      vertical-align: middle;
      margin-right: 4px;
    }
    .share {
      width: 25%;
      vertical-align: middle;
      border-right: 1px solid #e0e0e0;
      line-height: 30px;
      background-color: transparent;
      border-radius: 0;
      &::after {
        border: none;
      }
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
    }
  }
  // 私信弹窗
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .maskCont {
    position: absolute;
    z-index: 4;
    width: 80%;
    // height: 35%;
    background-color: #fff;
    padding: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .title {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      img {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        margin-right: 10px;
      }
    }
    .textaCont {
      background-color: #e8e8e8;
      height: 127px;
      padding: 10px;
      position: relative;
      .textA {
        font-size: 14px;
        width: 100%;
        height: 100%;
        text-align: justify;
        color: #333;
      }
      .numSpan {
        position: absolute;
        display: block;
        right: 10px;
        bottom: 5px;
        color: #b7b7b7;
        font-size: 15px;
      }
    }
    .contBtn {
      background-color: #b1a1a3;
      color: #fff;
      width: 110px;
      height: 26px;
      line-height: 26px;
      margin: 10px auto 0;
      font-size: 15px;
      &::after {
        border: none;
      }
    }
  }
  .pinglunMask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: rgba(0, 0, 0, 0.5);
    background-color: transparent;
    z-index: 2;
  }
  // 评论框
  .pinlunB {
    position: fixed;
    bottom: 0;
    z-index: 4;
    width: 100%;
    .liuyan {
      display: flex;
      background: #fafafa;
      border-top: 1px solid #ddd;
      height: 50px;
      justify-content: center;
      align-items: center;
      padding: 10px 5px;
      .input {
        background-color: #fff;
        flex: 1;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 10px;
      }
      .btnPut {
        font-size: 10px;
        width: 50px;
        background: #00c161;
        color: #fff;
        height: 40px;
        line-height: 40px;
        border-radius: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        &::after {
          border: none;
        }
      }
    }
  }
}
</style>
