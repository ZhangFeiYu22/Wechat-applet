<template>
  <div class="home">
    <navigation-bar :title="'话题'" :navBackgroundColor="'#fff'" :publish-visible="1"></navigation-bar>
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
        <block v-for="(item,index) in adList" :key="index">
          <swiper-item>
            <image :src="item.imgUrl" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <img v-else class="default-image" src="/static/images/default_ad.jpg" mode="aspectFill" />
      <view class="dots">
        <block v-for="(item,index) in adList" :key="index">
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
      :style="{'top': menuFixed ? navBar_Height + 'px':0}"
      id="navFixTop"
    >
      <block v-for="(navItem,idx) in navItemList" :key="idx">
        <view
          class="nav-item"
          :class="currentTab == idx ?'active':''"
          @tap="switchNav"
          :data-current="idx"
        >{{navItem.name}}</view>
      </block>
    </scroll-view>
    <!-- 内容列表 -->
    <swiper class="tabContentListBox" :current="currentTab" duration="300" @change="switchTab">
      <!-- <swiper-item v-for="(tabItem,idx) in numA" :key="idx" class="tabContent">{{tabItem}}</swiper-item> -->
      <!-- 活动 -->
      <swiper-item class="tabContent">
        <activityItem></activityItem>
      </swiper-item>
      <!-- 投票 -->
      <swiper-item class="tabContent">
        <voteItem></voteItem>
      </swiper-item>
      <swiper-item class="tabContent">
        <consultItem></consultItem>
      </swiper-item>
    </swiper>

    <div style="height:20px"></div>
    <vue-tab-bar :selectNavIndex="3"></vue-tab-bar>
  </div>
</template>

<script>
import {
  adGet,
  forumContentGet,
  forumContentDel,
  forumContentGetLogin,
  forumLike,
  forumLikeNo
} from "@/api/home";
import { activitysGet } from "@/api/activity";
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
    consultItem
  },
  data() {
    return {
      delId: "",
      numA: [0, 1, 2, 3, 4, 5],
      navItemList: [
        {
          name: "活动"
        },
        {
          name: "投票"
        },
        {
          name: "征寻"
        },
        {
          name: "骰子"
        },
        {
          name: "真心话"
        }
      ],
      adList: [],
      acticityList: [],
      indicatorDots: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      current: 0,
      forumList: [],
      pageSize: 5, //一页显示条数
      pageIndex: 0, //页码
      total: 0, //总条数
      currentTab: 0, //nav当前激活位置
      navScrollLeft: 0, //  滚动条开始位置
      windowWidth: "",
      menuFixed: false,
      scrollTop: 0,
      menuTop: "",
      navBar_Height: ""
    };
  },
  onShow(){
    if(this.globalData.homeShowNum){
      this.currentTab = this.globalData.homeShowNum
    }
  },
  mounted() {
    this.fetchAd();
    this.fetchActiveData();
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        this.windowWidth = res.windowWidth;
      }
    });
    this.navBar_Height = wx.getStorageSync("navBar_Height");
    this.initClientRect();
  },
  methods: {
    // 获取广告位
    async fetchAd() {
      let adres = await adGet();
      if (adres.status == 200) {
        this.adList = adres.result.data;
      }
    },
    // 轮播切换时控制指示点切换
    swiperChange: function(e) {
      this.current = e.mp.detail.current;
    },
    //小菜单跳转
    navJump(path) {
      if (wx.getStorageSync("isLogin")) {
        wx.navigateTo({
          url: path
        });
      } else {
        wx.showModal({
          content: "登录获取更多权限",
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/login/main"
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    },
    // 点击切换
    switchNav(event) {
      var cur = event.target.dataset.current;
      var singleNavWidth = this.windowWidth / 6;
      this.avScrollLeft = (cur - 2) * singleNavWidth;
      if (this.currentTab == cur) {
        return false;
      } else {
        this.currentTab = cur;
      }
      if (cur == 3) {
        wx.navigateTo({
          url: `/pages/game_dice/main`
        });
      } else if (cur == 4) {
        wx.navigateTo({
          url: `/pages/game_truchOrDare/main`
        });
      }
    },
    // 滑动切换
    switchTab(event) {
      var cur = event.mp.detail.current;
      var singleNavWidth = this.windowWidth / 6;
      if (cur == 3) {
        wx.navigateTo({
          url: `/pages/game_dice/main`
        });
      } else if (cur == 4) {
        wx.navigateTo({
          url: `/pages/game_truchOrDare/main`
        });
      } else {
        this.currentTab = cur;
        this.navScrollLeft = (cur - 2) * singleNavWidth;
      }
    },
    initClientRect() {
      var that = this;
      var query = wx.createSelectorQuery();
      query.select("#navFixTop").boundingClientRect();
      query.exec(function(res) {
        that.menuTop = res[0].top - that.navBar_Height;
      });
    },
    fetchActiveData() {
      activitysGet().then(res => {
        if (res.status == 200) {
          this.acticityList = res.result.data;
        }
      });
    },
    goActivityDetails(id) {
      wx.navigateTo({
        url: `/pages/activityDetails/main?activityId=${id}`
      });
    }
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
  onPullDownRefresh: function() {
    console.log("下拉刷新");
  }
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
    position: sticky;
    top: 0;
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

  // 内容列表
  .tabContentListBox {
    background: #f6f6f6;
    height: 100%;
    box-sizing: border-box;
    .tabContent {
      overflow-y: scroll;
      padding: 10px 0 20px;
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
  }
}
</style>
