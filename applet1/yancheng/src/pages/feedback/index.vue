<template>
  <div class="feedback">
    <navigation-bar :title="'反馈与建议'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="formBox">
      <textarea
        placeholder="请留下你的宝贵意见或者建议，我们将努力改进"
        placeholder-style="color:#ECECEC;font-size:16px;"
        v-model="msg"
        name="textarea"
      />
      <button @click="bindFormSubmit">提交</button>
    </div>
  </div>
</template>

<script>
import { suggestionPost } from "@/api/my.js";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    async bindFormSubmit() {
      let authInfo = wx.getStorageSync("authInfo");
      let data = {
        content: this.msg,
        creator: authInfo.id
      };
      let suRes = await suggestionPost(data);
      if (suRes.status == 200) {
        wx.showToast({
          title: "感谢您的反馈，谢谢",
          icon: "none",
          duration: 1000,
          success(data) {
            setTimeout(function() {
              this.msg = "";
              //要延时执行的代码
              wx.navigateBack({
                delta: 1
              });
            }, 1000); //延迟时间
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.feedback {
  .formBox {
    textarea {
      width: 85%;
      margin: 20px auto;
      box-shadow: 0 2px 4px 2px #eee;
      padding: 10px;
      border-radius: 5px;
      line-height: 20px;
    }
    button {
      width: 90%;
      margin: 20px auto;
      color: #fff;
      font-size: 14px;
      background-color: #b1a1a3;
      height: 40px;
      line-height: 40px;
      &::after {
        border: none;
      }
    }
  }
}
</style>
