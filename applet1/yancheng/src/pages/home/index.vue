<template>
  <div class="home">
    <navigation-bar :title="'城谜'" :navBackgroundColor="'#fff'" :publish-visible="1"></navigation-bar>
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
        v-if="carrouseList.length != 0"
      >
        <block v-for="(item,index) in carrouseList" :key="index">
          <swiper-item>
            <image :src="item.imgUrl" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <!-- <img v-else class="default-image" src="/static/images/default_ad.jpg" mode="aspectFill" /> -->
      <view class="dots">
        <block v-for="(item,index) in carrouseList" :key="index">
          <view :class="index == current ? ' active' : ''" class="dot"></view>
        </block>
      </view>
    </div>
    <!-- 小菜单 -->
    <div class="navBox w94">
      <div
        class="navItem"
        v-for="(item,index) in navItemList"
        :key="index"
        @click="navJump(item.jumpPath)"
      >
        <div class="navIcon">
          <i class="iconfont" :class="item.iconClass"></i>
        </div>
        <div class="navTitle">{{item.name}}</div>
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in forumList" :key="index">
        <div class="headName" @click.stop="goPersonal">
          <img v-if="item.createrAvatar" :src="item.createrAvatar" mode="aspectFill" />
          <span>{{item.createrName}}</span>
        </div>
        <div
          class="content"
          id="contentInfo"
          :class="item.showEllip ? 'ellip' : ''"
        >{{item.content}}</div>
        <div v-if="item.showEllip" class="toggleBox">
          <div class="more_txt" @click.stop="requireTxt(index)">
            <span>{{item.showEllip ? '展开' : '收起'}}</span>
          </div>
        </div>
        <!-- 图片展示 -->
        <div class="imgsList">
          <div
            class="imgsItem"
            v-for="(picItem,picIndex) in item.images"
            :key="picIndex"
            @click.stop="showImg(index,picIndex)"
          >
            <img v-if="picItem" :src="picItem" mode="aspectFill" />
          </div>
        </div>
        <div class="timeHandle">
          <div class="time">{{item.createTime}}</div>
          <div class="handle">
            <i
              class="iconfont"
              :class="item.isLike == 1 ?'icon-aixin1':'icon-aixin0'"
              @click.stop="likeFun(item.isLike,item.id,index)"
            ></i>
            <i class="iconfont icon-pinglun" @click.stop="goTopic(item.id)"></i>
            <i class="iconfont icon-sixin" @click.stop="goTopic(item.id)"></i>
          </div>
        </div>
      </div>
    </div>
    <div style="height:20px"></div>
  </div>
</template>

<script>
import { forumContentGet, forumLike, forumLikeNo } from "@/api/home";
import { getDateDiff } from "@/utils/getDateDiff";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      navItemList: [
        {
          name: "活动",
          iconClass: "icon-huodong",
          jumpPath: "/pages/activity/main"
        },
        {
          name: "投票",
          iconClass: "icon-navicon-tp",
          jumpPath: "/pages/vote/main"
        },
        {
          name: "骰子",
          iconClass: "icon-touzi",
          jumpPath: "/pages/game_dice/main"
        },
        {
          name: "真心话",
          iconClass: "icon-xintiao",
          jumpPath: "/pages/game_truchOrDare/main"
        }
      ],
      carrouseList: [
        { imgUrl: `${this.$store.state.imgUrlHttp}/c1.png` },
        { imgUrl: `${this.$store.state.imgUrlHttp}/c1.png` },
        { imgUrl: `${this.$store.state.imgUrlHttp}/c1.png` },
        { imgUrl: `${this.$store.state.imgUrlHttp}/c1.png` }
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      current: 0,
      headImg: `${this.$store.state.imgUrlHttp}/head.png`,
      forumList: []
    };
  },
  mounted() {
    this.fetchForumContentList();
  },
  methods: {
    fetchForumContentList() {
      forumContentGet().then(res => {
        if (res.status == 200) {
          var resData = res.result.data;
          resData.map(item => {
            if (item.images !== "") {
              item.images = item.images.split(";");
            }
            if (item.content.length > 80) {
              item["showEllip"] = true;
            } else {
              item["showEllip"] = false;
            }
            if (item.createTime) {
              let dateStr = item.createTime;
              item.createTime = getDateDiff(dateStr);
            }
          });
          this.forumList = resData;
        }
      });
    },
    // 轮播切换时控制指示点切换
    swiperChange: function(e) {
      this.current = e.mp.detail.current;
    },
    requireTxt(index) {
      let val = this.forumList[index].showEllip;
      if (val) {
        this.forumList[index].showEllip = false;
      } else {
        this.forumList[index].showEllip = true;
      }
    },
    navJump(path) {
      wx.navigateTo({
        url: path
      });
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    goTopic(id) {
      wx.navigateTo({
        url: `/pages/topicDetails/main?forumContentId=${id}`
      });
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.forumList[outIdx].images;
      console.log(imgArr);
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    likeFun(isLike, id, index) {
      var _this = this;
      if (isLike == 2) {
        forumLike(id).then(res => {
          if (res.status == 200) {
            _this.forumList[index].isLike = 1;
            wx.showToast({
              title: "关注成功",
              icon: "none",
              duration: 1500
            });
          }
        });
      } else {
        forumLikeNo(id).then(res => {
          console.log("p----", res);
          if (res.status == 200) {
            _this.forumList[index].isLike = 2;
            wx.showToast({
              title: "取消关注",
              icon: "none",
              duration: 1500
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
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
      bottom: -5px;
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
  .navBox {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    .navItem {
      width: 25%;
      .navIcon {
        margin-bottom: 8px;
        i {
          font-size: 26px;
        }
      }
      .navTitle {
        font-size: 16px;
      }
    }
  }
  // 内容列表
  .contentList {
    margin-top: 20px;
    .contentItem {
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 20px;
      .headName {
        margin-bottom: 10px;
        img {
          width: 28px;
          height: 28px;
          vertical-align: middle;
          margin-right: 5px;
          border-radius: 100%;
        }
        span {
          font-size: 18px;
          vertical-align: middle;
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
        flex-wrap: wrap;
        margin-top: 10px;
        .imgsItem {
          width: 32%;
          margin-right: 1.3333%;
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
        .time {
          width: 40%;
          font-size: 14px;
          color: #8b8b8b;
        }
        .handle {
          width: 25%;
          display: flex;
          justify-content: space-between;
          .iconfont {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
