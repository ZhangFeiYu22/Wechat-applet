<template>
  <div class="zanList">
    <navigation-bar
      :title="'赞'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="list" v-for="(item,index) in zanList" :key="index" @click.stop="goPersonal">
      <img :src="item.headImg" mode="aspectFill" />
      <p>{{item.name}}</p>
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
      zanList: [
        { headImg: `${this.$store.state.imgUrlHttp}/head.png`, name: "路人甲" },
        { headImg: `${this.$store.state.imgUrlHttp}/head.png`, name: "路人乙" },
        { headImg: `${this.$store.state.imgUrlHttp}/head.png`, name: "路人丙" },
        { headImg: `${this.$store.state.imgUrlHttp}/head.png`, name: "路人丁" },
        { headImg: `${this.$store.state.imgUrlHttp}/head.png`, name: "路人辛" }
      ]
    };
  },
  methods: {
    goPersonal() {
       wx.navigateTo({
        url: "/pages/personal/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.zanList {
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  border-radius: 10px;
  box-shadow: 0 0 2px 2px #eee;
  padding: 10px 10px;
  .list {
    margin-bottom: 10px;
    img {
      width: 34px;
      height: 34px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
      vertical-align: middle;
    }
    p {
      color: #3b3b3b;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
