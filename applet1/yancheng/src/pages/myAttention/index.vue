<template>
  <div class="attention">
    <div class="navToggle">
      <div class="navI" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">谜友</div>
      <div class="navI" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">活动</div>
    </div>
    <div class="friendsList list" v-if="itemActive == 0">
      <div class="friendsItem item" @click="goPersonal">
        <div class="imgBox">
          <img :src="headImg1" mode="aspectFill">
        </div>
        <div class="wordBox">
          <p class="name"><span>张小凡</span><i class="iconfont icon-nan"></i></p>
          <p class="info">要成为世界第一的梦珂宝训练大师大师大师要成为世界第一的梦珂宝训练大师大师大师</p>
        </div>
      </div>
      <div class="friendsItem item" @click="goPersonal">
        <div class="imgBox">
          <img :src="headImg2" mode="aspectFill">
        </div>
        <div class="wordBox">
          <p class="name"><span>张小凡</span><i class="iconfont icon-nan"></i></p>
          <p class="info">要成为世界第一的梦珂宝训练大师大师大师要成为世界第一的梦珂宝训练大师大师大师</p>
        </div>
      </div>
    </div>
    <div class="activityList list" v-else>
      <div class="activityItem item" @click="goActivityDetails">
        <div class="imgBox">
          <img :src="actImg1" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="title">安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和</p>
          <p class="address"><i class="iconfont icon-dingwei"></i><span>江苏省南京市大行宫</span></p>
          <p class="time"><i class="iconfont icon-shijian"></i><span>2019.09.09-12.21</span></p>
        </div>
      </div>
      <div class="activityItem item" @click="goActivityDetails">
        <div class="imgBox">
          <img :src="actImg2" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="title">安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和</p>
          <p class="address"><i class="iconfont icon-dingwei"></i><span>江苏省南京市大行宫</span></p>
          <p class="time"><i class="iconfont icon-shijian"></i><span>2019.09.09-12.21</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemActive: 0,
      headImg1: `${this.$store.state.imgUrlHttp}/a6.png`,
      headImg2: `${this.$store.state.imgUrlHttp}/a5.png`,
      actImg1: `${this.$store.state.imgUrlHttp}/d1.png`,
      actImg2: `${this.$store.state.imgUrlHttp}/d1.png`
    };
  },
  methods: {
    itemToggle(num){
      this.itemActive = num
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    goActivityDetails() {
      wx.navigateTo({
        url: "/pages/activityDetails/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.attention {
  .navToggle {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    .navI {
      text-align: center;
      padding: 10px 0 20px;
      font-size: 18px;
      color: #424242;
      &.active {
        color: #333;
        font-weight: 600;
        position: relative;
        &::after {
          display: block;
          content: "";
          position: absolute;
          width: 30px;
          height: 5px;
          background-color: #b1a1a3;
          bottom: 10px;
          left: 50%;
          margin-left: -15px;
          border-radius: 10px;
        }
      }
    }
  }
  .list{
    width: 90%;
    margin: 0 auto;
    .item{
      font-size: 13px;
      display: flex;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  }
  // 谜友
  .friendsList{
    .friendsItem{
      .imgBox{
        width: 46px;
        height: 46px;
        margin-right: 15px;
        border-radius: 100%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .wordBox{
        flex: 1;
        .name{
          line-height: 26px;
          span{
            font-size: 16px;
            color: #333;
            vertical-align: middle;
          }
          i{
            font-size: 18px;
            margin-left: 10px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .info{
          height: 14px;
          line-height: 14px;
          color: #797979;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 1; //显示的行
          line-clamp: 1; //显示的行
        }
      }
    }
  }
  // 活动
  .activityList {
    .activityItem {
      .imgBox {
        width: 135px;
        height: 95px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wordBox {
        flex: 1;
        .title {
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
          line-clamp: 2; //显示的行
          font-size: 16px;
        }
        .address{
          font-size: 12px;
          color: #8e8e8e;
          line-height: 20px;
          margin-top: 5px;
        }
        .time{
          font-size: 12px;
          color: #8e8e8e;
          line-height: 20px;
        }
        i{
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
          font-size: 14px;
          color: #8e8e8e;
        }
        span{
          vertical-align: middle;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
