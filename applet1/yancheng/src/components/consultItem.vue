<template>
  <div class="consult">
    <div class="consultList">
      <div
        class="consultItem"
        @click.stop="goConsultDetails(item.id)"
        v-for="(item,conIndex) in consultList"
        :key="conIndex"
      >
        <div class="left">
          <div class="top">
            <div class="headImg">
              <img v-if="item.images" :src="item.images" mode="aspectFill" />
            </div>
            <div class="wordBox">
              <p class="title">{{item.title}}</p>
              <p class="peopleNum">
                人数:
                <span>{{item.num}}</span>
              </p>
              <p class="createTime">
                时间:
                <span>{{item.validDay}}天</span>
              </p>
            </div>
          </div>
          <div class="content">{{item.content}}</div>
        </div>
        <div class="right">+{{item.integral}}砖</div>
        <div class="bottom" v-if="statusShow">
          <p class="status" v-if="item.status == 1">已完成</p>
          <p class="status" v-else-if="item.status == 2">待审核</p>
          <div class="statusOther" v-else>
            <p class="d">待提交</p>
            <p class="f" @click.stop="abandonFun">放弃</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["statusShow", "consultList"],
  data() {
    return {};
  },
  methods: {
    goConsultDetails(id) {
      wx.navigateTo({
        url: `/pages/consultDetails/main?soId=${id}`
      });
    },
    abandonFun() {
      wx.showModal({
        content: "确定要放弃征寻任务吗",
        success: res => {
          if (res.confirm) {
            console.log("确定");
          } else if (res.cancel) {
            console.log("取消");
          }
        }
      });
    },
    againFun() {
      wx.showModal({
        content: "确定再来一单吗",
        success: res => {
          if (res.confirm) {
            console.log("确定");
          } else if (res.cancel) {
            console.log("取消");
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.consult {
  // 活动
  .consultList {
    width: 94%;
    margin: 0 auto;
    .consultItem {
      font-size: 13px;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .left {
        width: 75%;
        .top {
          display: flex;
          .headImg {
            width: 56px;
            height: 56px;
            margin-right: 5px;
            border-radius: 56px;
            overflow: hidden;
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
            .peopleNum {
              font-size: 12px;
              color: #8e8e8e;
              line-height: 14px;
              margin-top: 5px;
              span {
                vertical-align: middle;
                color: #8e8e8e;
              }
            }
            .createTime {
              font-size: 12px;
              color: #8e8e8e;
              line-height: 14px;
            }
          }
        }
        .content {
          margin-top: 9px;
          font-size: 12px;
          line-height: 16px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .right {
        width: 25%;
        height: 16px;
        line-height: 14px;
        color: #e62727;
        font-size: 20px;
        padding: 0 5px;
        border-radius: 5px;
        text-align: center;
      }
      .bottom {
        height: 30px;
        width: 100%;
        p {
          float: right;
          font-size: 16px;
          padding: 1px 6px;
          &.status {
            color: #969696;
          }
          &.status2 {
            background-color: #e62727;
            color: #fff;
          }
        }
        .statusOther {
          p {
            color: #fff;
            &.f {
              background-color: #a9a9a9;
              margin-right: 5px;
            }
            &.d {
              background-color: #e62727;
            }
          }
        }
        .status2Other {
          p {
            color: #fff;
            &.f {
              color: #989898;
            }
            &.d {
              background-color: #e62727;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
