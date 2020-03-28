<template>
  <scroll-view class="scrollView" scroll-y="true">
    <navigation-bar :title="'发布'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="release" :style="{'top': navBar_Height}">
      <!-- <text bindtap="saveEditOrNot">取消</text> -->
      <div class="edit-main">
        <textarea
          v-if="textStatus"
          class="edit-text edit-textShow"
          auto-focus
          @blur="bindblurTextStatus"
          v-model="cfpData.content"
        ></textarea>
        <div
          v-else
          class="edit-text edit-textNo"
          :style="{color: textNoColor}"
          @click="changeTextStatus"
        >{{realTextValue}}</div>
        <div class="edit-img">
          <div v-for="(item,index) in imgArr" :key="index">
            <image :src="item" mode="aspectFill" />
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImage"></div>
        </div>
      </div>

      <cover-view class="publishBtn" @click="postData">发布</cover-view>
    </div>
  </scroll-view>
</template>

<script>
import store from "@/store";
import {
  getOssParamsGet,
  communityFriendsPost,
  forumContentPost
} from "@/api/release";
import navigationBar from "@/components/navigationBar";
import { imgsUpload } from "@/utils/imgsUpload";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      publishType: 0,
      realTextValue: "写下此刻的心声吧...",
      textStatus: false,
      textNoColor: "#dcdcdc",
      navBar_Height: "",
      ktxScreentHeight: "",
      textareaTxt: null,
      imgArr: [],
      location: null,
      cfpData: {
        content: "",
        images: ""
      }
    };
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data())
    this.publishType = options.publishType;
  },
  mounted() {
    let systemInfo = wx.getSystemInfoSync();
    this.navBar_Height = wx.getStorageSync("navBar_Height") + "px";
  },
  methods: {
    changeTextStatus() {
      this.realTextValue = "";
      this.textStatus = true;
    },
    bindblurTextStatus() {
      if (this.cfpData.content.length == 0) {
        this.realTextValue = "写下此刻的心声吧...";
        this.textNoColor = "#dcdcdc";
      } else {
        this.realTextValue = this.cfpData.content;
        this.textNoColor = "#353535";
      }
      this.textStatus = false;
    },
    chooseImage() {
      let self = this;
      store.dispatch("getOssData", { dir: "city/release" });
      wx.chooseImage({
        count: 9,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          self.imgArr = imgsUpload(res.tempFilePaths);
        }
      });
    },
    postData() {
      let _this = this;
      _this.cfpData.images = _this.imgArr.join(";");
      wx.showModal({
        title: "发布提示",
        content: "确定发布？",
        showCancel: true, //是否显示取消按钮
        success: function(res) {
          if (res.cancel) {
            return;
          } else {
            _this.publishTypeFun(_this.publishType);
          }
        },
        fail: function(res) {}, //接口调用失败的回调函数
        complete: function(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
      });
    },
    publishTypeFun(type) {
      var _this = this;
      if (type == 1) {
        communityFriendsPost(_this.cfpData).then(res => {
          if (res.status == 200) {
            wx.showToast({
              title: "发布成功",
              icon: "success",
              duration: 1000,
              success: function() {
                setTimeout(function() {
                  wx.switchTab({
                    url: "/pages/community/main",
                    success: function(e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  });
                }, 1000);
              }
            });
          }
        });
      } else {
        forumContentPost(_this.cfpData).then(res => {
          if (res.status == 200) {
            wx.showToast({
              title: "发布成功",
              icon: "success",
              duration: 1000,
              success: function() {
                setTimeout(function() {
                  wx.switchTab({
                    url: "/pages/home/main",
                    success: function(e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  });
                }, 1000);
              }
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.scrollView {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.release {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 3%;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px #eee;
  padding: 15px;
  .edit-main {
    .edit-text {
      height: 104px;
      width: 100%;
      padding: 2px 0 10px;
      overflow-y: scroll;
      line-height: 20px;
      font-size: 14px;
      color: #353535;
      margin-bottom: 10px;
    }
    .edit-textShow {
      box-sizing: border-box;
    }
    .edit-textNo {
      color: #dcdcdc;
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
}
</style>
