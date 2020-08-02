<template>
  <div class="home">
    <navigation-bar
      :title="'话题'"
      :navBackgroundColor="'#fff'"
      :publish-visible="1"
    ></navigation-bar>
    <!-- 轮播 -->
    <div class="carrousel w94">
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        circular
        class="swiper-box"
        @change="swiperChange"
        v-if="adList.length != 0"
      >
        <block v-for="(item, index) in adList" :key="index">
          <swiper-item>
            <image :src="item.imgUrl" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <img
        v-else
        class="default-image"
        src="/static/images/default_ad.jpg"
        mode="aspectFill"
      />
      <view class="dots">
        <block v-for="(item, index) in adList" :key="index">
          <view :class="index == current ? ' active' : ''" class="dot"></view>
        </block>
      </view>
    </div>
    <!-- tab导航栏 -->
    <!-- scroll-left属性可以控制滚动条位置 -->
    <!-- scroll-with-animation滚动添加动画过渡 -->
    <scroll-view
      scroll-x="true"
      class="navListBox"
      :class="menuFixed ? 'fixedTop' : ''"
      :scroll-left="navScrollLeft"
      :scroll-with-animation="true"
      :style="{ top: menuFixed ? navBar_Height + 'px' : 0 }"
      id="navFixTop"
    >
      <block v-for="(navItem, idx) in navItemList" :key="idx">
        <view
          class="nav-item"
          :class="currentTab == idx ? 'active' : ''"
          @tap="switchNav"
          :data-current="idx"
          >{{ navItem.name }}</view
        >
      </block>
    </scroll-view>
    <div v-if="menuFixed" style="height: 45px;"></div>
    <!-- 填充高度 -->
    <!-- 内容列表 -->
    <!-- 活动 -->
    <div class="tabContent act" v-if="currentTab == 0">
      <activityItem :acticityList="acticityList"></activityItem>
    </div>
    <!-- 投票 -->
    <div class="tabContent act" v-if="currentTab == 1">
      <voteItem :headShow="true" :voteLists="voteLists"></voteItem>
    </div>
    <!-- 征寻 -->
    <div class="tabContent act" v-if="currentTab == 2">
      <consultItem
        :statusShow="false"
        :consultList="solicitLists"
      ></consultItem>
    </div>
    <div style="height: 20px;"></div>
    <vue-tab-bar :selectNavIndex="3"></vue-tab-bar>

    <!-- 弹窗广告 -->
    <div class="adPop" v-show="adPopShow">
      <div class="popBox">
        <img v-if="popUrl" :src="popUrl" alt />
        <i class="iconfont icon-close" @click="closeAdPop"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {
  adGet,
  forumContentGet,
  forumContentDel,
  forumContentGetLogin,
  forumLike,
  forumLikeNo,
} from "@/api/home";
import { activitysGet } from "@/api/activity";
import { voteListHasLogin, voteListNoLogin } from "@/api/vote";
import { solicitListGet } from "@/api/solicit";
import { getDateDiff } from "@/utils/getDateDiff";
import navigationBar from "@/components/navigationBar";
import vueTabBar from "@/components/vueTabBar";
import activityItem from "@/components/activityItem";
import voteItem from "@/components/voteItem";
import consultItem from "@/components/consultItem";
export default {
  components: {
    navigationBar,
    vueTabBar,
    activityItem,
    voteItem,
    consultItem,
  },
  data() {
    return {
      popUrl: "", //弹出广告图片地址
      adPopShow: true,
      delId: "",
      navItemList: [
        {
          name: "活动",
        },
        {
          name: "投票",
        },
        {
          name: "征寻",
        },
        {
          name: "骰子",
        },
        {
          name: "真心话",
        },
      ],
      adList: [],
      acticityList: [],
      voteLists: [],
      solicitLists: [],
      // 分页数据
      pageData: {
        pageSize: 5, //一页显示条数
        pageIndex: 0, //页码
        total: 0, //总条数
      },
      indicatorDots: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      current: 0,

      currentTab: 0, //nav当前激活位置
      navScrollLeft: 0, //  滚动条开始位置
      windowWidth: "",
      menuFixed: false,
      scrollTop: 0,
      menuTop: "",
      navBar_Height: "",
    };
  },
  onShow() {
    if (this.globalData.homeShowNum) {
      this.currentTab = this.globalData.homeShowNum;
      if (this.currentTab == 0) {
        this.fetchActiveData();
      } else if (this.currentTab == 1) {
        this.fetchVoteData();
      } else if (this.currentTab == 2) {
        this.fetchSolicitData();
      }
    }
  },
  mounted() {
    this.fetchAd();
    this.fetchActiveData();
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.windowWidth = res.windowWidth;
      },
    });
    this.navBar_Height = wx.getStorageSync("navBar_Height");
    this.initClientRect();
  },
  methods: {
    closeAdPop() {
      this.adPopShow = false;
    },
    // 获取广告位
    async fetchAd() {
      let adres = await adGet();
      if (adres.status == 200) {
        let adres_result = adres.result.data;
        this.adList = adres_result.filter((item) => item.type == 1);
        let adres_result_time = adres_result.map((item) => {
          let time1 = item.createTime.replace(/-/g, "/");
          let time2 = Date.parse(time1) / 1000;
          item.createTime = time2;
          return item;
        });
        console.log('adres_result_time---',adres_result_time)
        let diaImgArr_2 = adres_result_time.filter((item) => item.type == 2 || item.type == 3);
        console.log('diaImgArr_2----',diaImgArr_2)
        const maxTime = Math.max.apply(
          Math,
          diaImgArr_2.map((item) => item.createTime)
        );
        let maxResult = diaImgArr_2.find(
          (item) => maxTime == item.createTime
        );
        console.log('maxResult--图片弹窗显示-',maxResult)
        this.popUrl = maxResult.imgUrl;
        }
      
    },
    // 轮播切换时控制指示点切换
    swiperChange: function (e) {
      this.current = e.mp.detail.current;
    },
    //小菜单跳转
    navJump(path) {
      if (wx.getStorageSync("isLogin")) {
        wx.navigateTo({
          url: path,
        });
      } else {
        wx.showModal({
          content: "登录获取更多权限",
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/login/main",
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
      }
    },
    // 点击切换
    switchNav(event) {
      var cur = event.target.dataset.current;
      var singleNavWidth = this.windowWidth / 6;
      this.avScrollLeft = (cur - 2) * singleNavWidth;
      this.pageData = {
        pageSize: 5,
        pageIndex: 0,
        total: 0,
      };
      if (this.currentTab == cur) {
        return false;
      } else {
        if (cur < this.navItemList.length - 2) {
          this.currentTab = cur;
          this.globalData.homeShowNum = cur;
        }
      }
      switch (cur) {
        case 0:
          this.fetchActiveData();
          break;
        case 1:
          this.fetchVoteData();
          break;
        case 2:
          this.fetchSolicitData();
          break;
        case 3:
          wx.navigateTo({
            url: `/pages/game_dice/main`,
          });
          break;
        case 4:
          wx.navigateTo({
            url: `/pages/game_truchOrDare/main`,
          });
          break;

        default:
          break;
      }
    },
    initClientRect() {
      var that = this;
      var query = wx.createSelectorQuery();
      query.select("#navFixTop").boundingClientRect();
      query.exec(function (res) {
        that.menuTop = res[0].top - that.navBar_Height;
      });
    },
    async fetchActiveData() {
      let _this = this;
      var data = {
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageIndex,
      };
      let acRes = await activitysGet(data);
      if (acRes.status == 200) {
        wx.stopPullDownRefresh();
        _this.pageData.total = acRes.result.total;
        let acticityList = acRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.acticityList = _this.acticityList.concat(acticityList);
        } else {
          _this.acticityList = acticityList;
        }
      }
    },
    async fetchVoteData() {
      let _this = this;
      let voRes;
      var data = {
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageIndex,
      };

      if (wx.getStorageSync("isLogin")) {
        voRes = await voteListHasLogin(data);
      } else {
        voRes = await voteListNoLogin(data);
      }

      if (voRes.status == 200) {
        wx.stopPullDownRefresh();
        _this.pageData.total = voRes.result.total;
        let voteListsMap = voRes.result.data;
        let voteLists = voteListsMap.map((vo) => {
          if (vo.options) {
            vo.options = JSON.parse(vo.options);
          }
          if (vo.images) {
            vo.images = vo.images.split("|");
          }
          return vo;
        });
        if (_this.pageData.pageIndex > 0) {
          console.log("加载");
          _this.voteLists = _this.voteLists.concat(voteLists);
        } else {
          console.log("==");
          _this.voteLists = voteLists;
        }
      }
    },
    async fetchSolicitData() {
      let _this = this;
      var data = {
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageIndex,
      };
      let soRes = await solicitListGet(data);
      if (soRes.status == 200) {
        wx.stopPullDownRefresh();
        _this.pageData.total = soRes.result.total;
        let solicitLists = soRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.solicitLists = _this.solicitLists.concat(solicitLists);
        } else {
          _this.solicitLists = solicitLists;
        }
      }
    },
  },
  //监听屏幕滚动 判断上下滚动
  onPageScroll(scroll) {
    if (scroll.scrollTop >= this.menuTop) {
      if (this.menuFixed) {
        return;
      }
      this.menuFixed = true;
    } else {
      this.menuFixed = false;
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.fetchAd();
    if (this.currentTab == 0) {
      this.fetchActiveData();
    } else if (this.currentTab == 1) {
      this.fetchVoteData();
    } else if (this.currentTab == 2) {
      this.fetchSolicitData();
    }

    console.log("下拉刷新");
  },
  onReachBottom: function () {
    if (this.currentTab == 0) {
      if (this.acticityList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000,
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchActiveData();
      }
    } else if (this.currentTab == 1) {
      if (this.voteLists.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000,
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchVoteData();
      }
    } else if (this.currentTab == 2) {
      if (this.solicitLists.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000,
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchSolicitData();
      }
    }
  },
  onShareAppMessage() {
    return {
      title: "城谜",
      path: "/pages/home/main", // 分享的页面路径，一般设置首页
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  // 轮播
  .carrousel {
    height: 185px;
    position: relative;
    .swiper-box {
      width: 100%;
      height: 175px;
      border-radius: 8px;
      overflow: hidden;
      transform: translateY(0);
      .slide-image {
        width: 100%;
        height: 100%;
      }
      .slide-video {
        width: 100%;
        height: 100%;
      }
    }
    .default-image {
      width: 100%;
      height: 100%;
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 15px;
      display: flex;
      justify-content: center;
      .dot {
        display: block;
        margin: 0 4px;
        width: 5px;
        height: 5px;
        background: #dedede;
        border-radius: 5rpx;
        transition: all linear 0.3s;
        &.active {
          width: 11px;
          background: #b1a1a3;
        }
      }
    }
  }
  // 小菜单
  .navListBox {
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 40px;
    background: #fff;
    font-size: 16px;
    white-space: nowrap;
    padding: 5px 10px;
    &.fixedTop {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 99;
    }
    .nav-item {
      // padding: 0 10px;
      width: 15%;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      &.active {
        color: red;
      }
    }
  }

  .tabContent {
    overflow-y: scroll;
    // padding: 10px 0 20px;
    &.act {
      padding: 10px 0 20px;
    }
    .activityList {
      width: 90%;
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
  // 广告弹窗
  .adPop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    .popBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .icon-close {
        display: inline-block;
        border: 1px solid #fff;
        padding: 4px;
        font-size: 18px;
        border-radius: 100%;
        color: #fff;
        position: relative;
        font-weight: 600;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
