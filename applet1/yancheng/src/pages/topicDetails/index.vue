<template>
  <div class="topicDetails" @click.stop="hideInputFun" @touchmove="hideInputFun">
    <!-- 内容列表 -->
    <div class="contentItem w94">
      <div class="headName" @click="goPersonal">
        <div class="headImg">
          <img :src="headImg" mode="aspectFill" />
        </div>
        <div class="nameTime">
          <p class="name">张小凡</p>
          <p class="time">2019.12.12 12:12</p>
        </div>
      </div>
      <div class="content" id="contentInfo" :class="isToggle ?'ellip': ''">{{details.content}}</div>
      <div v-if="isToggle" class="toggleBox">
        <div class="more_txt" @click="requireTxt">
          <span>{{isToggle ? '展开' : '收起'}}</span>
        </div>
      </div>
      <!-- 图片展示 -->
      <div class="imgsList">
        <div
          class="imgsItem"
          v-for="(picItem,picIndex) in details.picList"
          :key="picIndex"
          @click.stop="showImg(picIndex)"
        >
          <img :src="picItem" mode="aspectFill" />
        </div>
      </div>
      <div class="timeHandle">
        <div class="reviewNum">
          评论
          <span>6</span>
        </div>
        <div class="likeNum">
          喜欢
          <span>5</span>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="reviceList w94">
      <div class="reviceItem">
        <div class="leftHead">
          <img :src="headImg1" mode="aspectFill" />
        </div>
        <div class="rightCont">
          <h5 class="name">张小凡</h5>
          <ul class="reviceCont">
            <li>
              <div class="cont">这是一段评论，评论</div>
              <div class="handle">
                <p>10分钟</p>
                <p @click.stop="showPinLunFun">回复</p>
                <p>私聊</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="reviceItem">
        <div class="leftHead" @click="goPersonal">
          <img :src="headImg2" mode="aspectFill" />
        </div>
        <div class="rightCont">
          <h5 class="name">张小凡</h5>
          <ul class="reviceCont">
            <li>
              <div class="cont">这是一段评论，评论</div>
              <div class="handle">
                <p>10分钟</p>
                <p @click.stop="showPinLunFun">回复</p>
                <p>私聊</p>
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
        <p @click.stop="likeFun">
          <i class="iconfont icon-aixin" :class="likeAct?'icon-aixin1':'icon-aixin0'"></i>
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
        <img :src="headImg" mode="aspectFill" />
        <span>张小凡</span>
      </div>
      <div class="textaCont">
        <textarea
          class="textA"
          auto-focus
          placeholder="请留下你想说的话，将发送到对方的消息中心"
          :value="sixinValue"
          @input="getSixin"
          placeholder-style="color:#b8b8b8"
        ></textarea>
        <span class="numSpan">限100字</span>
      </div>
      <button class="contBtn" @click="conBtnPut">发送</button>
    </div>

    <div v-if="showPinLun" class="pinlunB">
      <form report-submit="true" @submit="submitComment">
        <view class="liuyan">
          <input
            class="input"
            auto-focus
            cursor-spacing="32rpx"
            :value="commentValue"
            @input="getcomment"
            :placeholder="placeholderPL"
          />
          <button class="btnPut" form-type="submit">发送</button>
        </view>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskVal: false,
      isToggle: false, //是否超过2行？true--超过，false--没有超过
      likeAct: false,
      sixinValue: "", //私信内容
      commentValue: "", //评论内容
      showPinLun: false, //是否显示评论
      placeholderPL: "评论", //评论默认显示的字
      headImg: `${this.$store.state.imgUrlHttp}/head.png`,
      headImg1: `${this.$store.state.imgUrlHttp}/a6.png`,
      headImg2: `${this.$store.state.imgUrlHttp}/a1.png`,
      details: {
        showEllip: false,
        content:
          "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨，淅淅沥沥的春雨就飘然而至，莺飞草长，一泓碧水粼粼而起，杨柳拂堤，碧草如丝，繁花似锦，飞泉鸣溅，古寺的梵音在石缝间流淌，雨后的空气溢出清新的芳香。而后是杏花雨，梨花雨，暮春过后，连绵不断的黄梅雨又弥漫江南。夜晚的雨声，清晨的花香，清绝的令人深深沉醉，秀雅的让人不舍离去。纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵",
        picList: [
          `${this.$store.state.imgUrlHttp}/a1.png`,
          `${this.$store.state.imgUrlHttp}/a2.png`,
          `${this.$store.state.imgUrlHttp}/a3.png`,
          `${this.$store.state.imgUrlHttp}/a4.png`,
          `${this.$store.state.imgUrlHttp}/a5.png`,
          `${this.$store.state.imgUrlHttp}/a6.png`
        ]
      }
    };
  },
  mounted() {
    if (this.details.content.length > 110) {
      this.isToggle = true;
    } else {
      this.isToggle = false;
    }
  },
  methods: {
    requireTxt() {
      this.isToggle = !this.isToggle;
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
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    openMask() {
      this.maskVal = true;
    },
    closeMask() {
      this.maskVal = false;
    },
    showPinLunFun() {
      this.showZanAndPinglunNum = null;
      (this.placeholderPL = "留言: " + "飞鱼"), (this.showPinLun = true);
    },
    getSixin(e) {
      this.sixinValue = e.target.value;
    },
    conBtnPut(){
      this.maskVal = false;
       wx.showToast({
        title: "发送成功",
        duration: 2000 //停留时间
      });
    },
    //点选和评论的隐藏通过事件委托到全页面(暂时只实现当条朋友所在区域,全页面和滚动时也隐藏在考虑实现)
    hideInputFun() {
      this.showPinLun = false;
    },
    getcomment(e) {
      this.commentValue = e.target.value;
    },
    submitComment(e) {
      // wx.showToast({
      //   title: '评论功能暂未开放',
      //   icon: 'none'
      // })
      // return

      // if (!this.data.userInfo) {
      //   wx.pageScrollTo({
      //     scrollTop: 200,
      //   })
      //   wx.showToast({
      //     title: '需要授权才能点赞评论,见第一条墙消息.',
      //     icon: 'none',
      //     duration: 5000
      //   })
      //   return
      // }
      if (this.commentValue.length <= 0) {
        wx.showToast({
          title: "内容为空",
          icon: "none"
        });
        return;
      }
      // var _id = this.data.wallData[this.data.showZan]._id
      // var formId = e.detail.formId
      // var toName = ""
      // if (this.data.placeholderPL.includes("回复")) {
      //   toName = this.data.placeholderPL.replace("回复:", "")
      //   console.log(toName)
      // }

      // wx.cloud.callFunction({
      //   name: 'chat',
      //   data: {
      //     type: 'comment',
      //     collectionname: 'circle',
      //     data: {
      //       username: this.data.userInfo.nickName,
      //       userInfo: this.data.userInfo,
      //       formId: formId,
      //       _id: _id,
      //       comment: this.data.commentValue,
      //       toName: toName
      //     }
      //   }
      // }).then(res => {
      //   console.log(res)

      //   //更新这条数据
      //   const db = wx.cloud.database()
      //   db.collection("circle").doc(_id).get().then(
      //     res => {
      //       console.log(res.data)
      //       var data = this.data.wallData
      //       console.log(data)
      //       console.log(e.currentTarget.dataset.indexn)
      //       data[this.data.showZan] = res.data

      //       for (let i = 0; i < data.length; i++) {
      //         data[i].time = this.parseTime(data[i].createTime.getTime())
      //         data[i].zanText = data[i].zans.map(a => {
      //           return a.name
      //         }).join(", ")
      //       }
      //       this.setData({
      //         wallData: data,
      //         showZan: -1,
      //         placeholderPL: "留言",
      //         showPinLun: false,
      //         commentValue: ""
      //       })
      //     }
      //   )
      // })
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
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 10px;
      .imgsItem {
        width: 32%;
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
              width: 60%;
              display: flex;
              p {
                width: 25%;
                line-height: 24px;
                font-size: 10px;
                color: #b1a1a3;
                &:first-child {
                  width: 40%;
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
      .numSpan{
        position: absolute;
        display: block;
        right: 10px;
        bottom: 5px;
        color: #B7B7B7;
        font-size: 15px;
      }
    }
    .contBtn{
      background-color: #B1A1A3;
      color: #fff;
      width: 110px;
      height: 26px;
      line-height: 26px;
      margin: 10px auto 0;
      font-size: 15px;
      &::after{
        border: none;
      }
    }
  }
  // 评论框
  .pinlunB {
    .liuyan {
      display: flex;
      background: #fafafa;
      border-top: 1px solid #ddd;
      width: 100%;
      bottom: 0;
      position: fixed;
      z-index: 4;
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
