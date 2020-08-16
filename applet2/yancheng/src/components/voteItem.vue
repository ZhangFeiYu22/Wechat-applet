<template>
  <div class="vote">
    <div class="noDataStyle" v-if="voteLists.length == 0">暂无数据</div>
    <!-- 内容列表 -->
    <div v-else class="contentList">
      <div class="contentItem" v-for="(voteItem,index) in voteLists" :key="index" @click.stop="goVoteDetail(voteItem.id)">
        <div class="headName" v-if="headShow">
          <div class="headImg" @click.stop="goPersonal(voteItem.createId)">
            <img :src="voteItem.avatar" mode="aspectFill" />
          </div>
          <div class="nameTime" @click.stop="goPersonal(voteItem.createId)">
            <p class="name">{{voteItem.nickName}}</p>
          </div>
        </div>
        <div
          class="content"
          id="contentInfo"
          :class="voteItem.showEllip ? 'ellip' : ''"
        >{{voteItem.content}}</div>
        <div v-if="voteItem.showEllip" class="toggleBox">
          <div class="more_txt" @click.stop="requireTxt(index)">
            <span>{{voteItem.showEllip ? '展开' : '收起'}}</span>
          </div>
        </div>

        <div
          class="imgsList"
          v-if="voteItem.images!== undefined && voteItem.images!== null && voteItem.images .length>0"
        >
          <div
            class="imgsItem"
            v-for="(picItem,picIndex) in voteItem.images"
            :key="picIndex"
            @click.stop="showImg(index,picIndex)"
          >
            <img :src="picItem" mode="aspectFill" />
          </div>
        </div>
        <div class="imgsList" v-else></div>
        <div class="selectBox">
          <div
            class="selList"
            v-for="(litem,lindex) in voteItem.options"
            :key="lindex"
            color="#1097FF"
            @click.stop="selectOne(voteItem,litem,index)"
          >
            <div
              v-if="voteItem.myAnswer && voteItem.myAnswer.answer && (voteItem.myAnswer.answer == litem.optionsContent)"
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
          <div class="time">{{voteItem.createTime}}</div>
          <div class="joinNum">
            <span>{{voteItem.answerCount}}</span>人参与投票
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { voteListSel } from "../api/vote";
export default {
  props: ["headShow", "voteLists"],
  data() {
    return {
      maskVal: false
    };
  },
  methods: {
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
  }
};
</script>

<style lang="less" scoped>
.vote {
  padding-bottom: 30px;
  .contentList {
    width: 94%;
    margin: 0px auto 10px;
    box-shadow: 0 0 2px 2px #eee;
    padding-top: 15px;
    border-radius: 5px;
    // 内容列表
    .contentItem {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 20px;
      margin-bottom: 20px;
      padding: 0 3% 20px;
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
  }
  .noDataStyle {
    text-align: center;
    color: #bbb;
  }
}
</style>
