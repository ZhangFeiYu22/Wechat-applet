<template>
  <div class="feedback">
     <navigation-bar
      :title="'反馈与建议'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <form @submit="bindFormSubmit" class="formBox">
      <textarea
        placeholder="请留下你的宝贵意见或者建议，我们将努力改进"
        placeholder-style="color:#ECECEC;font-size:18px;"
        name="textarea"
      />
      <button form-type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {};
  },
  methods: {
    bindFormSubmit: function(e) {
      console.log(e.mp.detail.value.textarea);
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
