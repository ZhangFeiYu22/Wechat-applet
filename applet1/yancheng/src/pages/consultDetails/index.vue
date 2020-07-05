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
      <h5>{{solicitDetails.title}}</h5>
      <div class="line">
        <p class="pl">人数:</p>
        <p class="pr">{{solicitDetails.num}}</p>
      </div>
      <div class="line">
        <p class="pl">时间:</p>
        <p class="pr">{{solicitDetails.validDay}}天</p>
      </div>
      <div class="line">
        <p class="pl">等级:</p>
        <p class="pr">{{solicitDetails.rank}}级以上</p>
      </div>
      <div class="line">
        <p class="pl">实名:</p>
        <p class="pr">{{solicitDetails.needReal == '1' ? '需要' : '不需要'}}</p>
      </div>
      <div class="line" v-if="solicitDetails.needReal == '1'">
        <p class="pl">认证图片:</p>
        <div class="edit-img">
          <div class="imgbox" v-for="(item,index) in imgArr1" :key="index">
            <image v-if="item" :src="item" mode="aspectFill" />
            <i class="close iconfont icon-iconless" @click.stop="closeFunOne(item,index)"></i>
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImageOne"></div>
        </div>
      </div>
      <div class="PriceNum">+{{solicitDetails.integral}}砖</div>
    </div>

    <div class="detailsBox">
      <h5>详情</h5>
      <div class="edit-text">{{solicitDetails.content}}</div>
      <div class="edit-img">
        <div class="imgbox" v-for="(item,index) in imgArr2" :key="index">
          <image v-if="item" :src="item" mode="aspectFill" />
          <i class="close iconfont icon-iconless" @click.stop="closeFunTwo(item,index)"></i>
        </div>
        <div class="iconfont icon-jiahao" @click.stop="chooseImageTwo"></div>
      </div>
    </div>
    <div class="btnGroup">
      <div class="btnContact" @click="sixinFun">
        <i class="iconfont icon-sixin"></i>私信
      </div>
      <div class="btnMe">
        <i class="iconfont icon-aixin"></i>算我一个
      </div>
    </div>

    <div class="mask" @click.stop="closeMask" v-if="maskVal"></div>
    <div class="maskCont" v-if="maskVal">
      <div class="title">
        <img v-if="myInfo.avatar" :src="myInfo.avatar" mode="aspectFill" />
        <span>{{myInfo.nickName}}</span>
      </div>
      <div class="textaCont">
        <textarea
          class="textA"
          auto-focus
          placeholder="请留下你想说的话，将发送到对方的消息中心"
          v-model="sixinValue"
          placeholder-style="color:#b8b8b8"
        ></textarea>
        <span class="numSpan">限100字</span>
      </div>
      <button class="contBtn" @click="conBtnPut">发送</button>
    </div>
  </div>
</template>

<script>
import { solicitDetailsGet } from "@/api/solicit";
import { imgsUpload } from "@/utils/imgsUpload";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      solicitDetails: {},
      imgArr1: [],
      imgArr2: [],
      maskVal: false, //私信显示判断
      myInfo: {},
      levUrl: `${this.$store.state.commonImgHttp}/lv5.png`
    };
  },
  onLoad(options) {
    this.fetchDetails(options.soId);
    this.myInfo = wx.getStorageSync("authInfo");
  },
  methods: {
    async fetchDetails(id) {
      let soRes = await solicitDetailsGet(id);
      if (soRes.status == 200) {
        this.solicitDetails = soRes.result;
        console.log(this.solicitDetails);
      }
    },
    // 私信弹窗
    sixinFun() {
      this.maskVal = true;
      this.sixinValue = "";
    },
    // 关闭私信弹窗
    closeMask() {
      this.maskVal = false;
    },
    // 发送私信
    conBtnPut() {
      let data = {
        msg: this.sixinValue,
        recipient: this.memberInfo.id
      };
      messageTo(data).then(res => {
        if (res.status == 200) {
          this.maskVal = false;
          wx.showToast({
            title: "发送成功",
            duration: 2000 //停留时间
          });
        }
      });
    },
    chooseImageOne() {
      let self = this;
      // if (this.imgArr1.length > 2) {
      //   wx.showToast({
      //     title: "最多上传两张图片",
      //     icon: "none",
      //     duration: 2000
      //   });
      // } else {
        self.$store.dispatch("getOssData", { dir: "city/solicit/real" });
        wx.chooseImage({
          count: 1,
          sizeType: "compressed",
          sourceType: ["album", "camera"],
          success(res) {
            let newArr = [];
            for (var i = 0; i < res.tempFilePaths.length; i++) {
              imgsUpload(res.tempFilePaths[i]).then(rere => {
                newArr.push(rere);
                self.imgArr1 = newArr;
              });
            }
          }
        });
      // }
    },
    closeFunOne(item, index) {
      this.imgArr1.splice(index, 1);
    },
    chooseImageTwo() {
      let self = this;
      self.$store.dispatch("getOssData", { dir: "city/activityContent" });
      wx.chooseImage({
        count: 5,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            imgsUpload(res.tempFilePaths[i]).then(rere => {
              self.imgArr2.push(rere);
            });
          }
        }
      });
    },
    closeFunTwo(item, index) {
      this.imgArr2.splice(index, 1);
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
    h5 {
      font-size: 14px;
    }
  }

  .edit-text {
    padding: 2px 0;
    width: 100%;
    font-size: 14px;
    color: #989898;
  }
  .edit-textShow {
    box-sizing: border-box;
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
      border: 1px solid #909090;
      border-radius: 4px;
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
    i {
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
  // 私信弹窗
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .maskCont {
    position: absolute;
    z-index: 4;
    width: 80%;
    // height: 35%;
    background-color: #fff;
    padding: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .title {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      img {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        margin-right: 10px;
      }
    }
    .textaCont {
      background-color: #e8e8e8;
      height: 127px;
      padding: 10px;
      position: relative;
      .textA {
        font-size: 14px;
        width: 100%;
        height: 100%;
        text-align: justify;
        color: #333;
      }
      .numSpan {
        position: absolute;
        display: block;
        right: 10px;
        bottom: 5px;
        color: #b7b7b7;
        font-size: 15px;
      }
    }
    .contBtn {
      background-color: #b1a1a3;
      color: #fff;
      width: 110px;
      height: 26px;
      line-height: 26px;
      margin: 10px auto 0;
      font-size: 15px;
      &::after {
        border: none;
      }
    }
  }
}
</style>
