<template>
  <div class="game">
    <div class="container">
      <img @click.stop="closemusicFun" :src="music?openmusic:closemusic" class="music" />
      <div class="show-viewa">
        <div class="show-viewb">
          <img :src="shadow" class="shadow-image" />
        </div>

        <div class="show-viewf">
          <image :src="plate" class="stagef-image" />
        </div>

        <!-- <div class="boli"></div> -->
        <div class="diceBox">
          <div class="stageaLength5">
            <image
              v-if="picArr[0]"
              :src="pic1"
              class="stage-image"
              :animation="animationData0"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5">
            <image
              v-if="picArr[1]"
              :src="pic2"
              class="stage-image"
              :animation="animationData1"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5">
            <image
              v-if="picArr[2]"
              :src="pic3"
              class="stage-image"
              :animation="animationData2"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5">
            <image
              v-if="picArr[3]"
              :src="pic4"
              class="stage-image"
              :animation="animationData3"
              mode="scaleToFill"
            />
          </div>
          <div class="stageaLength5">
            <image
              v-if="picArr[4]"
              :src="pic5"
              class="stage-image"
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
      <button @click="dongyixia">摇一摇</button>
    </div>
  </div>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {
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
      isShow: true,
      shadow: `${this.$store.state.imgUrlHttp}/shadow.png`,
      roleUrl: `${this.$store.state.imgUrlHttp}/windownew.png`,
      toy: `${this.$store.state.imgUrlHttp}/toy.png`,
      audioUrl: `https://chengmipub.oss-cn-hangzhou.aliyuncs.com/city/game/sieve/mp3/yaosaizi.mp3`,
      wavedice: `${this.$store.state.imgUrlHttp}/wavedice.png`,
      deleate: `${this.$store.state.imgUrlHttp}/deleate.png`,
      cover: `${this.$store.state.imgUrlHttp}/cover.png`,
      plate: `${this.$store.state.imgUrlHttp}/plate.png`,
      closemusic: `${this.$store.state.imgUrlHttp}/closemusic.png`,
      openmusic: `${this.$store.state.imgUrlHttp}/music.png`,
      numtotal: 0,
      SetInter: "", //定时器
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      timeNum: 0,
      last_update: 0,
      last_x: 0,
      last_y: 0,
      last_z: 0,
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      pic5: "",
      openOrclose: true,
      orshow: false
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
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this;
    clearInterval(that.SetInter);

    that.timeNum = 0;
    that.orshow = false;
    that.isShow = false;
  },
  onUnload: function() {
    var that = this;
    clearInterval(that.SetInter);

    that.timeNum = 0;
    that.orshow = false;
    that.isShow = false;
  }
};
</script>

<style lang="less" scoped>
.game {
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
  .show-viewb {
    text-align: center;
    position: absolute;
    left: 0;
    width: 100%;
    top: 112rpx;
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
    top: 295px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .stagef-image {
    width: 574rpx;
    height: 320rpx;
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
    width: 80%;
    height: 60%;
    background-color: pink;
    left: 10%;
    top: 150px;
    z-index: 9;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.3);
      // filter: blur(50px);
      // -webkit-filter: blur(50px);
      z-index: 10;
    }
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
