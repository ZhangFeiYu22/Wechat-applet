<template>
  <div class="consultDetails">
    <navigation-bar :title="'征寻'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <!-- <div class="headBg"></div> -->
    <div class="head">
      <div class="headImg">
        <img v-if="myInfo.avatar" :src="myInfo.avatar" mode="aspectFill" />
      </div>
      <div class="headName">
        <p class="name">{{myInfo.nickName}}</p>
        <p class="phone">
          <i class="iconfont icon-nan" v-if="myInfo.gender == 1"></i>
          <i class="iconfont icon-nv" v-else-if="myInfo.gender == 2"></i>
          <i class="iconfont" v-else></i>
          <span>18211112222</span>
        </p>
      </div>
      <div class="lvBox">
        <img :src="levUrl" alt />
        <p>Lv5</p>
      </div>
    </div>

    <div class="taskBox">
      <h5>富得利砍价任务</h5>
      <div class="line">
        <p class="pl">人数:</p>
        <p class="pr">10/20</p>
      </div>
      <div class="line">
        <p class="pl">时间:</p>
        <p class="pr">6小时</p>
      </div>
      <div class="line">
        <p class="pl">等级:</p>
        <p class="pr">5级以上</p>
      </div>
      <div class="line">
        <p class="pl">实名:</p>
        <p class="pr">完成认证</p>
      </div>
      <div class="line">
        <p class="pl">认证图片:</p>
        <div class="edit-img">
          <div class="imgbox" v-for="(item,index) in imgArr1" :key="index">
            <image v-if="item" :src="item" mode="aspectFill" />
            <i class="close iconfont icon-iconless" @click.stop="closeFunOne(item,index)"></i>
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImageOne"></div>
        </div>
      </div>
      <div class="PriceNum">+20砖</div>
    </div>

    <div class="detailsBox">
      <h5>详情</h5>
      <div class="edit-text edit-textNo">{{realTextValue}}</div>
      <div class="edit-img">
        <div class="imgbox" v-for="(item,index) in imgArr1" :key="index">
          <image v-if="item" :src="item" mode="aspectFill" />
          <i class="close iconfont icon-iconless" @click.stop="closeFunOne(item,index)"></i>
        </div>
        <div class="iconfont icon-jiahao" @click.stop="chooseImageOne"></div>
      </div>
      <!-- <textarea
        v-if="textStatus"
        class="edit-text edit-textShow"
        auto-focus
        @blur="bindblurTextStatus"
        v-model="detial"
      ></textarea>
      <div
        v-else
        class="edit-text edit-textNo"
        :style="{color: textNoColor}"
        @click="changeTextStatus"
      >{{realTextValue}}</div>-->
    </div>
    <div class="btnGroup">
      <div class="btnContact">
        <i class="iconfont icon-sixin"></i>私信
      </div>
      <div class="btnMe">
        <i class="iconfont icon-aixin"></i>算我一个
      </div>
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
      textNoColor: "#dcdcdc",
      realTextValue: "详情描述",
      textStatus: false,
      detial: "",
      currentNum: 0,
      myInfo: {},
      levUrl: `${this.$store.state.commonImgHttp}/lv5.png`
    };
  },
  mounted() {
    this.myInfo = wx.getStorageSync("authInfo");
  },
  methods: {
    swiperChange(e) {
      this.currentNum = e.target.current;
    },
    changeTextStatus() {
      this.realTextValue = "";
      this.textStatus = true;
    },
    bindblurTextStatus() {
      if (this.detial.length == 0) {
        this.realTextValue = "详情描述";
        this.textNoColor = "#dcdcdc";
      } else {
        this.realTextValue = this.detial;
        this.textNoColor = "#353535";
      }
      this.textStatus = false;
    }
  }
};
</script>

<style lang="less" scoped>
.consultDetails {
  padding-bottom: 50px;
  .headBg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom, #fd1e1e, #ff7a69);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .head {
    width: 94%;
    margin: 15px auto;
    padding: 10px;
    display: flex;
    align-items: center;
    position: relative;
    box-shadow: 0 0 2px 2px #eee;
    border-radius: 5px;
    background-color: #fff;
    .headImg {
      margin-right: 10px;
      img {
        width: 56px;
        height: 56px;
        border-radius: 100%;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .headName {
      flex: 1;
      p {
        line-height: 30px;
        &.name {
          font-size: 20px;
        }
        &.phone {
          font-size: 16px;
          i {
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
    .lvBox {
      position: absolute;
      right: 10%;
      text-align: center;
      img {
        width: 48px;
        height: 48px;
      }
      p {
        font-size: 11px;
        position: relative;
        top: -5px;
      }
    }
  }
  .taskBox {
    width: 94%;
    margin: 15px auto;
    padding: 10px;
    box-shadow: 0 0 2px 2px #eee;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    h5 {
      font-size: 16px;
      line-height: 32px;
    }
    .line {
      font-size: 14px;
      p {
        display: inline-block;
        line-height: 30px;
      }
      .pl {
        color: #989898;
        margin-right: 5px;
      }
      .edit-img {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        margin-top: 5px;
      }
    }
    .PriceNum {
      position: absolute;
      font-size: 20px;
      color: #ff0c0c;
      right: 10%;
      top: 40%;
    }
  }
  .detailsBox {
    width: 94%;
    margin: 15px auto;
    padding: 10px;
    box-shadow: 0 0 2px 2px #eee;
    border-radius: 5px;
    background-color: #fff;
  }

  .edit-text {
    height: 64px;
    padding: 2px 0;
    width: 100%;
    overflow-y: scroll;
    font-size: 15px;
    color: #353535;
  }
  .edit-textShow {
    box-sizing: border-box;
  }
  .edit-textNo {
    color: #dcdcdc;
  }

  .edit-img {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;
    margin-bottom: 20px;
    .imgbox {
      position: relative;
      .close {
        position: absolute;
        border-radius: 15px;
        width: 18px;
        height: 18px;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        color: #da4b47;
        right: 14px;
        top: 0px;
      }
    }
    image {
      width: 75px;
      height: 75px;
      margin: 0 15px 5px 0;
    }
    .icon-jiahao {
      width: 75px;
      height: 75px;
      border: 1px solid #707070;
      font-size: 18px;
      color: #888;
      line-height: 75px;
      text-align: center;
    }
  }
  .btnGroup {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    text-align: center;
    font-size: 14px;
    i{
      display: inline-block;
      margin-right: 5px;
    }
    .btnContact {
      width: 30%;
      background-color: #fff;
      color: #000;
    }
    .btnMe {
      background-color: #b1a1a3;
      color: #fff;
      width: 70%;
    }
  }
}
</style>
