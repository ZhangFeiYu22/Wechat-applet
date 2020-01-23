<template>
  <scroll-view class="scrollView" scroll-y="true" :style="{'height': ktxScreentHeight}">
    <div class="release">
      <!-- <text bindtap="saveEditOrNot">取消</text> -->
      <div class="edit-main">
        <textarea
          class="edit-text"
          placeholder="写下此刻的心声吧..."
          placeholder-style="color:#dcdcdc"
          @input="getInputValue"
        ></textarea>
        <div class="edit-img">
          <div v-for="(item,index) in imgArr" :key="index">
            <image :src="item" mode="aspectFill" />
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImage"></div>
        </div>
      </div>
      <div class="edit-footer">
        <div class="footer-row" @click="selectHC">
          <p class="rowI left">
            <i class="iconfont icon-fabu"></i>
            <span>发布栏目</span>
          </p>
          <p class="rowI right">
            <span>{{hcName}}</span>
            <i class="iconfont icon-right"></i>
          </p>
        </div>
        <!-- <div class="footer-row" @click="selectC" v-if="communityShow">
          <p class="rowI left">
            <i class="iconfont icon-lanmu"></i>
            <span>频道与话题</span>
          </p>
          <p class="rowI right">
            <span>{{cName}}</span>
            <i class="iconfont icon-right"></i>
          </p>
        </div>
        <div class="footer-row" v-else>
          <p class="rowI left no">
            <i class="iconfont icon-lanmu no"></i>
            <span class="no">频道与话题</span>
          </p>
          <p class="rowI right no">
            <i class="iconfont icon-right no"></i>
          </p>
        </div> -->
      </div>

      <cover-view  class="publishBtn" @click="postData">发布</cover-view >

      <div class="mask" v-if="maskShow">
        <h5>选择栏目</h5>
        <div class="hc home" @click="selectHome">
          <i class="iconfont icon-huangguan"></i>
          <p>首页话题栏目</p>
        </div>
        <div class="hc community" @click="selectCommunity">
          <i class="iconfont icon-faxian"></i>
          <p>社区状态栏目</p>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      ktxScreentHeight: '',
      textareaTxt: null,
      imgArr: null,
      location: null,
      maskShow: false,
      hcName: "首页", //选择是首页还是社区
      cName: "", //选择社区的时候  选择什么栏目
      kinds: [
        {
          kindName: "情绪",
          kindList: [
            { name: "恋爱" },
            { name: "吐槽" },
            { name: "秘密" },
            { name: "开心" },
            { name: "兴奋" }
          ]
        },
        {
          kindName: "社交",
          kindList: [
            { name: "恋爱" },
            { name: "吐槽" },
            { name: "秘密" },
            { name: "开心" },
            { name: "兴奋" }
          ]
        },
        {
          kindName: "爱好",
          kindList: [
            { name: "恋爱" },
            { name: "吐槽" },
            { name: "秘密" },
            { name: "开心" },
            { name: "兴奋" }
          ]
        },
        {
          kindName: "生活",
          kindList: [
            { name: "恋爱" },
            { name: "吐槽" },
            { name: "秘密" },
            { name: "开心" },
            { name: "兴奋" }
          ]
        }
      ]
    };
  },
  computed: {
    communityShow() {
      if (this.hcName == "首页") {
        return false;
      } else if (this.hcName == "社区") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted () {
    this.hcName = "首页";
    let systemInfo = wx.getSystemInfoSync();
    this.ktxScreentHeight = systemInfo.windowHeight * 0.98 + 'px';
  },
  methods: {
    // saveEditOrNot() {
    //   wx.showModal({
    //     title: "将此次编辑保留",
    //     content: "",
    //     cancelText: "不保留",
    //     confirmText: "保留",
    //     success(res) {
    //       if (res.confirm) {
    //         console.log("用户点击确定");
    //       } else if (res.cancel) {
    //         wx.navigateBack({
    //           delta: 1
    //         });
    //       }
    //     }
    //   });
    // },
    selectHC() {
      this.maskShow = true;
    },
    selectHome() {
      this.hcName = "首页";
      this.maskShow = false;
    },
    selectCommunity() {
      this.hcName = "社区";
      this.maskShow = false;
    },
    getInputValue(e) {
      this.textareaTxt = e.detail.value;
    },
    chooseImage() {
      let self = this;
      wx.chooseImage({
        count: 9,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          self.imgArr = res.tempFilePaths;
        }
      });
    },
    postData() {
      // wx.navigateBack({
      //   delta: 1
      // });
      // wx.request({
      //   url: app.globalData.baseUrl + "api",
      //   method: "POST",
      //   data: {
      //     avatarUrl: app.globalData.userInfo.avatarUrl,
      //     nickName: app.globalData.userInfo.nickName,
      //     textareaTxt: this.data.textareaTxt,
      //     imgArr: this.data.imgArr,
      //     location: this.data.location
      //   },
      //   header: {
      //     "content-type": "application/x-www-form-urlencoded"
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.scrollView {
  overflow: hidden;
}
.release {
  // position: fixed;
  width: 94%;
  height: 94%;
  // top: 2%;
  // left: 3%;
  margin: 3%;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px #eee;
  padding: 15px;
  .edit-main {
    .edit-text {
      height: 104px;
      padding: 2px 0;
      overflow-y: scroll;
      font-size: 14px;
      line-height: 20px;
      color: #353535;
    }
    .edit-img {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-between;
      image {
        width: 90px;
        height: 90px;
        margin: 0 15px 5px 0;
      }
      .icon-jiahao {
        width: 90px;
        height: 90px;
        border: 1px solid #707070;
        font-size: 30px;
        color: #888;
        line-height: 90px;
        text-align: center;
      }
    }
  }

  .edit-footer {
    margin-top: 20px;
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      font-size: 14px;
      .rowI {
        i {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        span {
          vertical-align: middle;
          color: #1e1e1e;
          &.no {
            color: #c5c5c5;
          }
        }
        &.left {
          i {
            font-size: 18px;
            color: #1e1e1e;
            &.no {
              color: #c5c5c5;
            }
          }
        }
        &.right {
          i {
            font-size: 13px;
            color: #707070;
            margin-right: 0;
            margin-left: 5px;
            &.no {
              color: #c5c5c5;
            }
          }
        }
      }
    }
  }
  .publishBtn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    width: 120px;
    text-align: center;
    margin-left: -60px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    border-radius: 32px;
    background-color: #b1a1a3;
    color: #fff;
  }
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.65);
    text-align: center;
    h5 {
      top: 10%;
      color: #fff;
      font-size: 20px;
      margin-top: 20%;
    }
    .hc {
      i {
        display: inline-block;
        color: #fff;
        width: 60px;
        height: 60px;
        line-height: 57px;
        border-radius: 60px;
        font-size: 50px;
        margin-top: 15%;
      }
      p {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
      }
      &.home {
        i {
          background-color: #fee08d;
        }
      }
      &.community {
        i {
          background-color: #8ddffe;
        }
      }
    }
  }
}
</style>
