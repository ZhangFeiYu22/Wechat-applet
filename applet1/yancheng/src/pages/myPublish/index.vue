<template>
  <div class="myPublish">
    <navigation-bar
      :title="'我的发布'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="navBox">
      <div class="navItem" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">
        <!-- <img src="../../../static/images/aaa1.png" mode="aspectFill"> -->
        <i class="iconfont icon-huati"></i>
        <!-- <p>话题</p> -->
      </div>
      <div class="navItem" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">
        <!-- <img src="../../../static/images/aaa1.png" mode="aspectFill"> -->
        <i class="iconfont icon-xiangji"></i>
        <!-- <p>状态</p> -->
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in ItemList" :key="index">
        <!-- <div class="headName" @click.stop="goPersonal">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          <span>张小凡</span>
        </div>-->
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
            <!-- <i class="iconfont icon-sixin"></i> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      likeAct: false,
      itemActive: 0,
      ItemList: [
        {
          showEllip: false,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨",
          picList: [
            `${this.$store.state.imgUrlHttp}/a1.png`,
            `${this.$store.state.imgUrlHttp}/a2.png`,
            `${this.$store.state.imgUrlHttp}/a3.png`,
            `${this.$store.state.imgUrlHttp}/a4.png`,
            `${this.$store.state.imgUrlHttp}/a5.png`,
            `${this.$store.state.imgUrlHttp}/a6.png`,
          ]
        },
        {
          showEllip: true,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨，淅淅沥沥的春雨就飘然而至，莺飞草长，一泓碧水粼粼而起，杨柳拂堤，碧草如丝，繁花似锦，飞泉鸣溅，古寺的梵音在石缝间流淌，雨后的空气溢出清新的芳香。而后是杏花雨，梨花雨，暮春过后，连绵不断的黄梅雨又弥漫江南。夜晚的雨声，清晨的花香，清绝的令人深深沉醉，秀雅的让人不舍离去。纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵",
          picList: [
            `${this.$store.state.imgUrlHttp}/a7.png`,
            `${this.$store.state.imgUrlHttp}/a8.png`,
            `${this.$store.state.imgUrlHttp}/a9.png`,
            `${this.$store.state.imgUrlHttp}/a10.png`
          ]
        }
      ]
    };
  },
  methods: {
    itemToggle(num) {
      this.itemActive = num;
    },
    goMessage() {
      wx.navigateTo({
        url: "/pages/message/main"
      });
    },
    goTopic() {
      wx.navigateTo({
        url: "/pages/topicDetails/main"
      });
    },

    requireTxt(index) {
      let val = this.ItemList[index].showEllip;
      if (val) {
        this.ItemList[index].showEllip = false;
      } else {
        this.ItemList[index].showEllip = true;
      }
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
};
</script>

<style lang="less" scoped>
.myPublish {
  .navBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 15px 0 0px;
    .navItem {
      i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        font-size: 30px;
        color: #999;
      }
      p {
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        color: #e83e3e;
      }
      &.active {
        i {
          color: #111;
          font-weight: 600;
        }
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
          width: 16%;
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
