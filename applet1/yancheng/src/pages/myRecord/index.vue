<template>
  <div class="attention">
    <navigation-bar :title="'记录'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="navToggle">
      <div class="navI" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">活动</div>
      <div class="navI" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">投票</div>
      <div class="navI" :class="itemActive == '2' ? 'active' : ''" @click="itemToggle('2')">征寻</div>
    </div>
    <div class="activityList list" v-if="itemActive == 1">
      <activityItem :acticityList="acticityList"></activityItem>
    </div>
    <div class="voteList list" v-if="itemActive == 0">
      <voteItem :headShow="true" :voteLists="voteLists"></voteItem>
    </div>
    <div class="consultList" v-if="itemActive == 2">
      <consultItem :statusShow="false" :consultList="solicitLists"></consultItem>
    </div>
  </div>
</template>

<script>
import { activitysRecord } from "@/api/activity";
import { solicitRecord } from "@/api/solicit";
import { voteRecord } from "@/api/vote";
import navigationBar from "@/components/navigationBar";
import consultItem from "@/components/consultItem";
import voteItem from "@/components/voteItem";
import activityItem from "@/components/activityItem";
export default {
  components: {
    navigationBar,
    activityItem,
    consultItem,
    voteItem
  },
  data() {
    return {
      itemActive: 1,
      acticityList: [],
      solicitLists: [],
      voteLists: [],
      // 分页数据
      pageData: {
        pageSize: 5, //一页显示条数
        pageIndex: 0, //页码
        total: 0 //总条数
      }
    };
  },
  mounted() {
    this.itemActive = 1;
    this.fetchActivitysRecord();
  },
  methods: {
    async fetchActivitysRecord() {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let arRes = await activitysRecord(data);
      if (arRes.status == 200) {
        _this.pageData.total = arRes.result.total;
        let acticityList = arRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.acticityList = _this.acticityList.concat(acticityList);
        } else {
          _this.acticityList = acticityList;
        }
      }
    },
    async fetchSolicitRecord() {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let srRes = await solicitRecord(data);
      if (srRes.status == 200) {
        _this.pageData.total = srRes.result.total;
        let solicitLists = srRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.solicitLists = _this.solicitLists.concat(solicitLists);
        } else {
          _this.solicitLists = solicitLists;
        }
      }
    },
    async fetchVoteRecord() {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let vrRes = await voteRecord(data);
      if (vrRes.status == 200) {
        _this.pageData.total = vrRes.result.total;
        let voteListsMap = vrRes.result.data;
        let voteLists = voteListsMap.map(vo => {
          if (vo.options) {
            vo.options = JSON.parse(vo.options);
          }
          if (vo.images) {
            vo.images = vo.images.split("|");
          }
          return vo;
        });
        if (_this.pageData.pageIndex > 0) {
          _this.voteLists = _this.voteLists.concat(voteLists);
        } else {
          _this.voteLists = voteLists;
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
      if (num == 1) {
        this.fetchActivitysRecord();
      } else if (num == 2) {
        this.fetchSolicitRecord();
      } else {
        this.fetchVoteRecord();
      }
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    goActivityDetails() {
      wx.navigateTo({
        url: "/pages/activityDetails/main"
      });
    }
  },
  onReachBottom: function() {
    if (this.itemActive == 1) {
      if (this.acticityList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchActivitysRecord();
      }
    } else if (this.navType == 2) {
      if (this.solicitLists.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchSolicitRecord();
      }
    } else {
      if (this.voteLists.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchVoteRecord();
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
    margin-bottom: 5px;
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
  // 投票
  .voteList {
    margin: 10px auto;
    // 内容列表
    .contentItem {
      box-shadow: 0 0 2px 2px #eee;
      border-radius: 10px;
      padding: 25px 10px;
      margin-bottom: 20px;
      .headName {
        display: flex;
        margin-bottom: 10px;
        .headImg {
          width: 35px;
          height: 35px;
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
              line-height: 35px;
              color: #403f3f;
            }
          }
        }
      }
      .content {
        line-height: 20px;
        color: #6f6d6d;
        font-size: 16px;
        text-align: justify;
        &.ellip {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
        }
      }
      .toggleBox {
        font-size: 16px;
        color: #6f6d6d;
        .more_txt {
          span {
            border-bottom: 1px solid #6f6d6d;
          }
        }
      }
      .imgsList {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
        .imgsItem {
          width: 32%;
          height: 115px;
          margin-bottom: 5px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .timeHandle {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        align-items: center;
        font-size: 14px;
        .time {
          color: #7e7e7e;
          font-size: 12px;
          span {
            margin-left: 4px;
          }
        }
        .joinNum {
          color: #343434;
          font-size: 12px;
          span {
            margin-left: 4px;
          }
        }
      }
      .selectBox {
        .selList {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          i {
            width: 12px;
            height: 12px;
            border-radius: 20px;
            border: 1px solid #1097ff;
            margin-right: 10px;
          }
          .miaosu {
            flex: 1;
            font-size: 12px;
            color: #b4b4b4;
            line-height: 26px;
            border-bottom: 1px solid #b4b4b4;
          }
          .bili {
            width: 35px;
            font-size: 12px;
            color: #737373;
          }
          &.active {
            i {
              position: relative;
              background-color: #1097ff;
              &:after {
                position: absolute;
                top: 0px;
                left: 3px;
                content: "";
                display: block;
                width: 3px;
                height: 8px;
                border-right: 1px solid #fff;
                border-bottom: 1px solid #fff;
                transform: rotate(45deg);
              }
            }
            .miaosu {
              color: #000;
              border-bottom: 1px solid #1097ff;
            }
          }
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
