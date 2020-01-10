<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {},
  onShow() {
    this.num++;
    if (wx.getStorageSync("tabItemClick")) {
      if (this.num % 2 == 0) {
        let backUrl = "/" + wx.getStorageSync("tabItemClick");
        console.log("返回两层", backUrl);
        wx.switchTab({
          url: backUrl
        });
      } else {
        wx.navigateTo({
          url: "/pages/releaseRealy/main"
        });
      }
    } else {
      wx.navigateTo({
        url: "/pages/releaseRealy/main"
      });
      wx.setStorageSync("tabItemClick", "pages/home/main");
    }
  }
};
</script>

<style scoped>
</style>
