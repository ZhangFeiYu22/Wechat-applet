<template>
  <div class="game">
    <div class="terminal_all" v-show="terminal">
      <div class="terminal">
        <img :src="deleate" @click.stop="xiaoshi" class="imageshow-deleate" mode="scaleToFill" />

        <div class="ter-viewa">游戏规则</div>
        <scroll-view class="scroll-view" scroll-y>
          <div
            class="ter-viewb"
          >所有玩家同时打开喝酒游戏小程序，选择大话骰玩法，选择人数后开始游戏。事先约定好游戏起始者，然后按照游戏参与者座位的顺时针或逆时针进行游戏轮次。（下文以X表示任意数量，Y表示面向天的骰子数字）</div>
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
    <div class="container">
      <img @click.stop="closemusicFun" :src="music?openmusic:closemusic" class="music" />
      <div class="show-viewa">
        <div class="contain-right" @click.stop="showRole">
          <text>规</text>
          <text>则</text>
        </div>
        <div class="show-viewb">
          <img :src="shadow" class="shadow-image" />
        </div>

        <div class="bigBox">
          <img v-if="dShow" :src="ltImg" class="dShow" />
          <image v-if="dShow" :src="rbImg" class="dShow2" />
          <div class="show-viewd" v-if="openOrclose" :animation="animationData">
            <img :src="toy" class="state-imageall" />
          </div>
        </div>
        <div class="show-viewc" v-if="openOrclose">
          <image :src="wavedice" class="stagec-image" />
        </div>
        <div class="show-viewe" v-if="!openOrclose" @click.stop="openCover">
          <image :src="cover" class="stagee-image" />
        </div>
        <div class="show-viewf" v-if="!openOrclose">
          <image :src="plate" class="stagef-image" />
        </div>

        <div class="diceBox">
          <div v-if="picArr.length == 1">
            <div class="stageaLength1" v-for="(item,index) in picArr" :key="index">
              <div v-if="!openOrclose">
                <image :src="item" class="stage-image" mode="scaleToFill" />
              </div>
            </div>
          </div>
          <div v-if="picArr.length == 2">
            <div class="stageaLength2" v-for="(item,index) in picArr" :key="index">
              <div v-if="!openOrclose">
                <image :src="item" class="stage-image" mode="scaleToFill" />
              </div>
            </div>
          </div>
          <div v-if="picArr.length == 3">
            <div class="stageaLength3" v-for="(item,index) in picArr" :key="index">
              <div v-if="!openOrclose">
                <image :src="item" class="stage-image" mode="scaleToFill" />
              </div>
            </div>
          </div>
          <div v-if="picArr.length == 4">
            <div class="stageaLength4" v-for="(item,index) in picArr" :key="index">
              <div v-if="!openOrclose">
                <image :src="item" class="stage-image" mode="scaleToFill" />
              </div>
            </div>
          </div>
          <div v-if="picArr.length == 5">
            <div class="stageaLength5" v-for="(item,index) in picArr" :key="index">
              <div v-if="!openOrclose">
                <image :src="item" class="stage-image" mode="scaleToFill" />
              </div>
            </div>
          </div>
        </div>
        <div class="stageb" v-show="orshow">
          <image
            v-if="flag"
            :src="openOrclose == true ? waveing : closeing"
            class="stageb-image"
            mode="scaleToFill"
          />
          <image
            v-else
            @click.stop="openCover"
            :src="openOrclose == true ? waveing : closeing"
            class="stageb-image"
            mode="scaleToFill"
          />
        </div>
      </div>
    </div>
    <div class="otherBox">
      <div class="numBox">
        <i class="iconfont icon-iconless" @click="reduceFun"></i>
        <p>{{diceNum}}</p>
        <i class="iconfont icon-tianjia" @click="increaseFun"></i>
      </div>
      <button @click="yaoyiyao">摇一摇</button>
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
      dShow: false,
      flag: false,
      music: true,
      isShow: true,
      shadow: `${this.$store.state.imgUrlHttp}/shadow.png`,
      roleUrl: `${this.$store.state.imgUrlHttp}/windownew.png`,
      toy: `${this.$store.state.imgUrlHttp}/toy.png`,
      waveing: `${this.$store.state.imgUrlHttp}/openbutton.png`,
      audioUrl: `https://chengmipub.oss-cn-hangzhou.aliyuncs.com/city/game/sieve/mp3/yaosaizi.mp3`,
      wavedice: `${this.$store.state.imgUrlHttp}/wavedice.png`,
      deleate: `${this.$store.state.imgUrlHttp}/deleate.png`,
      closeing: `${this.$store.state.imgUrlHttp}/close-button.png`,
      cover: `${this.$store.state.imgUrlHttp}/cover.png`,
      plate: `${this.$store.state.imgUrlHttp}/plate.png`,
      closemusic: `${this.$store.state.imgUrlHttp}/closemusic.png`,
      openmusic: `${this.$store.state.imgUrlHttp}/music.png`,
      ltImg: `${this.$store.state.imgUrlHttp}/lt.png`,
      rbImg: `${this.$store.state.imgUrlHttp}/rb.png`,
      numtotal: 0,
      num: 0,
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
      determination: true,
      terminal: false,
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      pic5: "",
      openOrclose: true,
      orshow: false,
      lists: [
        {
          title: "1、摇骰",
          content:
            "每局游戏开始时，每位游戏参与者必须摇晃自己的手机上的骰盅，以打乱骰子的点（与麻将和扑克牌洗牌的目的相同）"
        },
        {
          title: "2、叫骰",
          content:
            "由游戏起始者率先喊出“X个Y”（即自己觉得全场一共拥有X个Y点数的骰子）。注意这里不是单纯叫骰者骰盅内真实的情况，这里是尽情发挥演技的时间。"
        },
        {
          title: "",
          content:
            "然后根据事先约定好的方向依次“叫骰”，但是“叫骰”者喊出的数值需高于自己座位上方的人所喊出的数值总和，或者要大于上家的“X”数值。"
        },
        {
          title: "3、叫斋",
          content:
            "通常骰子的“1”点是通用的，可以变成任何点数，但是开局喊了X个“1”，则“1”点便不再通用。"
        },
        {
          title: "4、开杀",
          content:
            "当你根据自己骰盅内的实际情况，而不相信上一位与你相邻的叫骰者，开骰盅清点所有参加者骰子与叫骰者所喊的Y的数量。"
        },
        {
          title: "5、跳杀",
          content:
            "类似“开杀”，但是该“开杀者”与叫骰者不相邻。这样的失败者是需要加倍喝酒。"
        },
        {
          title: "6、反杀",
          content:
            "叫骰者被开杀后，开骰盅前有权对开杀者“加注”，通常固定，“开多少（码数）大多少(码数)”。 开杀者被“反杀”后，有全权再“反杀”多一次叫骰者。"
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
    snakeOne() {
      var that = this;
      that.yaoyiyaoControl = false;
      if (that.music) {
        that.playAuto();
      }
      var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: "linear"
      });
      var pics = [
        `${this.$store.state.imgUrlHttp}/onea.png`,
        `${this.$store.state.imgUrlHttp}/twoa.png`,
        `${this.$store.state.imgUrlHttp}/threea.png`,
        `${this.$store.state.imgUrlHttp}/foura.png`,
        `${this.$store.state.imgUrlHttp}/fivea.png`,
        `${this.$store.state.imgUrlHttp}/sixa.png`
      ];

      that.SetInter = setInterval(function() {
        that.flag = true;
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
        var numVal = that.num + 1;
        var timeNum = that.timeNum + 100;
        if (numVal % 2 == 1) {
          animation.rotate(10).step({
            duration: 100
          });
        } else {
          animation.rotate(-10).step({
            duration: 100
          });
        }
        // 隐藏声音图标
        if (parseInt(numVal / 5) % 2 == 1) {
          that.dShow = true;
        } else {
          that.dShow = false;
        }

        animation.rotate(0).step({
          duration: 100
        });
        that.pic1 = pic1;
        that.pic2 = pic2;
        that.pic3 = pic3;
        that.pic4 = pic4;
        that.pic5 = pic5;
        that.num = numVal;
        that.num1 = num1 + 1;
        that.num2 = num2 + 1;
        that.num3 = num3 + 1;
        that.num4 = num4 + 1;
        that.num5 = num5 + 1;
        that.timeNum = timeNum;
        that.animationData = animation.export();
        if (timeNum == 2000) {
          clearInterval(that.SetInter);
          that.yaoyiyaoControl = true;
          //加一个还原动画
          animation.rotate(0).step({
            duration: 100
          });
          that.animationData = animation.export();
          var numtotal = 0;
          for (let i = 1; i <= that.diceNum; i++) {
            let aa = that["num" + i];
            numtotal = numtotal + aa;
          }
          that.flag = false;
          that.numtotal = numtotal;
          that.determination = true;
          that.num = 0;
          that.timeNum = 0;
          var newArr = [];
          for (let i = 1; i <= that.diceNum; i++) {
            let aa = that["pic" + i];
            newArr.push(that["pic" + i]);
          }
          that.picArr = newArr;
          return;
        }
      }, 100);
    },
    openCover: function(e) {
      var that = this;
      var openOrclose = !that.openOrclose;
      if (openOrclose) {
        var animation = wx.createAnimation({
          duration: 0,
          timingFunction: "linear"
        });
        animation.rotate(0).step({
          duration: 100
        });
        that.openOrclose = openOrclose;
        that.animationData = animation.export();
      } else {
        that.openOrclose = openOrclose;
      }
    },
    yaoyiyao() {
      var that = this;
      if (that.yaoyiyaoControl) {
        if (that.openOrclose) {
          that.snakeOne();
        } else {
          wx.showToast({
            title: "请合上盅罩再继续",
            icon: "none",
            duration: 2000
          });
        }
      } else {
        wx.showToast({
          title: "游戏进行中",
          icon: "none",
          duration: 1000
        });
      }
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
  },
  onShow: function() {
    var that = this;
    that.isShow = true;
    wx.onAccelerometerChange(function(res) {
      var curTime = new Date().getTime();
      var determination = that.determination;
      var openOrclose = that.openOrclose;
      var last_update = that.last_update;
      if (curTime - last_update > 100) {
        var diffTime = curTime - last_update;
        var speed =
          Math.abs(
            res.x + res.y + res.z - that.last_x - that.last_y - that.last_z
          ) /
          diffTime *
          10000;
        if (speed > 60 && determination && openOrclose && that.isShow) {
          that.determination = false;
          that.snakeOne();
        }
        that.last_update = curTime;
        that.last_x = res.x;
        that.last_y = res.y;
        that.last_z = res.z;
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this;
    clearInterval(that.SetInter);

    that.determination = true;
    that.num = 0;
    that.timeNum = 0;
    that.orshow = false;
    that.isShow = false;
    that.dShow = false;
  },
  onUnload: function() {
    var that = this;
    clearInterval(that.SetInter);

    that.determination = true;
    that.num = 0;
    that.timeNum = 0;
    that.orshow = false;
    that.isShow = false;
    that.dShow = false;
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
  .show-viewd {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .dShow {
    width: 70rpx;
    height: 70rpx;
    position: absolute;
    top: 100rpx;
    left: 40rpx;
  }
  .dShow2 {
    width: 70rpx;
    height: 70rpx;
    position: absolute;
    bottom: 40rpx;
    right: 40rpx;
  }
  .state-imageall {
    height: 572rpx;
    width: 574rpx;
  }
  .show-viewe {
    position: absolute;
    top: 254rpx;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .stagee-image {
    width: 500rpx;
    height: 346rpx;
  }
  .stage-image {
    width: 91rpx;
    height: 85rpx;
  }
  .show-viewf {
    position: absolute;
    top: 590rpx;
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
        top: 632rpx;
        left: 260rpx;
      }
      &:nth-child(2) {
        top: 632rpx;
        left: 398rpx;
      }
      &:nth-child(3) {
        top: 720rpx;
        left: 196rpx;
      }
      &:nth-child(4) {
        top: 720rpx;
        left: 328rpx;
      }
      &:nth-child(5) {
        top: 720rpx;
        left: 464rpx;
      }
    }
  }

  .stageb {
    position: absolute;
    top: 920rpx;
    left: 0;
    right: 0;
    display: flex;
    font-size: 28rpx;
    color: white;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .stageb-image {
    margin-right: 10rpx;
    width: 112rpx;
    height: 112rpx;
  }
  .show-viewc {
    position: absolute;
    top: 570rpx;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .stagec-image {
    width: 96rpx;
    height: 96rpx;
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
