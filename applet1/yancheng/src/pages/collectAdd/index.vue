<template>
  <scroll-view class="scrollView" scroll-y="true">
    <navigation-bar
      :title="'征寻发布'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="collectAdd">
      <div class="content w94">
        <div class="line detail">
          <div class="left">名称：</div>
          <div class="right">
            <input
              v-model="formData.title"
              type="text"
              placeholder="请填写征寻名称（12个字符以内)"
              maxlength="12"
              placeholder-style="color:#D1CFCF"
            />
          </div>
        </div>
        <div class="line detail">
          <div class="left">征集人数：</div>
          <div class="right">
            <input
              v-model="formData.num"
              type="number"
              placeholder="需要多少人帮你完成"
              placeholder-style="color:#D1CFCF"
            />
          </div>
        </div>
        <div class="line detail">
          <div class="left">奖励砖数：</div>
          <div class="right">
            <input
              v-model="formData.integral"
              type="number"
              placeholder="为每人给与多少砖头"
              placeholder-style="color:#D1CFCF"
            />
          </div>
        </div>
        <div class="line">
          <div class="left">有效时间：</div>
          <div class="right">
            <picker
              @change="bindDateChange"
              v-model="formData.validDay"
              :index="tIndex"
              :range="timeArray"
            >
              <view class="picker" :class="tIndex ? 'hasColor' : ''"
                >{{
                  tIndex ? timeArray[tIndex] : "选择有效时间"
                }}（单位：天）</view
              >
            </picker>
          </div>
        </div>
        <div class="line">
          <div class="left">图片证明：</div>
          <div class="right isno">
            <radio-group class="radio-group" @change="needPicChange">
              <radio class="radio" :checked="formData.needPic == 1" value="1">
                <text>需要</text>
              </radio>
              <radio class="radio" :checked="formData.needPic == 0" value="0">
                <text>不需要</text>
              </radio>
            </radio-group>
          </div>
        </div>
        <div class="line">
          <div class="left">等级要求：</div>
          <div class="right isno">
            <input
              class="formData"
              v-model="formData.rank"
              type="number"
              placeholder="需要达到多少等级"
              placeholder-style="color:#D1CFCF"
            />
          </div>
        </div>
        <div class="line">
          <div class="left">实名要求：</div>
          <div class="right isno">
            <radio-group class="radio-group" @change="needRealChange">
              <radio class="radio" :checked="formData.needReal == 1" value="1">
                <text>需要</text>
              </radio>
              <radio class="radio" :checked="formData.needReal == 0" value="0">
                <text>不需要</text>
              </radio>
            </radio-group>
          </div>
        </div>
        <textarea
          v-if="textStatus"
          class="edit-text edit-textShow"
          auto-focus
          @blur="bindblurTextStatus"
          v-model="formData.content"
        ></textarea>
        <div
          v-else
          class="edit-text edit-textNo"
          :style="{ color: textNoColor }"
          @click="changeTextStatus"
        >
          {{ realTextValue }}
        </div>
        <div class="bb">
          <p class="tt">示例图：</p>
          <div class="edit-img">
            <div class="imgbox" v-for="(item, index) in imgArr2" :key="index">
              <image :src="item" mode="aspectFill" />
              <i
                class="close iconfont icon-iconless"
                @click.stop="closeFunTwo(item, index)"
              ></i>
            </div>
            <div
              class="iconfont icon-jiahao"
              @click.stop="chooseImageTwo"
            ></div>
          </div>
        </div>
      </div>

      <cover-view class="createBtn" @click="publishFun">发布</cover-view>
    </div>
  </scroll-view>
</template>

<script>
import { solicitAdd } from "@/api/solicit";
import { imgsUpload } from "@/utils/imgsUpload";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar,
  },
  data() {
    return {
      timeArray: ["1", "2", "3", "4", "5", "6"],
      tIndex: "",
      formData: {
        title: "",
        num: 0,
        integral: 0,
        validDay: '',
        needPic: 0,
        rank: 0,
        needReal: 0,
        content: "",
        images: "",
      },
      publishFormData: {},
      textNoColor: "#dcdcdc",
      realTextValue: "请填写征寻的详细要求（100字以内）",
      textStatus: false,
      imgArr2: [],
    };
  },
  mounted() {
    let systemInfo = wx.getSystemInfoSync();
    this.formData = {
      title: "",
      num: 0,
      integral: 0,
      validDay: '',
      needPic: 0,
      rank: 0,
      needReal: 0,
      content: "",
      images: "",
    };
    this.realTextValue = "请填写征寻的详细要求（100字以内）";
    this.imgArr2 = [];
  },
  methods: {
    restData() {
      this.formData = {
        title: "",
        num: 0,
        integral: 0,
        validDay: '',
        needPic: 0,
        rank: 0,
        needReal: 0,
        content: "",
        images: "",
      };
      this.textNoColor = "#dcdcdc";
      this.realTextValue = "请填写征寻的详细要求（100字以内）";
      this.textStatus = false;
      this.imgArr2 = [];
    },
    changeTextStatus() {
      this.realTextValue = "";
      this.textStatus = true;
    },
    bindblurTextStatus() {
      if (this.formData.content.length == 0) {
        this.realTextValue = "请填写征寻的详细要求（100字以内）";
        this.textNoColor = "#dcdcdc";
      } else {
        this.realTextValue = this.formData.content;
        this.textNoColor = "#353535";
      }
      this.textStatus = false;
    },
    chooseImageTwo() {
      let self = this;
      self.$store.dispatch("getOssData", { dir: "city/activityContent" });
      wx.chooseImage({
        count: 5,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            imgsUpload(res.tempFilePaths[i]).then((rere) => {
              self.imgArr2.push(rere);
            });
          }
        },
      });
    },
    closeFunTwo(item, index) {
      this.imgArr2.splice(index, 1);
    },
    bindDateChange(e) {
      this.tIndex = e.mp.detail.value;
      this.formData.validDay = this.timeArray[e.mp.detail.value];
    },
    needPicChange(e) {
      this.formData.needPic = e.mp.detail.value;
    },
    needRealChange(e) {
      this.formData.needReal = e.mp.detail.value;
    },
    isEmpty(v) {
      switch (typeof v) {
        case "undefined":
          return true;
        case "string":
          if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
            return true;
          break;
        case "boolean":
          if (!v) return true;
          break;
        case "number":
          if (0 === v) {
            return false;
          } else if (isNaN(v)) {
            return true;
          }
          break;
        case "object":
          if (null === v || v.length === 0) return true;
          for (var i in v) {
            return false;
          }
          return true;
      }
      return false;
    },
    publishFun() {
      if (this.isEmpty(this.formData.title)) {
        wx.showToast({
          title: "请完善征寻名称",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.num)) {
        wx.showToast({
          title: "请完善征集人数",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.integral)) {
        wx.showToast({
          title: "请完善奖励转数",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.validDay)) {
        wx.showToast({
          title: "请完善有效天数",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.needPic)) {
        wx.showToast({
          title: "请完善是否需要图片",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.rank)) {
        wx.showToast({
          title: "请完善等级要求",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.needReal)) {
        wx.showToast({
          title: "请完善实名要求",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.isEmpty(this.formData.content)) {
        wx.showToast({
          title: "请完善征寻详细要求",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      let needIntegral = this.formData.num * this.formData.integral;
      let authInfo = wx.getStorageSync("authInfo");
      let authIntegral = authInfo.points;
      if (needIntegral > authIntegral) {
        wx.showToast({
          title: "您的砖头余额不足！",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (Number(this.formData.rank) > 6) {
        wx.showToast({
          title: "等级要求最高为6级",
          icon: "none",
          duration: 2000,
        });
        return false;
      } else {
        this.publishFormData = {
          title: this.formData.title,
          num: Number(this.formData.num),
          integral: Number(this.formData.integral),
          validDay: Number(this.formData.validDay),
          needPic: Number(this.formData.needPic),
          rank: Number(this.formData.rank),
          needReal: Number(this.formData.needReal),
          content: this.formData.content,
          images: this.imgArr2.join("|"),
        };
        console.log('this.publishFormData----',this.publishFormData)
        solicitAdd(this.publishFormData).then((res) => {
          if (res.status == 200) {
            this.globalData.homeShowNum = 2;
            // this.restData();
            wx.showToast({
              title: "发布成功,后台审核中",
              icon: "none",
              duration: 2000,
              success(data) {
                setTimeout(function () {
                  //要延时执行的代码
                  wx.switchTab({
                    url: `/pages/home/main`,
                  });
                }, 2000); //延迟时间
              },
            });
            // wx.showModal({
            //   title: "提示",
            //   content: "发布成功，是否返回界面",
            //   success(res) {
            //     if (res.confirm) {
            //       wx.switchTab({
            //         url: `/pages/home/main`
            //       });
            //     } else if (res.cancel) {
            //       console.log("用户点击取消");
            //     }
            //   }
            // });
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.collectAdd {
  width: 94%;
  box-shadow: 0 0 2px 2px #eee;
  margin: 10px auto;
  padding: 15px 0;
  border-radius: 5px;
  .edit-text {
    height: 100px;
    padding: 2px 0;
    width: 100%;
    overflow-y: scroll;
    font-size: 15px;
    color: #353535;
  }
  .edit-textShow {
    box-sizing: border-box;
  }
  .edit-textNo {
    color: #dcdcdc;
  }
  .content {
    .edit-img {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-between;
      margin-bottom: 20px;
      .imgbox {
        position: relative;
        .close {
          position: absolute;
          border-radius: 15px;
          width: 18px;
          height: 18px;
          font-size: 16px;
          line-height: 16px;
          text-align: center;
          color: #da4b47;
          right: 14px;
          top: 0px;
        }
      }
      image {
        width: 75px;
        height: 75px;
        margin: 0 15px 5px 0;
      }
      .icon-jiahao {
        width: 75px;
        height: 75px;
        border: 1px solid #707070;
        font-size: 18px;
        color: #888;
        line-height: 75px;
        text-align: center;
      }
    }
    .line {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      .left {
        width: 20%;
        font-size: 12px;
        color: #343434;
      }
      .right {
        flex: 1;
        font-size: 12px;
        &.cost {
          input {
            display: inline-block;
            border: 1px solid #707070;
            line-height: 20px;
            height: 20px;
            padding: 0 5px;
            width: 50px;
            vertical-align: middle;
            margin-right: 10px;
          }
          span {
            vertical-align: middle;
          }
        }
        &.isno {
          .bg {
            display: inline-block;
            width: 50px;
            border: 1px solid #707070;
            color: #343434;
            text-align: center;
            line-height: 20px;
            &.bg_a {
              background-color: #b1a1a3;
              color: #fff;
              border: none;
              line-height: 22px;
            }
          }
        }
        .picker {
          color: #dcdcdc;
          &.hasColor {
            color: #343434;
          }
        }
      }
    }
    .linebg {
      width: 100%;
      height: 4px;
      background-color: #eee;
      margin-bottom: 20px;
    }
    .bb {
      .tt {
        font-size: 12px;
        color: #333;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
  }

  .createBtn {
    background-color: #b1a1a3;
    color: #fff;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 30%;
    text-align: center;
    border-radius: 30px;
    position: fixed;
    bottom: 5%;
    left: 35%;
  }
}
</style>
