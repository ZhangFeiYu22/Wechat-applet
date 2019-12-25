<template>
  <div class="attention">
    <div class="navToggle">
      <div class="navI">谜友</div>
      <div class="navI active">活动</div>
    </div>
    <div class="attentionList">
      <div class="attentionItem">
        <div class="imgBox">
          <img src="../../assets/images/logoName.png" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="title">安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和</p>
          <p class="address">sadkfjajdfl</p>
          <p class="time">skdhkjhsldfj</p>
        </div>
      </div>
    </div>
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
.attention {
  .navToggle {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    .navI {
      text-align: center;
      padding: 10px 0 20px;
      font-size: 20px;
      color: #424242;
      &.active {
        color: #333;
        font-weight: 600;
        position: relative;
        &::after {
          display: block;
          content: "";
          position: absolute;
          width: 30px;
          height: 5px;
          background-color: #b1a1a3;
          bottom: 10px;
          left: 50%;
          margin-left: -15px;
          border-radius: 10px;
        }
      }
    }
  }
  .attentionList {
    width: 90%;
    margin: 0 auto;
    .attentionItem {
      font-size: 13px;
      display: flex;

      color: #525151;
      box-shadow: 0 0 5px 2px #ddd;
      padding: 10px;
      border-radius: 5px;
      .imgBox {
        width: 135px;
        height: 95px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wordBox {
        flex: 1;
        .title {
          width: 100%;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
        }
        .address{
          font-size: 12px;
          color: #8e8e8e;
        }
        .time{
          font-size: 12px;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
