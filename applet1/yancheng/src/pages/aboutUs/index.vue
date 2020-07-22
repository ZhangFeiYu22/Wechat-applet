<template>
  <div class="aboutUs">
    <navigation-bar :title="'关于我们'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="otherList">
      <div class="otherItem" @click="goAboutUs">
        <i class="iconfont icon-folder_icon iconLeft"></i>
        <span>系统版本</span>
        <i class="iconRight">1.0.1</i>
      </div>
      <div class="otherItem" @click="call">
        <i class="iconfont icon-xinbaniconshangchuan- iconLeft"></i>
        <span>客服热线</span>
        <i class="iconfont icon-right iconRight"></i>
      </div>
    </div>
    <button class="btn" @click="goFeedBack">反馈与建议</button>
  </div>
</template>

<script>
import { serviceHotlineGet } from "@/api/my.js";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      phone: ""
    };
  },
  mounted() {
    let xx = wx.getAccountInfoSync();
    console.log(xx);
    this.fetchPhone();
  },
  methods: {
    async fetchPhone() {
      let pRes = await serviceHotlineGet();
      if (pRes.status == 200) {
        this.phone = pRes.result;
      }
    },
    call() {
      wx
        .makePhoneCall({
          phoneNumber: this.phone
        })
        .catch(e => {
          // console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
        });
    },
    goFeedBack() {
      wx.navigateTo({
        url: "/pages/feedback/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.aboutUs {
  padding-top: 20px;
  .otherList {
    width: 90%;
    margin: 0 auto;
    .otherItem {
      line-height: 46px;
      i {
        display: inline-block;
        &.iconLeft {
          margin-right: 20px;
          font-size: 22px;
        }
        &.iconRight {
          float: right;
        }
      }
      span {
        font-size: 18px;
        color: #2a2a2a;
      }
    }
  }
  .btn {
    width: 90%;
    margin: 20px auto;
    color: #fff;
    font-size: 14px;
    background-color: #b1a1a3;
    height: 40px;
    line-height: 40px;
    &::after {
      border: none;
    }
  }
}
</style>
