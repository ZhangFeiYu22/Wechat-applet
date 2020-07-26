<template>
  <div class="messageDetails">
    <navigation-bar :title="'消息'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="head">
      <div class="headImg">
        <img
          v-if="msgOne.properties.creatorAvatar"
          :src="msgOne.properties.creatorAvatar"
          mode="aspectFill"
        />
      </div>
      <div class="nameTime">
        <p class="name">{{msgOne.properties.creatorName}}</p>
        <p class="time">{{msgOne.createTime}}</p>
      </div>
    </div>
    <div class="content">
      <div class="list">
        <p class="fromStyle">
          <span class="fff">{{msgOne.properties.creatorName}}</span>对你说：
          <span class="say">{{msgOne.msg}}</span>
        </p>
      </div>
    </div>
    <div class="returnBtn" @click="backMessage">回发消息</div>
    <div class="mask" @click.stop="closeMask" v-if="showPinLun"></div>
    <div v-if="showPinLun" class="pinlunB">
      <form report-submit="true" @submit="submitComment">
        <view class="liuyan">
          <input
            class="input"
            auto-focus
            cursor-spacing="32rpx"
            :value="commentValue"
            @input="getcomment"
            :placeholder="placeholderPL"
          />
          <button class="btnPut" form-type="submit">发送</button>
        </view>
      </form>
    </div>
  </div>
</template>

<script>
import { messageOne, messageTo } from "@/api/my.js";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      showPinLun: false,
      placeholderPL: " 回复",
      commentValue: "",
      msgOne: {}
    };
  },
  onLoad(options) {
    this.msgOne = JSON.parse(options.msgData);
  },
  methods: {
    async fetchMessageOne(id) {
      let mRes = await messageOne(id);
      if (mRes.status == 200) {
        this.msgOne = mRes.result;
      }
    },
    backMessage() {
      this.commentValue = "";
      this.placeholderPL = "回复: " + this.msgOne.properties.creatorName;
      this.showPinLun = true;
    },
    getcomment(e) {
      this.commentValue = e.target.value;
    },
    closeMask() {
      this.showPinLun = false;
    },
    submitComment() {
      let authinfo = wx.getStorageSync('authInfo');
      let data = {
        msg: this.commentValue,
        recipient: this.msgOne.creator
      };
      messageTo(data).then(res => {
        if (res.status == 200) {
          this.showPinLun = false;
          wx.showToast({
            title: "发送成功",
            duration: 2000 //停留时间
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.messageDetails {
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    .headImg {
      width: 46px;
      height: 46px;
      margin-right: 10px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nameTime {
      flex: 1;
      p {
        &.name {
          font-size: 16px;
          line-height: 26px;
          color: #403f3f;
        }
        &.time {
          font-size: 13px;
          line-height: 14px;
          color: #797979;
        }
      }
    }
  }
  .content {
    width: 90%;
    margin: 20px auto;
    .list {
      font-size: 13px;
      color: #797979;
      .fromStyle,
      .toStyle {
        .left {
          .fff,
          .ttt {
            color: #516f8e;
          }
        }
        .right {
          .say {
            line-height: 25px;
          }
        }
      }
    }
  }
  .returnBtn {
    background-color: #b1a1a3;
    color: #fff;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    width: 60%;
    position: fixed;
    bottom: 40px;
    text-align: center;
    border-radius: 5px;
    left: 20%;
    letter-spacing: 2px;
  }
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .pinlunB {
    .liuyan {
      display: flex;
      background: #fafafa;
      border-top: 1px solid #ddd;
      width: 100%;
      bottom: 0;
      position: fixed;
      z-index: 4;
      height: 50px;
      justify-content: center;
      align-items: center;
      padding: 10px 5px;
      .input {
        background-color: #fff;
        flex: 1;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 10px;
      }
      .btnPut {
        font-size: 10px;
        width: 50px;
        background: #00c161;
        color: #fff;
        height: 40px;
        line-height: 40px;
        border-radius: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        &::after {
          border: none;
        }
      }
    }
  }
}
</style>
