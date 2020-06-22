<template>
  <div class="mallCenter">
    <navigation-bar :title="'集市'" :navBackgroundColor="'#fff'"></navigation-bar>
    <div class="load" :style="{paddingTop: havHeight + 'px'}">
      <img :src="mallImg" alt />
      <div class="wordBox">
        <p class="p1">集市正在准备中···</p>
        <p class="p2">敬请期待···</p>
      </div>
    </div>
    <vue-tab-bar :selectNavIndex="0"></vue-tab-bar>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
import vueTabBar from "@/components/vueTabBar";
export default {
  components: {
    navigationBar,
    vueTabBar
  },
  data() {
    return {
      havHeight: "",
      mallImg: `${this.$store.state.commonImgHttp}/shop.png`
    };
  },
  mounted() {
    this.havHeight = wx.getStorageSync("navBar_Height");
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.mallCenter {
  .load {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    img {
      width: 100%;
      height: 95%;
    }
    .wordBox {
      position: absolute;
      bottom: 13%;
      left: 10%;
      height: 100px;
      background-color: #fff;
      width: 80%;
      p {
        color: #2a2a2a;
      }
      .p1 {
        padding-left: 50px;
      }
      .p2 {
        padding-left: 100px;
        margin-top: 10px;
      }
    }
  }
}
</style>
