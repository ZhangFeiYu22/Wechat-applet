<template>
  <div class="attention">
    <navigation-bar :title="'关注'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <!-- <div class="navToggle">
      <div class="navI" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">谜友</div>
      <div class="navI" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">活动</div>
    </div> -->
    <div class="friendsList list" v-if="itemActive == 0">
      <div
        class="friendsItem item"
        v-for="item in mfDataList"
        :key="item"
        @click="goPersonal(item.followId)"
      >
        <div class="imgBox">
          <img v-if="item.properties.avatar" :src="item.properties.avatar" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="name">
            <span>{{item.properties.nickName}}</span>
            <i class="iconfont icon-nan" v-if="item.properties.gender == 1"></i>
            <i class="iconfont icon-nv" v-else-if="item.properties.gender == 2"></i>
            <i class="iconfont" v-else></i>
          </p>
          <p class="info">{{item.properties.introduction}}</p>
        </div>
      </div>
    </div>
    <activityItem :acticityList="acticityList" v-else></activityItem>
  </div>
</template>

<script>
import { myFollow, myFollowActivity } from "@/api/my.js";
import navigationBar from "@/components/navigationBar";
import activityItem from "@/components/activityItem";
export default {
  components: {
    navigationBar,
    activityItem
  },
  data() {
    return {
      itemActive: 0,
      headImg1: `${this.$store.state.imgUrlHttp}/a6.png`,
      headImg2: `${this.$store.state.imgUrlHttp}/a5.png`,
      actImg1: `${this.$store.state.imgUrlHttp}/d1.png`,
      actImg2: `${this.$store.state.imgUrlHttp}/d1.png`,
      // 分页数据
      pageData: {
        pageSize: 5, //一页显示条数
        pageIndex: 0, //页码
        total: 0 //总条数
      },
      mfDataList: [],
      acticityList: []
    };
  },
  mounted() {
    this.fetchFollowPeople();
  },
  methods: {
    async fetchFollowPeople() {
      let _this = this;
      var data = {
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageIndex
      };
      let mfRes = await myFollow(data);
      if (mfRes.status == 200) {
        let mfDataList = mfRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.mfDataList = _this.mfDataList.concat(mfDataList);
        } else {
          _this.mfDataList = mfDataList;
        }
      }
    },
    async fetchFollowActicity() {
      let _this = this;
      var data = {
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageIndex
      };
      let mfRes = await myFollowActivity(data);
      _this.pageData.total = mfRes.result.total;
      if (mfRes.status == 200) {
        let acticityList = mfRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.acticityList = _this.acticityList.concat(acticityList);
        } else {
          _this.acticityList = acticityList;
        }
      }
    },

    itemToggle(num) {
      this.itemActive = num;
      this.pageData = {
        pageSize: 5,
        pageIndex: 0,
        total: 0
      };
      if (num == "0") {
        this.fetchFollowPeople();
      } else if (num == "1") {
        this.fetchFollowActicity();
      }
    },
    goPersonal(id) {
      wx.navigateTo({
        url: `/pages/personal/main?createrId=${id}`
      });
    },
    goActivityDetails() {
      wx.navigateTo({
        url: "/pages/activityDetails/main"
      });
    }
  },
  onReachBottom: function() {
    if (this.itemActive == 0) {
      if (this.mfDataList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchFollowPeople();
      }
    } else if (this.itemActive == 1) {
      if (this.acticityList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchFollowActicity();
      }
    }
  }
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
      font-size: 18px;
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
  .list {
    width: 90%;
    margin: 2px auto;
    .item {
      font-size: 13px;
      display: flex;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  }
  // 谜友
  .friendsList {
    .friendsItem {
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
  // 活动
  .activityList {
    .activityItem {
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
    }
  }
}
</style>
