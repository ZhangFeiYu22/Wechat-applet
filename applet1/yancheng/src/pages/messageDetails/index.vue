<template>
  <div class="messageDetails">
    <div class="head">
      <div class="headImg">
        <img src="../../../static/images/aaa1.png" mode="aspectFill" />
      </div>
      <div class="nameTime">
        <p class="name">张小凡</p>
        <p class="time">2019.12.12 12:12</p>
      </div>
    </div>
    <div class="content">
      <p class="list">
        对你说：
        <span>你就是个棒槌</span>
      </p>
    </div>
    <div class="returnBtn">回发消息</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.messageDetails {
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    .headImg {
      width: 46px;
      height: 46px;
      margin-right: 10px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nameTime {
      flex: 1;
      p {
        &.name {
          font-size: 16px;
          line-height: 26px;
          color: #403f3f;
        }
        &.time {
          font-size: 13px;
          line-height: 14px;
          color: #797979;
        }
      }
    }
  }
  .content {
    width: 90%;
    margin: 20px auto;
    .list {
      font-size: 13px;
      color: #797979;
    }
  }
  .returnBtn {
    background-color: #b1a1a3;
    color: #fff;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    width: 60%;
    position: fixed;
    bottom: 40px;
    text-align: center;
    border-radius: 5px;
    left: 20%;
    letter-spacing: 2px;
  }
}
</style>
