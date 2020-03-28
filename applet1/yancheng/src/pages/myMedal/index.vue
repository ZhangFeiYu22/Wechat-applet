<template>
  <div class="myMedal">
    <navigation-bar
      :title="'我的勋章'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="headImg">
      <img v-if="myInfo.avatar" :src="myInfo.avatar" mode="aspectFill" />
      <p class="name">{{myInfo.nickName}}</p>
      <div class="medalNum">
        <i class="iconDot left"></i>
        <p v-if="medalNum == 0">暂未获得勋章</p>
        <p v-else>共获得<span>{{medalNum}}</span>枚勋章</p>
        <i class="iconDot right"></i>
      </div>
    </div>
    <div class="medalList">
      <div class="medalItem" v-for="(item,index) in myMedal" :key="index">
        <img v-if="item.image" :src="item.image" mode="aspectFill">
        <p class="info">{{item.status}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { myMedalGet } from "@/api/my.js";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      myInfo: '',
      medalNum: 0,
      myMedal: []
    };
  },
  mounted () {
    this.myInfo = wx.getStorageSync('authInfo');
    this.fetchMyMedal();
  },
  methods: {
    async fetchMyMedal(){
      let mRes = await myMedalGet();
      if(mRes.status == 200){
        this.myMedal = mRes.result.data;
        this.medalNum = this.myMedal.length;
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
.myMedal {
  .headImg {
    text-align: center;
    padding: 10px 0 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    .name {
      color: #403f3f;
      font-size: 16px;
    }
    .medalNum {
      line-height: 30px;
      color: #797979;
      font-size: 13px;
      position: relative;
      .iconDot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: #d5d5d5;
        vertical-align: middle;
        &.left {
          margin-right: 5px;
        }
        &.right {
          margin-left: 5px;
        }
      }
      p {
        display: inline-block;
        vertical-align: middle;
        span {
          color: #b1a1a3;
          font-size: 20px;
          display: inline-block;
          vertical-align: bottom;
          margin: 0 2px;
        }
      }
    }
  }
  .medalList {
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .medalItem {
      text-align: center;
      img{
        width: 106px;
        height: 95px;
      }
      p{
        color: #B1A1A3;
        font-size: 14px;
      }
    }
  }
}
</style>
