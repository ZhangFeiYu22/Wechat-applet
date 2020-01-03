<template>
  <div>加载中......</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  onShow() {
    console.log(1)
    wx.reLaunch({
      url: "/pages/releaseRealy/main"
    });
  }
};
</script>

<style scoped>


</style>
