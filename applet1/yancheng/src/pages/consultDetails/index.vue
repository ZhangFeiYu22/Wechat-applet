<template>
  <div class="consultDetails">
    <navigation-bar :title="'征寻'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <!-- <div class="headBg"></div> -->
    <div class="head" @click.stop="goPersonal(solicitDetails.createId)">
      <div class="headImg">
        <img v-if="solicitDetails.avatar" :src="solicitDetails.avatar" mode="aspectFill" />
      </div>
      <div class="headName">
        <p class="name">{{solicitDetails.nickName}}</p>
        <p class="phone">
          <i class="iconfont icon-nan" v-if="solicitDetails.gender == 1"></i>
          <i class="iconfont icon-nv" v-else-if="solicitDetails.gender == 2"></i>
          <i class="iconfont" v-else></i>
          <span>{{solicitDetails.mobile}}</span>
        </p>
      </div>
      <div class="lvBox">
        <img :src="levUrl[solicitDetails.grade]" alt />
        <p>Lv{{solicitDetails.grade}}</p>
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
      <div class="PriceNum">+{{solicitDetails.integral}}砖</div>
    </div>

    <div class="detailsBox">
      <h5>详情</h5>
      <div class="detail-cont">{{solicitDetails.content}}</div>
      <div class="detail-imgList">
        <div class="imgbox" v-for="(item,index) in solicitDetails.images" :key="index">
          <image v-if="item" :src="item" mode="aspectFill" />
        </div>
      </div>
    </div>
    <div class="btnGroup">
      <div class="btnContact" @click="sixinFun">
        <i class="iconfont icon-sixin"></i>私信
      </div>
      <div class="btnMe" :class="isJoin?'isJoin':''" v-if="isEnroll" @click="joinConsult2">
        <i class="iconfont icon-aixin"></i>
        {{isJoin?'您已参加':'提交参加信息'}}
      </div>
      <div class="btnMe" v-else @click="joinConsult(solicitDetails)">
        <i class="iconfont icon-aixin"></i>
        算我一个
      </div>
    </div>

    <div class="mask" @click.stop="closeMask" v-if="maskVal"></div>
    <div class="maskCont" v-if="maskVal">
      <div class="title">
        <img v-if="solicitDetails.avatar" :src="solicitDetails.avatar" mode="aspectFill" />
        <span>{{solicitDetails.nickName}}</span>
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

    <div class="mask" v-if="joinMask"></div>
    <div class="joinDialog" v-if="joinMask">
      <div class="joinClose" @click.stop="closeJoinMask">X</div>
      <h5 class="joinTitle">请填写参加信息</h5>
      <div class="joinContent">
        <div class="line">
          <p class="pl">认证内容:</p>
          <textarea
            class="textAns"
            auto-focus
            placeholder="请输入认证内容"
            v-model="answerValue"
            placeholder-style="color:#b8b8b8"
          ></textarea>
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
        <div class="btnG">
          <div class="btn cancl" @click.stop="closeJoinMask">取消</div>
          <div class="btn sure" @click.stop="sureJoin(solicitDetails)">确认参加</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { messageTo } from "@/api/home";
import { solicitDetailsGet, solicitJoin, solicitSureJoin } from "@/api/solicit";
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
      maskVal: false, //私信显示判断
      myInfo: {},
      sixinValue: "",
      levUrl: [
        ``,
        `${this.$store.state.commonImgHttp}/lv1.png`,
        `${this.$store.state.commonImgHttp}/lv2.png`,
        `${this.$store.state.commonImgHttp}/lv3.png`,
        `${this.$store.state.commonImgHttp}/lv4.png`,
        `${this.$store.state.commonImgHttp}/lv5.png`
      ],
      isEnroll: false, //是否已报名
      isJoin: false, //是否已参加
      answerValue: "",
      joinMask: false,
      joinId: "" //参加的ID值
    };
  },
  onShow() {
    // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    this.fetchDetails(options.soId);
    this.myInfo = wx.getStorageSync("authInfo");
  },
  mounted() {
    this.imgArr1 = [];
  },
  methods: {
    async fetchDetails(id) {
      let soRes = await solicitDetailsGet(id);
      if (soRes.status == 200) {
        let solicitDetails = soRes.result;
        if (solicitDetails.images) {
          solicitDetails.images = solicitDetails.images.split("|");
        }
        this.solicitDetails = solicitDetails;
        if (this.solicitDetails.mySolicit) {
          this.isEnroll = true;
          this.joinId = this.solicitDetails.mySolicit.id;
          if (this.solicitDetails.mySolicit.status == 2) {
            this.isJoin = false;
          } else if (this.solicitDetails.mySolicit.status == 3) {
            this.isJoin = true;
          }
        } else {
          this.isEnroll = false;
        }
      }
    },
    goPersonal(id) {
      wx.navigateTo({
        url: `/pages/personal/main?createrId=${id}`
      });
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
        recipient: this.solicitDetails.createId
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
    joinConsult(detail) {
      let authInfo = wx.getStorageSync("authInfo");
      if (authInfo.isAuth) {
        let data = {
          solicitId: detail.id,
          needReal: detail.needReal,
          rank: detail.rank,
          title: detail.title
        };
        solicitJoin(data).then(res => {
          if (res.status == 200) {
            wx.showToast({
              title: "报名成功",
              icon: "none",
              duration: 1500
              // success(data) {
              //   setTimeout(function() {
              //     this.isEnroll = true;
              //     this.joinId = res.result;
              //   }, 1000); //延迟时间
              // }
            });
            this.isEnroll = true;
            this.joinId = res.result;
          }
        });
      } else {
        wx.showToast({
          title: "请先进行实名认证",
          icon: "none",
          duration: 1500,
          success(data) {
            setTimeout(function() {
              wx.navigateTo({
                url: `/pages/myAttestation/main`
              });
            }, 1500); //延迟时间
          }
        });
      }
    },
    joinConsult2() {
      if (this.isJoin) {
        wx.showToast({
          title: "您已参加，请勿重复参加",
          icon: "none",
          duration: 1500
        });
      } else {
        this.joinMask = true;
      }
    },
    closeJoinMask() {
      this.joinMask = false;
    },
    sureJoin(detail) {
      if (this.answerValue == "") {
        wx.showToast({
          title: "请填写认证内容",
          icon: "none",
          duration: 1500
        });
        return;
      }
      if (detail.needReal > 0) {
        if (this.imgArr1.length == 0) {
          wx.showToast({
            title: "该征寻需要认证，请上传认证图片",
            icon: "none",
            duration: 1500
          });
          return;
        }
      }
      let data = {
        id: this.joinId,
        answer: this.answerValue
      };
      if (detail.needReal > 0) {
        data["authImage"] = String(this.imgArr1[0]);
      }
      solicitSureJoin(data).then(res => {
        if (res.status == 200) {
          this.joinMask = false;
          wx.showToast({
            title: "参加成功",
            icon: "none",
            duration: 1500
          });
        }
      });
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
      // .edit-img {
      //   display: inline-block;
      //   vertical-align: top;
      //   margin-left: 10px;
      //   margin-top: 5px;
      // }
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
    .detail-cont {
      padding: 2px 0;
      width: 100%;
      font-size: 13px;
      color: #989898;
      padding: 10px 0;
    }
    .detail-imgList {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-between;
      margin-bottom: 10px;
      image {
        width: 75px;
        height: 75px;
        margin: 0 10px 5px 0;
      }
    }
  }

  .edit-textShow {
    box-sizing: border-box;
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
      &.is {
        background-color: #ddd;
      }
      &.isJoin {
        background-color: #ccc;
      }
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
  //参加回答图片盒子
  .joinDialog {
    position: fixed;
    z-index: 99;
    background: #fff;
    box-shadow: 0 0 2px 2px #ddd;
    width: 80%;
    top: 25%;
    left: 10%;
    border-radius: 5px;
    padding: 20px 10px;
    .joinClose {
      position: absolute;
      right: 10px;
      top: 6px;
      font-size: 16px;
    }
    .joinTitle {
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
    }
    .joinContent {
      .line {
        .pl {
          font-size: 14px;
          line-height: 36px;
        }
        .textAns {
          font-size: 13px;
          height: 80px;
          padding: 5px 10px;
          overflow-y: scroll;
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #eee;
          border-radius: 3px;
          text-align: justify;
        }
        .edit-img {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: space-between;
          margin-bottom: 10px;
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
            border-radius: 3px;
            font-size: 18px;
            color: #888;
            line-height: 75px;
            text-align: center;
          }
        }
      }
      .btnG {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        .btn {
          padding: 5px 15px;
          min-width: 60px;
          font-size: 14px;
          border-radius: 3px;
        }
        .cancl {
          background-color: #eee;
        }
        .sure {
          background-color: #ff8282;
          color: #fff;
        }
      }
    }
  }
}
</style>
