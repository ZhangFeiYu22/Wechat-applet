<template>
  <div class="game">
    <div class="terminal_all" v-show="terminal">
      <div class="terminal" :style="{background:'url('+invitebacka+')'}">
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
    <div class="container" :style="{background:'url('+inviteback+')'}">
      <img @click.stop="closemusicFun"  :src="music?openmusic:closemusic" class="music" />
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

        <div class="stageaa" v-if="!openOrclose">
          <image :src="pica" class="stage-image" mode="scaleToFill" />
        </div>
        <div class="stageab" v-if="!openOrclose">
          <image :src="picb" class="stage-image" mode="scaleToFill" />
        </div>
        <div class="stageac" v-if="!openOrclose">
          <image :src="picc" class="stage-image" mode="scaleToFill" />
        </div>
        <div class="stagead" v-if="!openOrclose">
          <image :src="picd" class="stage-image" mode="scaleToFill" />
        </div>
        <div class="stageae" v-if="!openOrclose">
          <image :src="pice" class="stage-image" mode="scaleToFill" />
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
        <button @click="yaoyiyao">摇一摇</button>
      </div>
    </div>
  </div>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {
      serverimage: "https://minip.cndfmg.com:83/",
      serverXiaoyao: "/image/",
      dShow: false,
      flag: false,
      music: true,
      isShow: true,
      inviteback: "https://minip.cndfmg.com:83/" + "bac-dice.png",
      shadow: "https://minip.cndfmg.com:83/" + "shadow.png",
      roleUrl: "https://minip.cndfmg.com:83/" + "windownew.png",
      toy: "https://minip.cndfmg.com:83/" + "toy.png",
      waveing: "https://minip.cndfmg.com:83/" + "openbutton.png",
      audioUrl: "https://minip.cndfmg.com:83/" + "yaosaizi.mp3",
      wavedice: "https://minip.cndfmg.com:83/" + "wavedice.png",
      deleate: "https://minip.cndfmg.com:83/" + "deleate.png",
      closeing: "https://minip.cndfmg.com:83/" + "close-button.png",
      cover: "https://minip.cndfmg.com:83/" + "cover.png",
      plate: "https://minip.cndfmg.com:83/" + "plate.png",
      invitebacka: "https://minip.cndfmg.com:83/" + "backbig.png",
      // closemusic: this.serverXiaoyao + "closemusic@2x.png",
      // openmusic: this.serverXiaoyao + "music@2x.png",
      // ltImg: this.serverXiaoyao + "lt.png",
      // rbImg: this.serverXiaoyao +"rb2x.png",
      closemusic: "https://minip.cndfmg.com:83/" + "windownew.png",
      openmusic: "https://minip.cndfmg.com:83/" + "windownew.png",
      ltImg: "https://minip.cndfmg.com:83/" + "windownew.png",
      rbImg: "https://minip.cndfmg.com:83/" + "windownew.png",
      numtotal: 0,
      width: 0,
      height: 0,
      num: 0,
      SetInter: "", //定时器
      numa: 0,
      numb: 0,
      timeNum: 0,
      last_update: 0,
      last_x: 0,
      last_y: 0,
      last_z: 0,
      determination: true,
      terminal: true,
      pica: "https://minip.cndfmg.com:83/" + "onea.png",
      picb: "https://minip.cndfmg.com:83/" + "sixa.png",
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
    selectNum() {
      var self = this;
      wx.showActionSheet({
        itemList: ["1", "2", "3", "4", "5", "6"],
        success(res) {
          console.log(res.tapIndex);
          self.num = res.tapIndex + 1;
        },
        fail(res) {
          console.log(res.errMsg);
        }
      });
    },
    showRole: function(e) {
      var that = this;
      that.terminal = false;
    },
    xiaoshi: function(e) {
      var that = this;
      that.terminal = true;
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
      console.log('99')
      var that = this;
      console.log(that.audioUrl);
      if (that.music) {
        that.music = false;
      } else {
        that.music = true;
      }
    },
    snakeOne: function() {
      var that = this;
      if (that.music) {
        that.playAuto();
      }
      var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: "linear"
      });
      var pics = [
        "https://minip.cndfmg.com:83/" + "onea.png",
        "https://minip.cndfmg.com:83/" + "twoa.png",
        "https://minip.cndfmg.com:83/" + "threea.png",
        "https://minip.cndfmg.com:83/" + "foura.png",
        "https://minip.cndfmg.com:83/" + "fivea.png",
        "https://minip.cndfmg.com:83/" + "sixa.png"
      ];

      that.SetInter = setInterval(function() {
        that.flag = true;
        var numa = Math.round(Math.random() * (pics.length - 1));
        var numb = Math.round(Math.random() * (pics.length - 1));
        var numc = Math.round(Math.random() * (pics.length - 1));
        var numd = Math.round(Math.random() * (pics.length - 1));
        var nume = Math.round(Math.random() * (pics.length - 1));
        var pica = pics[numa];
        var picb = pics[numb];
        var picc = pics[numc];
        var picd = pics[numd];
        var pice = pics[nume];
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
        if (parseInt(numVal / 5) % 2 == 1) {
          that.dShow = true;
        } else {
          that.dShow = false;
        }

        animation.rotate(0).step({
          duration: 100
        });
        that.pica = pica;
        that.picb = picb;
        that.picc = picc;
        that.picd = picd;
        that.pice = pice;
        that.num = numVal;
        that.numa = numa + 1;
        that.numb = numb + 1;
        that.timeNum = timeNum;
        that.animationData = animation.export();
        if (timeNum == 2000) {
          clearInterval(that.SetInter);
          var numtotal = numa + numb + 2;
          that.flag = false;
          that.numtotal = numtotal;
          that.determination = true;
          that.num = 0;
          that.timeNum = 0;
          console.log(that.numtotal)
          console.log(that.pica)
          console.log(that.picb)
          console.log(that.picc)
          console.log(that.picd)
          console.log(that.pice)
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
      var curTime = new Date().getTime();
      var determination = that.determination;
      var openOrclose = that.openOrclose;
      var last_update = that.last_update;
      if (curTime - last_update > 100) {
        var diffTime = curTime - last_update;
        var speed = 80;
        if (speed > 60 && determination && openOrclose && that.isShow) {
          (that.determination = false),
            console.log("开关处于什么状态==" + openOrclose);
          that.snakeOne();
        }
        that.last_update = curTime;
      }
    }
  },
  onLoad(options) {
    var that = this;
    var pics = [
      "https://minip.cndfmg.com:83/" + "onea.png",
      "https://minip.cndfmg.com:83/" + "twoa.png",
      "https://minip.cndfmg.com:83/" + "threea.png",
      "https://minip.cndfmg.com:83/" + "foura.png",
      "https://minip.cndfmg.com:83/" + "fivea.png",
      "https://minip.cndfmg.com:83/" + "sixa.png"
    ];
    var numa = Math.round(Math.random() * (pics.length - 1));
    var numb = Math.round(Math.random() * (pics.length - 1));
    var numc = Math.round(Math.random() * (pics.length - 1));
    var numd = Math.round(Math.random() * (pics.length - 1));
    var nume = Math.round(Math.random() * (pics.length - 1));
    var pica = pics[numa];
    var picb = pics[numb];
    var picc = pics[numc];
    var picd = pics[numd];
    var pice = pics[nume];
    that.pica = pica;
    that.picb = picb;
    that.picc = picc;
    that.picd = picd;
    that.pice = pice;
    wx.getSystemInfo({
      success: function(res) {
        (that.width = res.screenWidth), (that.height = res.screenHeight);
      }
    });
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
          (that.determination = false),
            console.log("开关处于什么状态==" + openOrclose);
          that.snakeOne();
        }
        that.last_update = curTime;
        that.last_x = res.x;
        that.last_y = res.y;
        that.last_z = res.z;
      }
    });

    // shake();
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
          (that.determination = false),
            console.log("开关处于什么状态==" + openOrclose);
          that.snakeOne();
        }
        that.last_update = curTime;
        that.last_x = res.x;
        that.last_y = res.y;
        that.last_z = res.z;
      }
    });

    // shake();
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
  /* pages/dice/dice.wxss */
page {
  font-family: "PingFang-SC-Bold";
  overflow: hidden;
  /* background: gainsboro; */
}
.music{
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  left: 20rpx;
  top: 20rpx;
}
.terminal {
  position: relative;
  width: 650rpx;
  height: 700rpx;
  font-size: 32rpx;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(255,254,254,1);
}
.scroll-view{
  height: 570rpx;
}
/* ::-webkit-scrollbar
{
width: 8rpx;
height: 110rpx;
border-radius: 10px;
background-color: #ffffff;
} */
.ter-viewa{
  display: flex;
  margin-top: 44rpx;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.ter-viewb{
  padding: 30rpx;
  line-height: 55rpx;
}
.ter-viewc{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10rpx 30rpx;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(255,254,254,1);
}
.ter-viewd{
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
  background: #FEC600;
  color: #C5701D;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.show-viewb {
  font-family: "FZLXTJW--GB1-0";
  text-align: center;
  position: absolute;
  width: 100%;
  top: 112rpx;
}
.shadow-image{
  width: 460rpx;
  height: 140rpx;
}
.snake {
  position: absolute;
  width: 100%;
  font-family: "PingFang-SC-Bold";
  color: #ffe900;
  top: 66%;
  font-size: 50rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bigBox{
   position: absolute;
  top: 356rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 572rpx;
}
.show-viewd{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.dShow{
  width: 70rpx;
  height: 70rpx;
  position: absolute;
  top: 100rpx;
  left: 40rpx;
}
.dShow2{
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
.show-viewe{
  position: absolute;
  top: 254rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.stagee-image{
  width: 500rpx;
  height: 346rpx;
}
.stage-image {
  width: 91rpx;
  height: 85rpx;
}
.show-viewf{
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
.stageaa {
  position: absolute;
  top: 632rpx;
  left: 260rpx;
}

.stageab {
  position: absolute;
  top: 632rpx;
  left: 398rpx;
}
.stageac{
  position: absolute;
  top: 720rpx;
  left: 196rpx;
}
.stagead{
  position: absolute;
  top: 720rpx;
  left: 328rpx;
}
.stageae{
  position: absolute;
  top: 720rpx;
  left: 464rpx;
}
.stageb {
  position: absolute;
  top: 1000rpx;
  left: 0;
  right: 0;
  font-family: 'PingFang-SC-Medium';
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
.show-viewc{
  position: absolute;
  top: 642rpx;
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


}
</style>
