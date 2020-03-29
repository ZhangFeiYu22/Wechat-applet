<template>
  <div class="myInfo">
    <navigation-bar :title="'设置'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="headImg">
      <img v-if="myInfo.avatar" :src="myInfo.avatar" mode="aspectFill" />
    </div>
    <div class="infoList">
      <div class="infoItem" @click="changeName(myInfo.nickName)">
        <p class="ll">昵称</p>
        <p class="cc">{{myInfo.nickName}}</p>
      </div>
      <div class="infoItem" @click="changeIntro(myInfo.introduction)">
        <p class="ll">简介</p>
        <p class="cc">{{myInfo.introduction}}</p>
      </div>
      <div class="infoItem" @click="changeSex">
        <p class="ll">性别</p>
        <p class="cc" v-if="myInfo.gender == 0">保密</p>
        <p class="cc" v-else-if="myInfo.gender == 1">男</p>
        <p class="cc" v-else>女</p>
      </div>
      <div class="infoItem">
        <p class="ll">生日</p>
        <picker
          class="cc"
          mode="date"
          :value="myInfo.birthday"
          @change="bindDateChange"
          placeholder="请输入日期"
        >
          <view class="picker" v-if="myInfo.birthday">{{myInfo.birthday}}</view>
          <view class="picker" v-else style="color: #ccc;">请选择城市</view>
        </picker>
      </div>
      <div class="infoItem">
        <p class="ll">城市</p>
        <picker
          class="cc"
          mode="region"
          @change="bindRegionChange"
          :value="region"
          placeholder="请选择城市"
        >
          <view class="picker" v-if="region.length == 0" style="color: #ccc;">请选择城市</view>
          <view class="picker" v-else>{{region[0]}}&nbsp;{{region[1]}}&nbsp;{{region[2]}}</view>
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
import { userInfoGet, userInfoPost } from "@/api/my";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      myInfo: {},
      region: [],
      nameVal: "",
      introVal: "",
      bgMask: false,
      nameMask: false,
      introMask: false
    };
  },
  mounted() {
    this.fetchInfo();
  },
  methods: {
    // 获取信息
    async fetchInfo() {
      let inRes = await userInfoGet();
      if (inRes.status == 200) {
        this.myInfo = inRes.result;
        if (inRes.result.province && inRes.result.province !== "") {
          console.log(0);
          this.region[0] = inRes.result.province;
        }
        if (inRes.result.city && inRes.result.city !== "") {
          console.log(1);
          this.region[1] = inRes.result.city;
        }
        if (inRes.result.district && inRes.result.district !== "") {
          console.log(2);
          this.region[2] = inRes.result.district;
        }
      }
    },
    closeMask() {
      this.bgMask = false;
      this.nameMask = false;
      this.introMask = false;
    },
    changeName(name) {
      this.bgMask = true;
      this.nameMask = true;
      this.nameVal = name;
    },
    // 名字修改
    nameChange() {
      var that = this;
      wx.showModal({
        content: "确认修改名字吗？",
        success: function(res) {
          if (res.confirm) {
            let data = {
              nickName: that.nameVal
            };
            userInfoPost(data).then(res => {
              if (res.status == 200) {
                that.myInfo.nickName = that.nameVal;
                that.closeMask();
                that.handelSuccess();
              }
            });
          } else {
            console.log("点击取消回调");
          }
        }
      });
    },
    changeIntro(intro) {
      this.bgMask = true;
      this.introMask = true;
      this.introVal = intro;
    },
    // 个人简介修改
    introChange() {
      var that = this;
      wx.showModal({
        content: "确认修改简介吗？",
        success: function(res) {
          if (res.confirm) {
            let data = {
              introduction: that.introVal
            };
            userInfoPost(data).then(res => {
              if (res.status == 200) {
                that.myInfo.introduction = that.introVal;
                that.closeMask();
                that.handelSuccess();
              }
            });
          } else {
            console.log("点击取消回调");
          }
        }
      });
    },
    // 性别修改
    changeSex() {
      var that = this;
      wx.showActionSheet({
        itemList: ["保密", "男", "女"],
        success: function(res) {
          let data = {
            gender: res.tapIndex
          };
          userInfoPost(data).then(res => {
            if (res.status == 200) {
              that.myInfo.gender = res.result.gender;
            }
          });
        }
      });
    },
    // 日期修改
    bindDateChange(e) {
      let data = {
        birthday: e.mp.detail.value
      };
      userInfoPost(data).then(res => {
        if (res.status == 200) {
          this.myInfo.birthday = res.result.birthday;
        }
      });
    },
    // 城市修改
    bindRegionChange: function(e) {
      let regData = e.mp.detail.value;
      let data = {
        city: regData[1],
        district: regData[2],
        province: regData[0]
      };
      userInfoPost(data).then(res => {
        if (res.status == 200) {
          this.region = regData;
        }
      });
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
