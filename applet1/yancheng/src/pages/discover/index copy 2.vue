<template>
  <div class="discover">
    <div class="container">
      <div class="balloon">
        <div class="gameBox game1" @click="goGame1">
          <span>真心话</span>
        </div>
        <div class="gameBox game2" @click="goGame2">
          <span>摇骰子</span>
        </div>
        <div class="gameBox game3">
          <span>Game Center</span>
        </div>
        <div class="gameBox game4" @click="goVote">
          <span>投票专区</span>
        </div>
        <div class="gameBox game5" @click="goActivity">
          <span>活动中心</span>
        </div>
        <div class="gameBox game6">
          <span>game6</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  // mounted() {
  //   wx.redirectTo({
  //     url: "/pages/firstHome/main"
  //   });
  // },
  methods: {
    goGame1(){
      wx.navigateTo({
        url: "/pages/game_truchOrDare/main"
      });
    },
    goActivity() {
      wx.navigateTo({
        url: "/pages/activity/main"
      });
    },
    goVote() {
      wx.navigateTo({
        url: "/pages/vote/main"
      });
    },
    goGame2() {
      wx.navigateTo({
        url: "/pages/game_dice/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.discover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  span {
    text-transform: uppercase;
  }

  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 0 auto;
    background: whitesmoke;
    position: relative;
    .balloon {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding-top: 30px;
      position: relative;
      .gameBox {
        width: 70px;
        height: 70px;
        background: rgba(182, 15, 97, 0.9);
        border-radius: 0;
        border-radius: 80% 80% 80% 80%;
        position: absolute;
        padding: 10px;
        box-shadow: inset 17px 7px 10px rgba(182, 15, 97, 0.9);
        -webkit-transform-origin: bottom center;
        // &::before{
        //   display: block;
        //   content: '';
        //   position: absolute;
        //   width: 40px;
        //   height: 30px;
        //   top: 6%;
        //   left: 30%;
        //   border-radius: 40px 50px;
        //   background-color: rgba(255,255,255,0.2);
        //   box-shadow: 0px 0px 6px 2px rgba(255,255,255 ,0.2);
        // }
        span {
          font-size: 14px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .game1 {
        width: 90px;
        height: 90px;
        z-index: 1;
        background: rgba(182, 15, 97, 0.9);
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(135, 11, 72, 0.9);
        -webkit-animation: balloon1 6s ease-in-out infinite;
        animation: balloon1 6s ease-in-out infinite;
      }
      .game2 {
        width: 100px;
        height: 100px;
        z-index: 1;
        background: rgba(242, 112, 45, 0.9);
        left: 22%;
        top: 25%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(222, 85, 14, 0.9);
        -webkit-animation: balloon2 6s ease-in-out infinite;
        animation: balloon2 6s ease-in-out infinite;
      }
      .game3 {
        background: rgba(45, 181, 167, 0.9);
        width: 150px;
        height: 150px;
        z-index: 9;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: inset 0px -10px 10px rgba(35, 140, 129, 0.9);
        -webkit-animation: balloon4 6s ease-in-out infinite;
        animation: balloon4 6s ease-in-out infinite;
      }
      .game4 {
        width: 115px;
        height: 115px;
        z-index: 1;
        background: rgba(190, 61, 244, 0.9);
        left: 60%;
        top: 20%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(173, 14, 240, 0.9);
        -webkit-animation: balloon1 5s ease-in-out infinite;
        animation: balloon1 5s ease-in-out infinite;
      }
      .game5 {
        width: 115px;
        height: 115px;
        z-index: 1;
        background: rgba(180, 224, 67, 0.9);
        left: 69%;
        top: 62%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(158, 206, 34, 0.9);
        -webkit-animation: balloon3 5s ease-in-out infinite;
        animation: balloon3 5s ease-in-out infinite;
      }
      .game6 {
        width: 100px;
        height: 100px;
        background: rgba(242, 194, 58, 0.9);
        left: 600px;
        z-index: 1;
        left: 30%;
        top: 70%;
        transform: translateY(-50%);
        box-shadow: inset 0px -10px 10px rgba(234, 177, 15, 0.9);
        -webkit-animation: balloon2 5s ease-in-out infinite;
        animation: balloon2 5s ease-in-out infinite;
      }
    }
  }
  // CSS3动画
  /*BALLOON 1 4*/
  @-webkit-keyframes balloon1 {
    0%,
    100% {
      -webkit-transform: translateY(0) rotate(-6deg) scale(1);
    }

    50% {
      -webkit-transform: translateY(-20px) rotate(8deg) scale(0.95);
    }
  }

  /* BAllOON 2 5*/
  @-webkit-keyframes balloon2 {
    0%,
    100% {
      -webkit-transform: translateY(0) rotate(6eg) scale(1);
    }

    50% {
      -webkit-transform: translateY(-30px) rotate(-8deg) scale(0.95);
    }
  }

  /* BAllOON 0*/
  @-webkit-keyframes balloon3 {
    0%,
    100% {
      -webkit-transform: translate(0, -50%) rotate(6eg) scale(1);
    }

    50% {
      -webkit-transform: translate(-10px, -52%) rotate(-8deg) scale(0.95);
    }
  }

  /* BAllOON 3*/
  @-webkit-keyframes balloon4 {
    0%,
    100% {
      -webkit-transform: translate(-46.5%, -46.5%) rotate(-5eg) scale(1);
    }

    50% {
      -webkit-transform: translate(-52%, -52%) rotate(0deg) scale(0.95);
    }
  }
}
</style>
