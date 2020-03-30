<template>
  <scroll-view class="scrollView" scroll-y="true">
    <navigation-bar :title="'活动添加'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="voteAdd">
      <!-- 内容列表 -->
      <div class="content w94">
        <textarea
          v-if="textStatus"
          class="edit-text edit-textShow"
          auto-focus
          @blur="bindblurTextStatus"
          v-model="publishFormData.title"
        ></textarea>
        <div
          v-else
          class="edit-text edit-textNo"
          :style="{color: textNoColor}"
          @click="changeTextStatus"
        >{{realTextValue}}</div>
        <div class="edit-img">
          <div class="imgbox" v-for="(item,index) in imgArr1" :key="index">
            <image v-if="item" :src="item" mode="aspectFill" />
            <i class="close iconfont icon-iconless" @click.stop="closeFunOne(item,index)"></i>
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImageOne"></div>
        </div>
        <div class="line">
          <div class="left">是否收费：</div>
          <div class="right isno">
            <span class="bg" :class="publishFormData.feeType?'bg_a':''" @click="toggleBag('0')">是</span>
            <span class="bg" :class="publishFormData.feeType?'':'bg_a'" @click="toggleBag('1')">否</span>
          </div>
        </div>
        <div class="line">
          <div class="left">费用：</div>
          <div class="right cost">
            <input type="text" v-model="publishFormData.activityFee" />
            <span>元</span>
          </div>
        </div>
        <div class="line">
          <div class="left">时间：</div>
          <div class="right">
            <picker mode="date" start="2000-01-01" end="2050-12-31" @change="bindDateChange">
              <input
                v-model="publishFormData.activityTime"
                disabled
                type="text"
                placeholder="请选择时间"
                placeholder-style="color:#D1CFCF"
              />
            </picker>
          </div>
        </div>
        <div class="line">
          <div class="left">地点：</div>
          <div class="right">
            <picker mode="region" @change="bindRegionChange">
              <input
                v-model="publishFormData.activityAddress"
                disabled
                type="text"
                placeholder="如：江苏省 南京市 栖霞区"
                placeholder-style="color:#D1CFCF"
              />
            </picker>
          </div>
        </div>
        <div class="line detail">
          <div class="left">详细：</div>
          <div class="right">
            <input
              v-model="detailAddress"
              type="text"
              placeholder="街道\路名\门牌号"
              placeholder-style="color:#D1CFCF"
            />
          </div>
        </div>
        <div class="linebg"></div>
        <div class="bb">
          <p class="tt">活动详情</p>
          <div class="edit-img">
            <div class="imgbox" v-for="(item,index) in imgArr2" :key="index">
              <image :src="item" mode="aspectFill" />
              <i class="close iconfont icon-iconless" @click.stop="closeFunTwo(item,index)"></i>
            </div>
            <div class="iconfont icon-jiahao" @click.stop="chooseImageTwo"></div>
          </div>
        </div>
        <div class="bb">
          <p class="tt">活动须知</p>
          <textarea
            v-if="textStatus2"
            class="edit-text edit-textShow"
            auto-focus
            @blur="bindblurTextStatus2"
            v-model="publishFormData.subTitle"
          ></textarea>
          <div
            v-else
            class="edit-text edit-textNo"
            :style="{color: textNoColor2}"
            @click="changeTextStatus2"
          >{{realTextValue2}}</div>
        </div>
      </div>

      <cover-view class="createBtn" @click="publishFun">发布</cover-view>
    </div>
  </scroll-view>
</template>

<script>
import { activitysPost } from "@/api/activity";
import { imgsUpload } from "@/utils/imgsUpload";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      publishFormData: {
        activityAddress: "",
        activityFee: "",
        activityTime: "",
        content: "",
        coverImage: "",
        feeType: 0,
        subTitle: "",
        title: ""
      },
      textNoColor: "#dcdcdc",
      realTextValue: "标题",
      textStatus: false,
      textNoColor2: "#dcdcdc",
      realTextValue2: "请填写活动须知",
      textStatus2: false,
      imgArr1: [],
      imgArrCenter: [],
      imgArr2: [],
      detailAddress: ""
    };
  },
  mounted() {
    let systemInfo = wx.getSystemInfoSync();
  },
  methods: {
    changeTextStatus() {
      this.realTextValue = "";
      this.textStatus = true;
    },
    bindblurTextStatus() {
      if (this.publishFormData.title.length == 0) {
        this.realTextValue = "标题";
        this.textNoColor = "#dcdcdc";
      } else {
        this.realTextValue = this.publishFormData.title;
        this.textNoColor = "#353535";
      }
      this.textStatus = false;
    },
    changeTextStatus2() {
      this.realTextValue2 = "";
      this.textStatus2 = true;
    },
    bindblurTextStatus2() {
      if (this.publishFormData.subTitle.length == 0) {
        this.realTextValue2 = "请填写活动须知";
        this.textNoColor2 = "#dcdcdc";
      } else {
        this.realTextValue2 = this.publishFormData.subTitle;
        this.textNoColor2 = "#353535";
      }
      this.textStatus2 = false;
    },
    selectOne(num) {
      this.itemsNum = num;
    },
    chooseImageOne() {
      let self = this;
      self.$store.dispatch("getOssData", { dir: "city/activityHead" });
      wx.chooseImage({
        count: 1,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          let newArr = [];
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            imgsUpload(res.tempFilePaths[i]).then(rere => {
              newArr.push(rere);
              self.imgArr1 = newArr;
            });
          }
        }
      });
    },
    closeFunOne(item, index) {
      this.imgArr1.splice(index, 1);
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
    toggleBag(num) {
      if (num == "1") {
        this.publishFormData.feeType = 0;
      } else {
        this.publishFormData.feeType = 1;
      }
    },
    bindDateChange(e) {
      this.publishFormData.activityTime = e.mp.detail.value;
    },
    bindRegionChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      let region = e.mp.detail.value;
      let regionString = region.join(" ");
      this.publishFormData.activityAddress = regionString;
    },
    publishFun() {
      if (
        this.publishFormData.title == "" ||
        this.imgArr1.length == 0 ||
        this.imgArr2.length == 0 ||
        this.publishFormData.activityTime == "" ||
        this.publishFormData.activityAddress == "" ||
        this.publishFormData.subTitle == ""
      ) {
        wx.showToast({
          title: "请检查信息是否填写完整",
          icon: "none",
          duration: 2000
        });
        return;
      } else {
        this.publishFormData.coverImage = this.imgArr1[0];
        let content = this.imgArr2.join(";");
        this.publishFormData.content = content;
        this.publishFormData.activityAddress =
          this.publishFormData.activityAddress + " " + this.detailAddress;
        activitysPost(this.publishFormData).then(res => {
          if (res.status == 200) {
            wx.showToast({
              title: "发布成功",
              icon: "none",
              duration: 1500,
              success: function() {
                wx.navigateTo({
                  url: "/pages/activity/main"
                });
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
.voteAdd {
  width: 94%;
  box-shadow: 0 0 2px 2px #eee;
  margin: 10px auto;
  padding: 15px 0;
  border-radius: 5px;
  .edit-text {
    height: 64px;
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
            width: 30px;
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
