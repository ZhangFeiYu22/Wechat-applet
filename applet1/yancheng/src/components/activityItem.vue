<template>
  <div class="activity">
    <div class="activityList">
      <div
        class="activityItem"
        @click="goActivityDetails(item.id)"
        v-for="(item,acIndex) in acticityList"
        :key="acIndex"
      >
        <div class="imgBox">
          <img v-if="item.coverImage" :src="item.coverImage" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="title">{{item.title}}</p>
          <p class="address">
            <i class="iconfont icon-dingwei"></i>
            <span>{{item.activityAddress}}</span>
          </p>
          <p class="time">
            <i class="iconfont icon-shijian"></i>
            <span>{{item.activityTime}}</span>
          </p>
        </div>
        <div class="priceBtn">￥{{item.activityFee}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["acticityList"],
  data() {
    return {};
  },
  methods: {
    goActivityDetails(id) {
      wx.navigateTo({
        url: `/pages/activityDetails/main?activityId=${id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.activity {
  // 活动
  .activityList {
    width: 94%;
    margin: 0 auto;
    .activityItem {
      font-size: 13px;
      display: flex;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      position: relative;
      .imgBox {
        width: 135px;
        height: 95px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wordBox {
        flex: 1;
        .title {
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
          line-clamp: 2; //显示的行
          font-size: 16px;
        }
        .address {
          font-size: 12px;
          color: #8e8e8e;
          line-height: 20px;
          margin-top: 5px;
        }
        .time {
          font-size: 12px;
          color: #8e8e8e;
          line-height: 20px;
        }
        i {
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
          font-size: 14px;
          color: #8e8e8e;
        }
        span {
          vertical-align: middle;
          color: #8e8e8e;
        }
      }
      .priceBtn {
        position: absolute;
        right: 10px;
        bottom: 10px;
        height: 16px;
        line-height: 14px;
        border: 1px solid #b1a1a3;
        color: #b1a1a3;
        font-size: 12px;
        padding: 0 5px;
        border-radius: 5px;
      }
    }
  }
}
</style>
