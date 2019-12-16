<template>
  <div class="frameContainers">
    <header
      class="headNav"
      :style="{ paddingTop: statusBarHeight + 'px', height: navHeight + 'px' }"
    >
      <section
        class="headArea"
        :style="{ height: headAreaHeight + 'px', lineHeight: headAreaHeight + 'px', marginTop: headAreaMarTop + 'px' }"
      >
        <div class="leftBack"></div>
        <div class="title" :style="{ height: headAreaHeight + 'px'}">
          <p>乘幂</p>
          <img src="../assets/images/titlebg.png" mode="aspectFit" alt />
        </div>
      </section>
    </header>
  </div>
</template>

<script>
import app from "../App";
export default {
  props: ["text"],
  data() {
    return {
      pixelRatio: app.getSysInfo().pixelRatio, //系统像素比
      statusBarHeight: app.getSysInfo().statusBarHeight, //系统状态栏高度
      navHeight: "", //顶部导航栏高度
      headAreaHeight:
        app.getSysInfo().pixelRatio * 35 / app.getSysInfo().pixelRatio, //顶部内容区域高度
      headAreaMarTop: "" //顶部内容区域外边距
    };
  },
  mounted() {
    //IOS 与 安卓进行差异化处理
    if (app.getSysInfo().system.substring(0, 3) == "iOS") {
      this.navHeight = this.pixelRatio * 40 / this.pixelRatio;
      this.headAreaMarTop = this.pixelRatio * 0.5 / this.pixelRatio;
    } else {
      this.navHeight = this.pixelRatio * 45 / this.pixelRatio;
      this.headAreaMarTop = this.pixelRatio * 2.5 / this.pixelRatio;
    }
  }
};
</script>

<style lang="less" scope>
.frameContainers {
  width: 100%;
  height: 100%;
}
.headNav {
  display: flex;
  align-items: center;
}
.headArea {
  width: 100%;
  position: relative;
  .leftBack {
    display: block;
    content: "";
    width: 20px;
    height: 20px;
    border-left: 4px solid #333;
    border-bottom: 4px solid #333;
    transform: rotate(45deg);
    position: absolute;
    left: 4%;
    top: 28%;
  }
  .title {
    text-align: center;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: 20%;
      height: 100%;
    }
  }
}
.contentArea {
  background-color: yellow;
}

.rightBox {
  width: 18vh;
  height: 100%;
  background-color: cadetblue;
  float: right;
}
</style>

