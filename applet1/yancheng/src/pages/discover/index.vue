<template>
  <div class="discover">
     <navigation-bar
      :title="'发现'"
      :navBackgroundColor="'#fff'"
    ></navigation-bar>
    <div class="gameList" @click="goActivity">
      <img :src="bgUrl1" mode="aspectFill" />
    </div>
    <div class="gameList" @click="goVote">
      <img :src="bgUrl2" mode="aspectFill" />
    </div>
    <div class="gameList" @click="goGame1">
      <img :src="bgUrl3" mode="aspectFill" />
    </div>
    <div class="gameList" @click="goGame2">
      <img :src="bgUrl4" mode="aspectFill" />
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
      bgUrl1: require("../../../static/images/home1.png"),
      bgUrl2: require("../../../static/images/home2.png"),
      bgUrl3: require("../../../static/images/home3.png"),
      bgUrl4: require("../../../static/images/home4.png"),
    };
  },
  methods: {
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
    goGame1() {
      wx.navigateTo({
        url: "/pages/game_dice/main"
      });
    },
    goGame2() {
      wx.navigateTo({
        url: "/pages/game_truchOrDare/main"
      });
    },
    navHome() {
      wx.switchTab({
        url: "/pages/home/main"
      });
    },
    navCommunity() {
      wx.switchTab({
        url: "/pages/community/main"
      });
    },
    navMy() {
      wx.switchTab({
        url: "/pages/my/main"
      });
    },
  },
};
</script>

<style lang="less" scoped>
.discover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  .gameList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 132px;
    width: 90%;
    margin: 0 auto;
    color: #fff;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
