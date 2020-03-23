<template>
  <div class="comp-navbar">
    <!-- 占位栏 -->
    <div class="placeholder-bar" :style="{height: navBarHeight + 'px'}"></div>
    <!-- 导航栏主体 -->
    <div
      class="navbar"
      :style="{height: navBarHeight + 'px',backgroundColor:navBackgroundColor}"
    >
      <!-- 状态栏 -->
      <div class="nav-statusbar" :style="{height: statusBarHeight + 'px'}"></div>
      <!-- 标题栏 -->
      <div class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
        <!-- 按键显示情况 -->
        <!-- 显示发布 -->
        <div v-if="publishVisible" class="bar-optionsBox">
          <div class="onlyBack">
            <div class="opt opt-add" @click="publishClick()">
              <i class="iconfont" :class="publishVisible == 1 ? 'icon-publish1' : 'icon-publish2'"></i>
            </div>
          </div>
        </div>
        <div v-else class="bar-optionsBox">
          <!-- 返回键 -->
          <div class="onlyBack" v-if="backVisible && !homeVisible">
            <div class="opt opt-back" @click="backClick()">
              <i class="iconfont icon-Left"></i>
            </div>
          </div>
          <!-- 返回键和home键 -->
          <div v-if="backVisible && homeVisible" class="back_home">
            <div class="opt opt-back" @click="backClick()">
              <i class="iconfont icon-Left"></i>
            </div>
            <div class="line"></div>
            <div class="opt opt-home" @click="homeClick()">
              <i class="iconfont icon-faxian"></i>
            </div>
          </div>
        </div>
        <!-- 都不显示 -->
        <div v-if="!backVisible && !homeVisible && !publishVisible" class="bar-optionsBox"></div>
        <!-- 标题 -->
        <div class="bar-title">
          {{title}}
          <image class="imgS" src="../../static/images/titlebg.png"></image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 导航栏背景色
    navBackgroundColor: {
      default: "#ffffff"
    },
    //标题文字
    title: {
      required: false,
      default: "城谜"
    },
    // 是否显示后退按钮
    backVisible: {
      required: false,
      default: false
    },
    // 是否显示Home按钮
    homeVisible: {
      required: false,
      default: false
    },
    // 是否显示发布按钮
    publishVisible: {
      required: false,
      default: 0
    },
    // home按钮的路径
    homePath: {
      required: false,
      default: "/pages/community/main"
    }
  },
  data() {
    return {
      statusBarHeight: "", // 状态栏高度
      titleBarHeight: "", // 标题栏高度
      navBarHeight: "", // 导航栏总高度
      platform: "",
      model: "",
      brand: "",
      system: "",
      currentPage: ""
    };
  },
  beforeMount() {
    const self = this;
    wx.getSystemInfo({
      success(system) {
        self.statusBarHeight = system.statusBarHeight;
        self.platform = system.platform;
        self.model = system.model;
        self.brand = system.brand;
        self.system = system.system;
        let platformReg = /ios/i;
        if (platformReg.test(system.platform)) {
          self.titleBarHeight = 44;
        } else {
          self.titleBarHeight = 48;
        }
        self.navBarHeight = self.statusBarHeight + self.titleBarHeight;
        wx.setStorageSync("navBar_Height", self.navBarHeight);
      }
    });
  },
  methods: {
    backClick() {
      // if (getCurrentPages().length == 1) {
      //   // 打开分享卡片无法回退
      //   wx.redirectTo({
      //     url: this.homePath
      //   });
      // } else {
      //   wx.navigateBack({
      //     delta: 1
      //   });
      // }
        wx.navigateBack({
          delta: 1
        });
    },
    homeClick() {
      wx.redirectTo({
        url: this.homePath
      });
    },
    publishClick() {
      console.log("0000--",this.title);
      if(this.title == '社区'){
        wx.navigateTo({
          url: "/pages/releaseRealy/main?publishType=1"
        });
      }else{
        wx.navigateTo({
          url: "/pages/releaseRealy/main?publishType=2"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.comp-navbar {
  width: 100vw;
  .navbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9999999;
    .nav-titlebar {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .bar-optionsBox {
        width: 146rpx;
        height: 56rpx;
        position: absolute;
        left: 7px;
        .onlyBack {
          height: 56rpx;
          line-height: 56rpx;
          font-weight: 600;
          position: absolute;
          left: 7px;
        }
        .back_home {
          width: 146rpx;
          height: 56rpx;
          display: flex;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-around;
          position: absolute;
          left: 7px;
          display: flex;
          align-items: center;
          background: hsla(0, 0%, 100%, 0.6);
          border-radius: 27px;
          border: 1px solid #ddd;
          padding-right: 5rpx;
          .opt {
            width: 50rpx;
            height: 50rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .opt-back {
            .icon-Left {
              font-size: 18px;
            }
          }
          .line {
            display: block;
            height: 30rpx;
            width: 1px;
            background-color: gray;
          }
          .opt-home {
            .icon-faxian {
              font-size: 18px;
            }
          }
        }
      }
      .bar-title {
        width: 45%;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        position: relative;
        .imgS {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -20%);
          height: 14px;
          width: 50px;
        }
      }
    }
  }
  .placeholder-bar {
    background-color: transparent;
    width: 100%;
  }
}
</style>