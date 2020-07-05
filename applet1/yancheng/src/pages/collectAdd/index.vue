<template>
  <scroll-view class="scrollView" scroll-y="true">
    <navigation-bar :title="'征寻发布'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="collectAdd">
      <div class="content w94">
        <div class="line detail">
          <div class="left">名称：</div>
          <div class="right">
            <input
              v-model="publishFormData.title"
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
              v-model="publishFormData.num"
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
              v-model="publishFormData.integral"
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
              v-model="publishFormData.validDay"
              :index="tIndex"
              :range="timeArray"
            >
              <view
                class="picker"
                :class="tIndex?'hasColor':''"
              >{{ tIndex ? timeArray[tIndex] : '选择有效时间'}}（单位：天）</view>
            </picker>
          </div>
        </div>
        <div class="line">
          <div class="left">图片证明：</div>
          <div class="right isno">
            <radio-group class="radio-group" @change="needPicChange">
              <radio class="radio" :checked="publishFormData.needPic == 1" value="1">
                <text>需要</text>
              </radio>
              <radio class="radio" :checked="publishFormData.needPic == 0" value="0">
                <text>不需要</text>
              </radio>
            </radio-group>
          </div>
        </div>
        <div class="line">
          <div class="left">等级要求：</div>
          <div class="right isno">
            <input
              class="publishFormData"
              v-model="publishFormData.rank"
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
              <radio class="radio" :checked="publishFormData.needReal == 1" value="1">
                <text>需要</text>
              </radio>
              <radio class="radio" :checked="publishFormData.needReal == 0" value="0">
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
          v-model="publishFormData.content"
        ></textarea>
        <div
          v-else
          class="edit-text edit-textNo"
          :style="{color: textNoColor}"
          @click="changeTextStatus"
        >{{realTextValue}}</div>
        <div class="bb">
          <p class="tt">示例图：</p>
          <div class="edit-img">
            <div class="imgbox" v-for="(item,index) in imgArr2" :key="index">
              <image :src="item" mode="aspectFill" />
              <i class="close iconfont icon-iconless" @click.stop="closeFunTwo(item,index)"></i>
            </div>
            <div class="iconfont icon-jiahao" @click.stop="chooseImageTwo"></div>
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
    navigationBar
  },
  data() {
    return {
      timeArray: ["1", "2", "3", "4", "5", "6"],
      tIndex: "",
      publishFormData: {
        title: "",
        num: 0,
        integral: 0,
        validDay: 1,
        needPic: 1,
        rank: 0,
        needReal: 1,
        content: "",
        images: ""
      },
      textNoColor: "#dcdcdc",
      realTextValue: "请填写征寻的详细要求（100字以内）",
      textStatus: false,
      imgArr2: []
    };
  },
  mounted() {
    let systemInfo = wx.getSystemInfoSync();
    this.publishFormData = {
      title: "",
      num: 0,
      integral: 0,
      validDay: 1,
      needPic: 1,
      rank: 0,
      needReal: 1,
      content: "",
      images: ""
    };
    (this.realTextValue = "请填写征寻的详细要求（100字以内）"),
      (this.imgArr2 = []);
  },
  methods: {
    changeTextStatus() {
      this.realTextValue = "";
      this.textStatus = true;
    },
    bindblurTextStatus() {
      if (this.publishFormData.content.length == 0) {
        this.realTextValue = "请填写征寻的详细要求（100字以内）";
        this.textNoColor = "#dcdcdc";
      } else {
        this.realTextValue = this.publishFormData.content;
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
            imgsUpload(res.tempFilePaths[i]).then(rere => {
              self.imgArr2.push(rere);
            });
          }
        }
      });
    },
    closeFunTwo(item, index) {
      this.imgArr2.splice(index, 1);
    },
    bindDateChange(e) {
      this.tIndex = e.mp.detail.value;
      this.publishFormData.validDay = this.timeArray[e.mp.detail.value];
    },
    needPicChange(e) {
      this.publishFormData.needPic = e.mp.detail.value;
    },
    needRealChange(e) {
      this.publishFormData.needReal = e.mp.detail.value;
    },
    publishFun() {
      console.log("1---", this.publishFormData);
      if (
        this.publishFormData.title == "" ||
        this.publishFormData.num == "" ||
        this.publishFormData.integral == "" ||
        this.publishFormData.validDay == "" ||
        this.publishFormData.needPic == "" ||
        this.publishFormData.rank == "" ||
        this.publishFormData.needReal == "" ||
        this.publishFormData.content == ""
      ) {
        wx.showToast({
          title: "请检查信息是否填写完整",
          icon: "none",
          duration: 2000
        });
        return;
      } else {
        let needIntegral =
          this.publishFormData.num * this.publishFormData.integral;
        let authInfo = wx.getStorageSync("authInfo");
        let authIntegral = authInfo.points;
        if (needIntegral > authIntegral) {
          wx.showToast({
            title: "您的砖头余额不足！",
            icon: "none",
            duration: 2000
          });
          return;
        }
        if (Number(this.publishFormData.rank) > 6) {
          wx.showToast({
            title: "等级要求最高为6级",
            icon: "none",
            duration: 2000
          });
          return;
        } else {
          this.publishFormData.images = this.imgArr2.join("|");
          this.publishFormData.num == Number(this.publishFormData.num);
          this.publishFormData.integral ==
            Number(this.publishFormData.integral);
          this.publishFormData.rank == Number(this.publishFormData.rank);
          console.log("this.publishFormData", this.publishFormData);
          solicitAdd(this.publishFormData).then(res => {
            if (res.status == 200) {
              this.globalData.homeShowNum = 2;
              wx.showToast({
                title: "发布成功",
                icon: "none",
                duration: 1500,
                success: function() {
                  wx.switchTab({
                    url: `/pages/home/main`
                  });
                }
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
      }
    }
  }
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
