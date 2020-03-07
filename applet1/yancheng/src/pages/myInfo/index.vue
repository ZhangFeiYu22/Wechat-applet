<template>
  <div class="myInfo">
     <navigation-bar
      :title="'设置'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="headImg">
      <img :src="headImg" mode="aspectFill" />
    </div>
    <div class="infoList">
      <div class="infoItem" @click="changeName">
        <p class="ll">昵称</p>
        <p class="cc">{{name}}</p>
      </div>
      <div class="infoItem" @click="changeIntro">
        <p class="ll">简介</p>
        <p class="cc">{{intro}}</p>
      </div>
      <div class="infoItem" @click="changeSex">
        <p class="ll">性别</p>
        <p class="cc">{{sex}}</p>
      </div>
      <div class="infoItem">
        <p class="ll">生日</p>
        <!-- <p class="cc">2019-01-01</p> -->
        <picker class="cc" mode="date" :value="date" @change="bindDateChange" placeholder="请输入日期">
          <input name="date" :value="date" placeholder="请输入日期" />
        </picker>
      </div>
      <div class="infoItem">
        <p class="ll">城市</p>
        <!-- <p class="cc">江苏 南京</p> -->
        <picker class="cc" mode="region" @change="bindRegionChange" :value="region">
          <view class="picker">{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
        </picker>
      </div>
    </div>
    <div class="mask" @click.stop="closeMask" v-if="bgMask"></div>
    <div class="nameMask" v-if="nameMask">
      <h5>修改名字</h5>
      <input type="text" v-model="nameVal" />
      <div class="btnGroup">
        <button class="cancelBtn" @click="closeMask">取消</button>
        <button class="affirmBtn" @click="nameChange">确定</button>
      </div>
    </div>
    <div class="nameMask introMask" v-if="introMask">
      <h5>修改简介</h5>
      <textarea v-model="introVal"></textarea>
      <div class="btnGroup">
        <button class="cancelBtn" @click="closeMask">取消</button>
        <button class="affirmBtn" @click="introChange">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      headImg: `${this.$store.state.imgUrlHttp}/head.png`,
      name: "张小凡",
      intro: "这厮不错，简介可以",
      sex: "男",
      date: "",
      region: ["江苏省", "南京市", "秦淮区"],
      nameVal: "",
      introVal: "",
      bgMask: false,
      // bgMask: true,
      nameMask: false,
      introMask: false
    };
  },
  methods: {
    closeMask() {
      this.bgMask = false;
      this.nameMask = false;
      this.introMask = false;
    },
    changeName() {
      this.bgMask = true;
      this.nameMask = true;
      this.nameVal = "";
    },
    nameChange() {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "确认修改名字吗？",
        success: function(res) {
          if (res.confirm) {
            that.name = that.nameVal;
            that.closeMask();
            that.handelSuccess();
          } else {
            console.log("点击取消回调");
          }
        }
      });
    },
    changeIntro() {
      this.bgMask = true;
      this.introMask = true;
      this.introVal = "";
    },
    introChange() {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "确认修改简介吗？",
        success: function(res) {
          if (res.confirm) {
            that.intro = that.introVal;
            that.closeMask();
            that.handelSuccess();
          } else {
            console.log("点击取消回调");
          }
        }
      });
    },
    changeSex() {
      var that = this;
      wx.showActionSheet({
        itemList: ["保密", "男", "女"],
        success: function(res) {
          console.log(res.tapIndex);
          switch (res.tapIndex) {
            case 1:
              that.sex = "男";
              break;
            case 2:
              that.sex = "女";
              break;
            default:
              that.sex = "保密";
              break;
          }
        }
      });
    },
    bindDateChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.date = e.mp.detail.value;
    },
    bindRegionChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.region = e.mp.detail.value;
    },
    handelSuccess() {
      wx.showToast({
        title: "操作成功",
        duration: 2000 //停留时间
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myInfo {
  .headImg {
    text-align: center;
    padding: 10px 0 20px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 100%;
    }
  }
  .infoList {
    width: 85%;
    margin: 0 auto;
    .infoItem {
      font-size: 13px;
      line-height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #525151;
      position: relative;
      &::after {
        display: block;
        content: "";
        width: 6px;
        height: 6px;
        border-right: 1px solid #999;
        border-bottom: 1px solid #999;
        transform: rotate(-45deg);
        position: absolute;
        right: 0;
        top: 16px;
      }
      .ll {
        margin-right: 30px;
      }
      .cc {
        flex-grow: 1;
      }
    }
  }
  // 背景
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .nameMask {
    width: 70%;
    padding-top: 10px;
    background-color: #fff;
    border-radius: 7px;
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h5 {
      text-align: center;
      font-size: 15px;
      height: 30px;
      line-height: 30px;
      color: #333;
    }
    input {
      border: 1px solid #ddd;
      margin: 20px;
      border-radius: 5px;
      height: 32px;
      line-height: 32px;
      padding: 2px 10px;
      font-size: 14px;
      color: #333;
    }
    textarea {
      border: 1px solid #ddd;
      width: 82%;
      margin: 20px auto;
      border-radius: 5px;
      height: 100px;
      line-height: 32px;
      padding: 2px 10px;
      font-size: 14px;
      color: #333;
    }
    .btnGroup {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #eee;
      button {
        background: transparent;
        width: 50%;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        &::after {
          border: none;
        }
      }
      .cancelBtn {
        border-right: 1px solid #eee;
        color: #777;
      }
      .affirmBtn {
        color: #2982d8;
      }
    }
  }
}
</style>
