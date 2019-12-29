<template>
  <div class="message">
    <div class="friendsList">
      <div class="friendsItem" @click="goMessageDetail">
        <div class="imgBox">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="name">
            <span>张小凡</span>
            <i class="iconfont icon-nan"></i>
          </p>
          <p class="info">
            对你说：
            <span>你就是个棒槌</span>
          </p>
        </div>
      </div>
      <div class="friendsItem" @click="goMessageDetail">
        <div class="imgBox">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="name">
            <span>张大凡</span>
            <i class="iconfont icon-nv"></i>
          </p>
          <p class="info">
            对你说：
            <span>棒槌你个大头鬼，你就是个棒槌，大棒槌</span>
          </p>
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
  methods: {
    goMessageDetail() {
      wx.navigateTo({
        url: "/pages/messageDetails/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  padding-top: 20px;
  // 谜友
  .friendsList {
    width: 90%;
    margin: 0 auto;
    .friendsItem {
      font-size: 13px;
      display: flex;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      .imgBox {
        width: 46px;
        height: 46px;
        margin-right: 15px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wordBox {
        flex: 1;
        .name {
          line-height: 26px;
          span {
            font-size: 16px;
            color: #333;
            vertical-align: middle;
          }
          i {
            font-size: 18px;
            margin-left: 10px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .info {
          height: 14px;
          line-height: 14px;
          color: #797979;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 1; //显示的行
          line-clamp: 1; //显示的行
        }
      }
    }
  }
}
</style>
