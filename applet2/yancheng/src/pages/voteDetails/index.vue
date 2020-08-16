<template>
  <div class="voteDetailsStyle">
    <navigation-bar :title="'投票详情'" :navBackgroundColor="'#fff'" :back-visible="true" :home-visible="homeVisible"></navigation-bar>
    <div class="contentItem">
      <div class="headName">
        <div class="headImg" @click.stop="goPersonal(voteDetailsData.createId)">
          <img v-if="voteDetailsData.avatar" :src="voteDetailsData.avatar" mode="aspectFill" />
        </div>
        <div class="nameTime" @click.stop="goPersonal(voteDetailsData.createId)">
          <p class="name">{{voteDetailsData.nickName}}</p>
        </div>
      </div>
      <div
        class="content"
        id="contentInfo"
        :class="voteDetailsData.showEllip ? 'ellip' : ''"
      >{{voteDetailsData.content}}</div>
      <div v-if="voteDetailsData.showEllip" class="toggleBox">
        <div class="more_txt" @click.stop="requireTxt(index)">
          <span>{{voteDetailsData.showEllip ? '展开' : '收起'}}</span>
        </div>
      </div>

      <div
        class="imgsList"
        v-if="voteDetailsData.images!== undefined && voteDetailsData.images!== null && voteDetailsData.images .length>0"
      >
        <div
          class="imgsItem"
          v-for="(picItem,picIndex) in voteDetailsData.images"
          :key="picIndex"
          @click.stop="showImg(index,picIndex)"
        >
          <img v-if="picItem" :src="picItem" mode="aspectFill" />
        </div>
      </div>
      <div class="imgsList" v-else></div>
      <div class="selectBox">
        <div
          class="selList"
          v-for="(litem,lindex) in voteDetailsData.options"
          :key="lindex"
          color="#1097FF"
          @click.stop="selectOne(voteDetailsData,litem,index)"
        >
          <div
            v-if="voteDetailsData.myAnswer && voteDetailsData.myAnswer.answer && (voteDetailsData.myAnswer.answer == litem.optionsContent)"
            class="act"
          >
            <i class="sel"></i>
            <p class="miaosu">{{litem.optionsContent}}</p>
          </div>
          <div v-else class="noAct">
            <i class="sel"></i>
            <p class="miaosu">{{litem.optionsContent}}</p>
          </div>
          <!-- <p class="bili">100%</p> -->
        </div>
      </div>

      <div class="timeHandle">
        <div class="time">{{voteDetailsData.createTime}}</div>
        <div class="joinNum">
          <span>{{voteDetailsData.answerCount}}</span>人参与投票
        </div>
      </div>
    </div>
    <div class="footerBox">
      <button class="share" open-type="share">
        <i class="iconfont icon-fenxiang"></i>
        <span>分享</span>
      </button>
    </div>
  </div>
</template>

<script>
import { voteDetailsGet } from "@/api/vote";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      homeVisible: false,
      tel: "18570373920",
      voteDetailsData: {},
      likeAct: false,
    };
  },
  onShow() {
    // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    let getOptions = currentPage.options;
    if(getOptions.isShareId == '1'){
      this.homeVisible = true;
    }else{
      this.homeVisible = false;
    }
    this.fetchVoteDetail(getOptions.voteId);
    this.globalData.homeShowNum = null;   // 全局激活的nav为空，防止详情返回的时候加载会导致页面数据重复
  },
  methods: {
    fetchVoteDetail(aid) {
      voteDetailsGet(aid).then((res) => {
        if (res.status == 200) {
          var resData = res.result;
          if (resData.options) {
            resData.options = JSON.parse(resData.options);
          }
          if (resData.images) {
            resData.images = resData.images.split("|");
          }
          console.log(resData)
          this.voteDetailsData = resData;
        }
      });
    },
    requireTxt(index) {
      let val = this.voteLists[index].showEllip;
      if (val) {
        this.voteLists[index].showEllip = false;
      } else {
        this.voteLists[index].showEllip = true;
      }
    },
    goVoteDetail(vid) {
      if (wx.getStorageSync("isLogin")) {
        wx.navigateTo({
          url: `/pages/voteDetails/main?voteId=${vid}`,
        });
      } else {
        wx.showToast({
          title: "您还未登录，请先登录",
          icon: "none",
          duration: 1000,
          success(data) {
            setTimeout(function () {
              wx.navigateTo({
                url: "/pages/login/main",
              });
            }, 1000);
          },
        });
      }
    },
    goPersonal(id) {
      if (wx.getStorageSync("isLogin")) {
        wx.navigateTo({
          url: `/pages/personal/main?createrId=${id}`
        });
      } else {
        wx.showToast({
          title: "您还未登录，请先登录",
          icon: "none",
          duration: 1000,
          success(data) {
            setTimeout(function () {
              wx.navigateTo({
                url: "/pages/login/main",
              });
            }, 1000);
          },
        });
      }
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.voteLists[outIdx].images;
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    selectOne(vItem, item, vin) {
      var _this = this;
      if (wx.getStorageSync("isLogin")) {
        let authInfo = wx.getStorageSync("authInfo");
      if (vItem.myAnswer && vItem.myAnswer.answer) {
        wx.showToast({
          title: "您已参与，请勿重复投票",
          icon: "none",
          duration: 1500
        });
      } else {
        wx.showModal({
          title: "提示",
          content: "是否确定投票？",
          success(res) {
            if (res.confirm) {
              let answerForm = {
                answer: item.optionsContent,
                createId: vItem.createId,
                memberId: authInfo.id,
                voteId: vItem.id
              };
              wx.showLoading({
                  title: "投票中...",
                });
              voteListSel(answerForm).then(res => {
                if (res.status == 200) {
                  _this.$nextTick(() => {
                    _this.voteLists[vin]["myAnswer"] = {
                      answer: item.optionsContent
                    };
                  });
                  if(_this.voteLists[vin]["myAnswer"]){
                    wx.showToast({
                      title: "投票成功",
                      icon: "none",
                      duration: 1500,
                      success:function(){ 
                        setTimeout(function () { 
                            wx.hideLoading();
                        }, 1500) 
                      }
                    });
                  }
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
      } else {
        wx.showToast({
          title: "您还未登录，请先登录",
          icon: "none",
          duration: 1000,
          success(data) {
            setTimeout(function () {
              wx.navigateTo({
                url: "/pages/login/main",
              });
            }, 1000);
          },
        });
      }
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: this.voteDetailsData.content,
      path: `/pages/voteDetails/main?voteId=${this.voteDetailsData.id}&isShareId=1`
    };
  },
};
</script>

<style lang="less" scoped>
.voteDetailsStyle {
  padding-bottom: 30px;
  // 内容列表
  .contentItem {
    padding: 20px 3%;
    .headName {
      display: flex;
      margin-bottom: 10px;
      .headImg {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nameTime {
        // flex: 1;
        p {
          &.name {
            font-size: 16px;
            line-height: 35px;
            color: #403f3f;
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
        margin-right: 1%;
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
      .time {
        color: #7e7e7e;
        font-size: 12px;
        span {
          margin-left: 4px;
        }
      }
      .joinNum {
        color: #343434;
        font-size: 12px;
        span {
          margin-left: 4px;
        }
      }
    }
    .selectBox {
      .selList {
        margin-bottom: 10px;
        i {
          width: 12px;
          height: 12px;
          border-radius: 20px;
          border: 1px solid #1097ff;
          margin-right: 10px;
        }
        .miaosu {
          flex: 1;
          font-size: 12px;
          color: #b4b4b4;
          line-height: 26px;
          border-bottom: 1px solid #b4b4b4;
        }
        .bili {
          width: 35px;
          font-size: 12px;
          color: #737373;
        }
        .noAct {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .act {
          display: flex;
          justify-content: space-between;
          align-items: center;
          i {
            position: relative;
            background-color: #1097ff;
            &:after {
              position: absolute;
              top: 0px;
              left: 3px;
              content: "";
              display: block;
              width: 3px;
              height: 8px;
              border-right: 1px solid #fff;
              border-bottom: 1px solid #fff;
              transform: rotate(45deg);
            }
          }
          .miaosu {
            color: #000;
            border-bottom: 1px solid #1097ff;
          }
        }
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
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .share {
      vertical-align: middle;
      line-height: 30px;
      background-color: transparent;
      border-top: 1px solid #e0e0e0;
      padding: 6px 0;
      border-radius: 0;
      width: 100%;
      margin: 0;
      &::after {
        border: none;
      }
      i {
        display: inline-block;
        font-size: 20px;
        color: #707070;
        vertical-align: middle;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
