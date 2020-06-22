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
              <img v-if="item.coverImage" :src="item.coverImage" mode="aspectFill" />
            </div>
            <div class="wordBox">
              <p class="title">{{item.title}}</p>
              <p class="peopleNum">
                人数:
                <span>{{item.num}}</span>
              </p>
              <p class="time">
                时间:
                <span>{{item.time}}</span>
              </p>
            </div>
          </div>
          <div class="info">{{item.info}}</div>
        </div>
        <div class="right">+{{item.price}}砖</div>
        <div class="bottom" v-if="handle == 1">
          <p class="status" v-if="item.status == 1">已完成</p>
          <p class="status" v-else-if="item.status == 2">已放弃</p>
          <p class="status" v-else-if="item.status == 3">审核中</p>
          <p class="status" v-else-if="item.status == 4">未通过</p>
          <div class="statusOther" v-else>
            <p class="d">待提交</p>
            <p class="f" @click.stop="abandonFun">放弃</p>
          </div>
        </div>
        <div class="bottom" v-if="handle == 2">
          <p class="status2" v-if="item.status2 == 1">审核</p>
          <div class="status2Other" v-else-if="item.status2 == 2">
            <p class="f">已完成</p>
            <p class="d"  @click.stop="againFun">再来一单</p>
          </div>
          <div class="status2Other" v-else>
            <p class="f">已过期</p>
            <p class="d" @click.stop="againFun">再来一单</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { activitysGet } from "@/api/activity";
export default {
  props: ["handle"],
  data() {
    return {
      consultList: [
        {
          coverImage: `${this.$store.state.imgUrlHttp}/head.png`,
          title: "点碧昂砍价活动",
          num: "20/50",
          time: "6小时",
          info:
            "拼多多砍价任务，砍成功给20砖。做过这种任务的来，马上提交，马上完成",
          price: 20,
          status: 1,
          status2: 1
        },
        {
          coverImage: `${this.$store.state.imgUrlHttp}/head.png`,
          title: "点碧昂砍价活动",
          num: "20/50",
          time: "6小时",
          info:
            "拼多多砍价任务，砍成功给20砖。做过这种任务的来，马上提交，马上完成",
          price: 20,
          status: 5,
          status2: 1
        },
        {
          coverImage: `${this.$store.state.imgUrlHttp}/head.png`,
          title: "点碧昂砍价活动",
          num: "20/50",
          time: "6小时",
          info:
            "拼多多砍价任务，砍成功给20砖。做过这种任务的来，马上提交，马上完成",
          price: 20,
          status: 2,
          status2: 2
        },
        {
          coverImage: `${this.$store.state.imgUrlHttp}/head.png`,
          title: "点碧昂砍价活动",
          num: "20/50",
          time: "6小时",
          info:
            "拼多多砍价任务，砍成功给20砖。做过这种任务的来，马上提交，马上完成",
          price: 20,
          status: 3,
          status2: 3
        },
        {
          coverImage: `${this.$store.state.imgUrlHttp}/head.png`,
          title: "点碧昂砍价活动",
          num: "20/50",
          time: "6小时",
          info:
            "拼多多砍价任务，砍成功给20砖。做过这种任务的来，马上提交，马上完成",
          price: 20,
          status: 4,
          status2: 3
        }
      ]
    };
  },
  mounted() {
    // this.fetchData();
  },
  methods: {
    fetchData() {
      activitysGet().then(res => {
        if (res.status == 200) {
          this.consultList = res.result.data;
        }
      });
    },
    goConsultDetails(id) {
      wx.navigateTo({
        url: `/pages/consultDetails/main`
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
    againFun(){
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
    width: 90%;
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
            .time {
              font-size: 12px;
              color: #8e8e8e;
              line-height: 14px;
            }
          }
        }
        .info {
          margin-top: 9px;
          font-size: 12px;
          line-height: 16px;
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
