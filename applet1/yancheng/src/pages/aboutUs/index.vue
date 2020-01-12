<template>
  <div class="aboutUs">
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
export default {
  data() {
    return {};
  },
  methods: {
    call() {
      wx.makePhoneCall({
        phoneNumber: "158XXXXXXXX"
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
