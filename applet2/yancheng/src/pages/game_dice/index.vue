<template>
  <div class="game">
    <navigation-bar
      :title="'大话骰'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="terminal_all" v-show="terminal">
      <div class="terminal">
        <img :src="deleate" @click.stop="xiaoshi" class="imageshow-deleate" mode="scaleToFill" />

        <div class="ter-viewa">游戏规则</div>
        <scroll-view class="scroll-view" scroll-y>
          <div
            class="ter-viewb"
          >所有玩家同时打开喝酒游戏小程序，选择大话骰玩法，选择人数后开始游戏。事先约定好游戏起始者，然后按照游戏参与者座位的顺时针或逆时针进行游戏轮</div>
          <div class="ter-viewc">
            <block v-for="(item,index) in lists" :key="index">
              <div class="ter-viewd">
                <text>{{item.title}}</text>
                <text>{{item.content}}</text>
              </div>
            </block>
          </div>
        </scroll-view>
      </div>
    </div>
    <div class="container" :style="{filter: 'blur('+ blurNum +'px)', top: navBar_Height}">
      <img @click.stop="closemusicFun" :src="music?openmusic:closemusic" class="music" />
      <div class="show-viewa">
        <div class="contain-right" @click.stop="showRole">
          <text>规</text>
          <text>则</text>
        </div>

        <div class="show-viewb">
          <img :src="shadow" class="shadow-image" :style="{filter: 'blur('+ blurNum +'px)'}" />
        </div>

        <div class="guize">
          <p>长按显示点数</p>
        </div>

        <div class="show-viewf">
          <image
            :src="plate"
            class="stagef-image"
            :style="{filter: 'blur('+ blurNum +'px)'}"
            mode="aspectFill"
          />
        </div>

        <div class="boli" @touchstart="touchStartBlur" @touchend="touchEndBlur" v-if="boliShow"></div>
        <div class="diceBox">
          <div class="stageaLength5" v-if="picArr[0]">
            <image
              :src="pic1"
              class="stage-image"
              :style="{filter: 'blur('+ blurNum +'px)'}"
              :animation="animationData0"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5" v-if="picArr[1]">
            <image
              :src="pic2"
              class="stage-image"
              :style="{filter: 'blur('+ blurNum +'px)'}"
              :animation="animationData1"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5" v-if="picArr[2]">
            <image
              :src="pic3"
              class="stage-image"
              :style="{filter: 'blur('+ blurNum +'px)'}"
              :animation="animationData2"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5" v-if="picArr[3]">
            <image
              :src="pic4"
              class="stage-image"
              :style="{filter: 'blur('+ blurNum +'px)'}"
              :animation="animationData3"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5" v-if="picArr[4]">
            <image
              :src="pic5"
              class="stage-image"
              :style="{filter: 'blur('+ blurNum +'px)'}"
              :animation="picArr[4] ? animationData4 : animationData"
              mode="scaleToFill"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="otherBox">
      <div class="numBox">
        <i class="iconfont icon-iconless" @click="reduceFun"></i>
        <p>{{diceNum}}</p>
        <i class="iconfont icon-tianjia" @click="increaseFun"></i>
      </div>
      <button @click="dongyixia" v-if="canClick">摇一摇</button>
      <button v-else>摇一摇</button>
    </div>
  </div>
</template>

<script>
// var app = getApp();
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      navBar_Height: '',
      boliShow: false, //透明长按遮罩控制
      blurTimeInto: "",
      blurTimeFade: "",
      blurNum: 0, //模糊度控制
      yaoyiyaoControl: true,
      diceNum: 5, //  骰子的个数
      picArr: [], //显示骰子的数组
      animationData: null,
      animationData0: null,
      animationData1: null,
      animationData2: null,
      animationData3: null,
      animationData4: null,
      animationData5: null,
      music: true,
      shadow: `${this.$store.state.imgUrlHttp}/shadow.png`,
      roleUrl: `${this.$store.state.imgUrlHttp}/windownew.png`,
      toy: `${this.$store.state.imgUrlHttp}/toy.png`,
      audioUrl: `https://chengmipub.oss-cn-hangzhou.aliyuncs.com/city/game/sieve/mp3/yaosaizi.mp3`,
      wavedice: `${this.$store.state.imgUrlHttp}/wavedice.png`,
      deleate: `${this.$store.state.imgUrlHttp}/deleate.png`,
      cover: `${this.$store.state.imgUrlHttp}/cover.png`,
      // plate: `${this.$store.state.imgUrlHttp}/plate.png`,
      plate: require("../../../static/images/plate.png"),
      closemusic: `${this.$store.state.imgUrlHttp}/closemusic.png`,
      openmusic: `${this.$store.state.imgUrlHttp}/music.png`,
      numtotal: 0,
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      terminal: false,
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      pic5: "",
      canClick: true, //防止多次点击
      lists: [
        {
          title: "1、吹牛",
          content: "每个人五颗骰子"
        },
        {
          title: "2、大姨妈",
          content: "每个人五颗骰子，谁红色点数多为赢（一般为一点和四点）"
        },
        {
          title: "3、中奖",
          content:
            "每人手里两颗骰子，中间两颗公骰，跟公骰点数之和一样就惩罚，点数一模一样，惩罚双倍"
        },
        {
          title: "4、牛牛",
          content:
            "每人五颗骰子，找出三个相加为十，另外两个相加比大小，如果找不出三个骰子加起来之和为十则视为零点"
        },
        {
          title: "5、扫雷",
          content:
            "每个人三颗骰子，先规定一人埋雷，摇出“对子”加“单点”为埋雷成功，“单点”的骰子为雷，下面每个人摇出几个跟“单点”一样的骰子惩罚几次，如果埋雷者摇三次都失败，惩罚后换下一个参与者（可以自行规定一圈结束或三次都没有踩雷的人就换下一个埋雷者）"
        },
        {
          title: "6、血拼一点",
          content:
            "开始用一颗骰，每个人轮流摇，每摇完一次加一颗骰，直到骰子中出现一点，有几个骰子就惩罚几次"
        }
      ]
    };
  },
  methods: {
    reduceFun() {
      var that = this;
      if (that.diceNum == 1) {
        wx.showToast({
          title: "至少选择一个骰子",
          icon: "none",
          duration: 2000
        });
      } else {
        that.diceNum--;
        that.picArr.splice(that.picArr.length - 1, 1);
        that.animationData0 = null;
        that.animationData1 = null;
        that.animationData2 = null;
        that.animationData3 = null;
        that.animationData4 = null;
        that.animationData5 = null;
      }
    },
    increaseFun() {
      var that = this;
      if (that.diceNum == 5) {
        wx.showToast({
          title: "至多选择五个骰子",
          icon: "none",
          duration: 2000
        });
      } else {
        that.diceNum++;
        that.animationData0 = null;
        that.animationData1 = null;
        that.animationData2 = null;
        that.animationData3 = null;
        that.animationData4 = null;
        that.animationData5 = null;
        var pics = [
          `${this.$store.state.imgUrlHttp}/onea.png`,
          `${this.$store.state.imgUrlHttp}/twoa.png`,
          `${this.$store.state.imgUrlHttp}/threea.png`,
          `${this.$store.state.imgUrlHttp}/foura.png`,
          `${this.$store.state.imgUrlHttp}/fivea.png`,
          `${this.$store.state.imgUrlHttp}/sixa.png`
        ];
        var num1 = Math.round(Math.random() * (pics.length - 1));
        var pic1 = pics[num1];
        that.picArr.push(pic1);
      }
    },
    showRole: function(e) {
      var that = this;
      that.terminal = true;
    },
    xiaoshi: function(e) {
      var that = this;
      that.terminal = false;
    },
    playAuto: function() {
      var that = this;
      wx.playBackgroundAudio({
        dataUrl: that.audioUrl,
        title: "weixin"
      });
    },
    //关闭音乐
    closemusicFun() {
      var that = this;
      if (that.music) {
        that.music = false;
      } else {
        that.music = true;
      }
    },
    dongyixia() {
      var that = this;
      if (that.music) {
        that.playAuto();
      }

      that.boliShow = false;
      that.canClick = false;

      var pics = [
        `${this.$store.state.imgUrlHttp}/onea.png`,
        `${this.$store.state.imgUrlHttp}/twoa.png`,
        `${this.$store.state.imgUrlHttp}/threea.png`,
        `${this.$store.state.imgUrlHttp}/foura.png`,
        `${this.$store.state.imgUrlHttp}/fivea.png`,
        `${this.$store.state.imgUrlHttp}/sixa.png`
      ];
      var num1 = Math.round(Math.random() * (pics.length - 1));
      var num2 = Math.round(Math.random() * (pics.length - 1));
      var num3 = Math.round(Math.random() * (pics.length - 1));
      var num4 = Math.round(Math.random() * (pics.length - 1));
      var num5 = Math.round(Math.random() * (pics.length - 1));
      var pic1 = pics[num1];
      var pic2 = pics[num2];
      var pic3 = pics[num3];
      var pic4 = pics[num4];
      var pic5 = pics[num5];

      that.pic1 = pic1;
      that.pic2 = pic2;
      that.pic3 = pic3;
      that.pic4 = pic4;
      that.pic5 = pic5;
      var numtotal = 0;
      for (let i = 1; i <= that.diceNum; i++) {
        let aa = that["num" + i];
        numtotal = numtotal + aa;
      }
      that.numtotal = numtotal;

      var newArr = [];
      for (let i = 1; i <= that.diceNum; i++) {
        let aa = that["pic" + i];
        newArr.push(that["pic" + i]);
      }
      that.picArr = newArr;
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      });
      var animation0 = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      });
      var animation1 = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      });
      var animation2 = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      });
      var animation3 = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      });
      var animation4 = wx.createAnimation({
        duration: 300,
        timingFunction: "linear"
      });
      animation
        .translate(0, 0)
        .rotate(0)
        .step();
      that.animationData = animation.export();
      animation0
        .translate(70, -120)
        .rotate(-180)
        .step()
        .translate(80, -0)
        .rotate(-360)
        .step()
        .translate(-100, -0)
        .rotate(-540)
        .step()
        .translate(-70, -60)
        .rotate(-720)
        .step()
        .translate(70, -30)
        .rotate(-1080)
        .step()
        .translate(0, 0)
        .rotate(-1440)
        .step();
      that.animationData0 = animation0.export();
      animation1
        .translate(40, -140)
        .rotate(-180)
        .step()
        .translate(50, 10)
        .rotate(-360)
        .step()
        .translate(-40, -0)
        .rotate(-540)
        .step()
        .translate(-90, 50)
        .rotate(-720)
        .step()
        .translate(70, -30)
        .rotate(-1080)
        .step()
        .translate(0, 0)
        .rotate(-1440)
        .step();
      that.animationData1 = animation1.export();
      animation2
        .translate(150, -170)
        .rotate(-180)
        .step()
        .translate(150, 10)
        .rotate(-360)
        .step()
        .translate(50, -30)
        .rotate(-540)
        .step()
        .translate(-20, 10)
        .rotate(-720)
        .step()
        .translate(70, -40)
        .rotate(-1080)
        .step()
        .translate(100, -10)
        .rotate(-1440)
        .step()
        .translate(0, 0)
        .rotate(-1800)
        .step();
      that.animationData2 = animation2.export();
      animation3
        .translate(90, -180)
        .rotate(180)
        .step()
        .translate(90, 0)
        .rotate(360)
        .step()
        .translate(20, -50)
        .rotate(720)
        .step()
        .translate(-20, 10)
        .rotate(1080)
        .step()
        .translate(70, 0)
        .rotate(1440)
        .step()
        .translate(0, 0)
        .rotate(1800)
        .step();
      that.animationData3 = animation3.export();
      animation4
        .translate(40, -180)
        .rotate(180)
        .step()
        .translate(20, 0)
        .rotate(360)
        .step()
        .translate(-100, 0)
        .rotate(720)
        .step()
        .translate(0, 0)
        .rotate(1080)
        .step();
      that.animationData4 = animation4.export();

      setTimeout(() => {
        that.canClick = true;
        that.boliShow = true;
        that.animationData0 = null;
        that.animationData1 = null;
        that.animationData2 = null;
        that.animationData3 = null;
        that.animationData4 = null;
        that.animationData5 = null;
        that.blurTimeInto = setInterval(() => {
          if (that.blurNum > 5) {
            clearInterval(that.blurTimeInto);
          } else {
            that.blurNum++;
          }
        }, 50);
      }, 1000);
    },
    touchStartBlur() {
      var that = this;
      clearInterval(that.blurTimeInto);
      that.blurTimeFade = setInterval(() => {
        that.blurNum--;
        if (that.blurNum < 1) {
          clearInterval(that.blurTimeFade);
        }
      }, 50);
    },
    touchEndBlur() {
      var that = this;
      clearInterval(that.blurTimeFade);
      that.blurTimeInto = setInterval(() => {
        that.blurNum++;
        if (that.blurNum > 5) {
          clearInterval(that.blurTimeInto);
        }
      }, 50);
    }
  },
  onLoad(options) {
    var that = this;
    var pics = [
      `${this.$store.state.imgUrlHttp}/onea.png`,
      `${this.$store.state.imgUrlHttp}/twoa.png`,
      `${this.$store.state.imgUrlHttp}/threea.png`,
      `${this.$store.state.imgUrlHttp}/foura.png`,
      `${this.$store.state.imgUrlHttp}/fivea.png`,
      `${this.$store.state.imgUrlHttp}/sixa.png`
    ];
    var num1 = Math.round(Math.random() * (pics.length - 1));
    var num2 = Math.round(Math.random() * (pics.length - 1));
    var num3 = Math.round(Math.random() * (pics.length - 1));
    var num4 = Math.round(Math.random() * (pics.length - 1));
    var num5 = Math.round(Math.random() * (pics.length - 1));
    var pic1 = pics[num1];
    var pic2 = pics[num2];
    var pic3 = pics[num3];
    var pic4 = pics[num4];
    var pic5 = pics[num5];
    that.pic1 = pic1;
    that.pic2 = pic2;
    that.pic3 = pic3;
    that.pic4 = pic4;
    that.pic5 = pic5;
    var newArr = [];
    for (let i = 1; i <= that.diceNum; i++) {
      let aa = that["pic" + i];
      newArr.push(that["pic" + i]);
    }
    that.picArr = newArr;
    // 导航栏高度获取
    that.navBar_Height = wx.getStorageSync('navBar_Height') + 'px'
  },
  onHide: function() {
    var that = this;
    clearInterval(that.blurTimeInto);
    clearInterval(that.blurTimeFade);
    that.blurNum = 0;
    that.canClick = true;
    that.boliShow = false;
  },
  onUnload: function() {
    var that = this;
    clearInterval(that.blurTimeInto);
    clearInterval(that.blurTimeFade);
    that.blurNum = 0;
    that.canClick = true;
    that.boliShow = false;
  }
};
</script>

<style lang="less" scoped>
.game {
  .terminal {
    position: absolute;
    width: 650rpx;
    height: 700rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(255, 254, 254, 1);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .scroll-view {
    height: 570rpx;
  }
  .ter-viewa {
    display: flex;
    margin-top: 44rpx;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .ter-viewb {
    padding: 30rpx;
    line-height: 55rpx;
  }
  .ter-viewc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10rpx 30rpx;
    font-weight: 500;
    color: rgba(255, 254, 254, 1);
  }
  .ter-viewd {
    display: flex;
    line-height: 55rpx;
    flex-direction: column;
    align-items: flex-start;
  }
  .music {
    position: absolute;
    width: 50rpx;
    height: 50rpx;
    left: 20rpx;
    top: 20rpx;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(#e66465, #9198e5);
  }

  .imageshow-han {
    width: 650rpx;
    height: 700rpx;
  }

  .imageshow-deleate {
    position: absolute;
    right: 18rpx;
    top: 18rpx;
    width: 26rpx;
    height: 26rpx;
  }
  .contain-right {
    position: fixed;
    right: 0;
    z-index: 444;
    top: 168rpx;
    width: 46rpx;
    height: 124rpx;
    font-weight: 500;
    font-size: 30rpx;
    border-top-left-radius: 10rpx;
    border-bottom-left-radius: 10rpx;
    background: #fec600;
    color: #c5701d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .show-viewb {
    text-align: center;
    position: absolute;
    left: 0;
    width: 100%;
    top: 112rpx;
  }
  .guize {
    text-align: center;
    position: absolute;
    left: 0;
    width: 100%;
    top: 130px;
    p {
      font-size: 12px;
      color: #eee;
    }
  }
  .shadow-image {
    width: 460rpx;
    height: 140rpx;
  }
  .snake {
    position: absolute;
    width: 100%;
    color: #ffe900;
    top: 66%;
    font-size: 50rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .bigBox {
    position: absolute;
    top: 300rpx;
    // top: 356rpx;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 572rpx;
  }

  .stage-image {
    width: 84rpx;
    height: 89rpx;
  }
  .show-viewf {
    position: absolute;
    // top: 295px;
    top: 260px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .stagef-image {
    // width: 574rpx;
    // height: 320rpx;
    width: 284px;
    height: 257px;
  }
  .diceBox {
    .stageaLength1 {
      position: absolute;
      &:nth-child(1) {
        top: 720rpx;
        left: 328rpx;
      }
    }
    .stageaLength2 {
      position: absolute;
      &:nth-child(1) {
        top: 720rpx;
        left: 260rpx;
      }
      &:nth-child(2) {
        top: 720rpx;
        left: 398rpx;
      }
    }
    .stageaLength3 {
      position: absolute;
      &:nth-child(1) {
        top: 720rpx;
        left: 196rpx;
      }
      &:nth-child(2) {
        top: 720rpx;
        left: 328rpx;
      }
      &:nth-child(3) {
        top: 720rpx;
        left: 464rpx;
      }
    }
    .stageaLength4 {
      position: absolute;
      &:nth-child(1) {
        top: 740rpx;
        left: 250rpx;
      }
      &:nth-child(2) {
        top: 730rpx;
        left: 380rpx;
      }
      &:nth-child(3) {
        top: 640rpx;
        left: 280rpx;
      }
      &:nth-child(4) {
        top: 630rpx;
        left: 410rpx;
      }
    }
    .stageaLength5 {
      position: absolute;
      &:nth-child(1) {
        top: 315px;
        left: 170px;
      }
      &:nth-child(2) {
        top: 330px;
        left: 215px;
      }
      &:nth-child(3) {
        top: 350px;
        left: 110px;
      }
      &:nth-child(4) {
        top: 370px;
        left: 160px;
      }
      &:nth-child(5) {
        top: 370px;
        left: 210px;
      }
    }
  }
  .boli {
    position: absolute;
    width: 90%;
    height: 64%;
    left: 5%;
    top: 150px;
    z-index: 9;
    border-radius: 5px;
    background: transparent;
  }

  .otherBox {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
    width: 100%;
    .numBox {
      width: 120px;
      text-align: center;
      i {
        display: inline-block;
        height: 32x;
        line-height: 32px;
        color: #fff;
        font-size: 22px;
      }
      p {
        display: inline-block;
        margin: 0 10px;
        font-size: 22px;
      }
    }
    button {
      width: 120px;
      margin: 0;
      padding: 0;
      background: transparent;
      border: 1px solid #f1f1f1;
      height: 32x;
      line-height: 32px;
      font-size: 14px;
      color: #f1f1f1;
      &::after {
        border: none;
      }
    }
  }
}
</style>
