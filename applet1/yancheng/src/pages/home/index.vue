<template>
  <div class="home">
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
    <!-- <div class="navBox w94">
      <div class="navItem" v-for="(item,index) in navItemList" :key="index" @click="navJump(index)">
        <div class="navIcon">
          <img :src="item.imgUrl" mode="aspectFill" />
        </div>
        <div class="navTitle">{{item.title}}</div>
      </div>
    </div> -->
    <!-- 广告 -->
    <!-- <div class="ad w94">
      <img src="../../../static/images/aaa1.png" mode="aspectFill" />
    </div> -->
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in ItemList" :key="index">
        <div class="headName" @click.stop="goPersonal">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          <span>张小凡</span>
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
            v-for="(picItem,picIndex) in item.picList"
            :key="picIndex"
            @click.stop="showImg(index,picIndex)"
          >
            <img :src="picItem" mode="aspectFill" />
          </div>
        </div>
        <div class="timeHandle">
          <div class="time">10分钟前</div>
          <div class="handle">
            <i class="iconfont" :class="likeAct?'icon-aixin1':'icon-aixin0'" @click.stop="likeFun"></i>
            <i class="iconfont icon-pinglun" @click.stop="goTopic"></i>
            <i class="iconfont icon-sixin"></i>
          </div>
        </div>
      </div>
    </div>
    <div style="height:80px"></div>
  </div>
</template>

<script>
import navBar from "@/components/navbar";
export default {
  components: {
    navBar
  },
  data() {
    return {
      likeAct: false,
      carrouseList: [
        { imgUrl: require("../../../static/images/aaa1.png") },
        { imgUrl: require("../../../static/images/aaa1.png") },
        { imgUrl: require("../../../static/images/aaa1.png") },
        { imgUrl: require("../../../static/images/aaa1.png") }
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      current: 0,
      // navItemList: [
      //   {
      //     imgUrl: require("../../../static/images/guanzhu.png"),
      //     title: "关注"
      //   },
      //   { imgUrl: require("../../../static/images/qingxu.png"), title: "情绪" },
      //   {
      //     imgUrl: require("../../../static/images/shejiao.png"),
      //     title: "社交"
      //   },
      //   { imgUrl: require("../../../static/images/aihao.png"), title: "爱好" },
      //   {
      //     imgUrl: require("../../../static/images/shenghuo.png"),
      //     title: "生活"
      //   }
      // ],
      ItemList: [
        {
          showEllip: false,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨",
          picList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        },
        {
          showEllip: true,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨，淅淅沥沥的春雨就飘然而至，莺飞草长，一泓碧水粼粼而起，杨柳拂堤，碧草如丝，繁花似锦，飞泉鸣溅，古寺的梵音在石缝间流淌，雨后的空气溢出清新的芳香。而后是杏花雨，梨花雨，暮春过后，连绵不断的黄梅雨又弥漫江南。夜晚的雨声，清晨的花香，清绝的令人深深沉醉，秀雅的让人不舍离去。纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵",
          picList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        }
      ]
    };
  },
  methods: {
    // 轮播切换时控制指示点切换
    swiperChange: function(e) {
      this.current = e.mp.detail.current;
    },
    requireTxt(index) {
      let val = this.ItemList[index].showEllip;
      if (val) {
        this.ItemList[index].showEllip = false;
      } else {
        this.ItemList[index].showEllip = true;
      }
    },
    navJump(num) {
      if (num == 1) {
        wx.navigateTo({
          url: "/pages/emotion/main"
        });
      } else if (num == 0) {
        wx.navigateTo({
          url: "/pages/myAttention/main"
        });
      }
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    goTopic() {
      wx.navigateTo({
        url: "/pages/topicDetails/main"
      });
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.ItemList[outIdx].picList;
      console.log(imgArr);
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    likeFun() {
      this.likeAct = !this.likeAct;
      if (this.likeAct) {
        wx.showToast({
          title: "关注成功",
          icon: "none",
          duration: 1500
        });
      } else {
        wx.showToast({
          title: "取消关注",
          icon: "none",
          duration: 1500
        });
      }
    }
  },
  onTabItemTap(item) {
    wx.setStorageSync('tabItemClick', item.pagePath)
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
        width: 32px;
        height: 32px;
        margin: 0 auto 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .navTitle {
        font-size: 16px;
      }
    }
  }
  // 广告
  .ad {
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
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
        .more_txt{
          span{
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
