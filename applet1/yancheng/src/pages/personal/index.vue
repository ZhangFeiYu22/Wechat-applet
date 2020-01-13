<template>
  <div class="my">
    <div class="head">
      <div class="headImg">
        <img src="../../../static/images/aaa1.png" mode="aspectFill" />
      </div>
      <div class="rightIcon" @click="isAttenToggle">
        <p class="attention attentioned" v-if="isAttention">已关注</p>
        <p class="attention" v-else>
          <i class="iconfont icon-jiahao"></i>
          <span>关注</span>
        </p>
      </div>
    </div>
    <div class="baseInfo">
      <div class="nameSexPhone">
        <p class="name">张小凡</p>
        <p class="sex">
          <i class="iconfont icon-nan"></i>
        </p>
        <p class="phone">182****1234</p>
      </div>
      <div class="inaword">要成为世界第一的梦珂宝训练大师</div>
      <div class="other">
        <p class="constellation">金牛座</p>
        <p class="address">南京市</p>
        <p class="follower">15人关注</p>
      </div>
      <div class="editInfoBtn" @click="sixinFun">
        <i class="iconfont icon-sixin"></i>
        <span>私信</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="navBox">
      <div class="navItem" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">
        <i class="iconfont icon-huati"></i>
        <p>话题</p>
      </div>
      <div class="navItem" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">
        <i class="iconfont icon-xiangji"></i>
        <p>状态</p>
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in ItemList" :key="index" @click.stop="goTopic">
        <!-- <div class="headName" @click.stop="goPersonal">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          <span>张小凡</span>
        </div> -->
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

    <div class="mask" @click.stop="closeMask" v-if="maskVal"></div>
    <div class="maskCont" v-if="maskVal">
      <div class="title">
        <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        <span>张小凡</span>
      </div>
      <div class="textaCont">
          <textarea class="textA" auto-focus placeholder="请留下你想说的话，将发送到对方的消息中心" :value="sixinValue" @input="getSixin" placeholder-style="color:#b8b8b8"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskVal: false, //私信显示判断
      isAttention: false,  //关注判断
      itemActive: 0,  //话题，状态判断
      likeAct: false, //喜欢判断
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
    isAttenToggle() {
      this.isAttention = !this.isAttention;
    },
    itemToggle(num) {
      this.itemActive = num;
    },
    requireTxt(index) {
      let val = this.ItemList[index].showEllip;
      if (val) {
        this.ItemList[index].showEllip = false;
      } else {
        this.ItemList[index].showEllip = true;
      }
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
    },
    sixinFun() {
      this.maskVal = true;
    },
    closeMask() {
      this.maskVal = false;
    },
  },
  moubted() {}
};
</script>

<style lang="less" scoped>
.my {
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headImg {
      width: 70px;
      height: 70px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightIcon {
      display: flex;
      justify-content: space-around;
      .attention {
        background-color: #b1a1a3;
        width: 65px;
        text-align: center;
        line-height: 25px;
        border-radius: 25px;
        color: #fff;
        .iconfont {
          font-size: 20px;
          margin-right: 2px;
          color: #fff;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          font-size: 12px;
          vertical-align: middle;
        }
        &.attentioned {
          color: #cbcbcb;
          background: transparent;
          font-size: 12px;
          border: 1px solid #cbcbcb;
        }
      }
    }
  }
  .baseInfo {
    width: 90%;
    margin: 10px auto;
    position: relative;
    .nameSexPhone {
      display: flex;
      justify-content: left;
      align-items: center;
      .name {
        font-size: 20px;
        font-weight: 600;
        margin-right: 10px;
      }
      .sex {
        font-size: 14px;
        color: #707070;
        margin-right: 10px;
      }
      .phone {
        font-size: 16px;
        color: #525151;
      }
    }
    .inaword {
      font-size: 12px;
      color: #333;
      margin: 10px 0;
    }
    .other {
      display: flex;
      justify-content: left;
      p {
        padding: 2px 10px;
        margin-right: 10px;
        background-color: #eee;
        font-size: 12px;
        color: #525151;
        border-radius: 5px;
      }
    }
    .editInfoBtn {
      font-size: 12px;
      position: absolute;
      top: 20%;
      right: 0;
      padding: 4px 15px;
      border-radius: 5px;
      transform: translateY(-50%);
      line-height: 25px;
      i {
        display: inline-block;
        margin-right: 5px;
        font-size: 20px;
        color: #707070;
        vertical-align: middle;
      }
      span {
        color: #f00;
        vertical-align: middle;
      }
    }
  }
  .line {
    width: 100%;
    height: 8px;
    background-color: #eee;
    margin-top: 20px;
  }
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
        font-size: 22px;
        color: #707070;
      }
      p {
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        color: #e83e3e;
      }
      &.active {
        i {
          color: #333;
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
    // 私信弹窗
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .maskCont {
    position: absolute;
    z-index: 4;
    width: 80%;
    height: 30%;
    background-color: #fff;
    padding: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .title {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      img {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        margin-right: 10px;
      }
    }
    .textaCont {
      background-color: #e8e8e8;
      height: 60%;
      padding: 10px;
      .textA{
        font-size: 14px;
        width: 100%;
        height: 100%;
        text-align: justify;
        color: #333;
      }
    }
  }
}
</style>
