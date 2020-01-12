<template>
  <div class="myAttestation">
    <div class="lineHeight">
      <span class="left">真实姓名</span>
      <input
        class="right"
        type="text"
        placeholder="请输入真实姓名"
        placeholder-style="color:#d8d8d8;font-size:14px;"
        :value="attForm.name"
        @input="bininput_name"
      />
    </div>
    <div class="lineHeight">
      <span class="left">身份证号</span>
      <input
        class="right"
        type="number"
        placeholder="请输入15位或18位身份证号码"
        placeholder-style="color:#d8d8d8;font-size:14px;"
        maxlength="18"
        :value="attForm.card"
        @input="bininput_card"
      />
    </div>
    <div class="line"></div>
    <div class="idCardBox">
      <h4>上传身份证照片</h4>
      <div class="card" @click="chooseImage1">
        <i v-if="images1.length==0" class="iconfont icon-xiangji1"></i>
        <img v-if="images1.length!==0" :src="images1[0]" mode="aspectFill" />
      </div>
      <div class="card" @click="chooseImage2">
        <i v-if="images2.length==0" class="iconfont icon-xiangji1"></i>
        <img v-if="images2.length!==0" :src="images2[0]" mode="aspectFill" />
      </div>
    </div>
    <button class="btn" @click="bindFormSubmit">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attForm: {
        name: "",
        card: "",
        url1: "",
        url2: ""
      },
      images1: [],
      images2: []
    };
  },
  methods: {
    bininput_name(e) {
      this.attForm.name = e.mp.detail.value;
    },
    bininput_card(e) {
      this.attForm.card = e.mp.detail.value;
    },
    bindFormSubmit() {
      console.log(this.attForm);
      this.attForm.url1 = this.images1[0];
      this.attForm.url2 = this.images2[0];
      let isCard = this.regCodeFun(this.attForm.card);
      if (this.attForm.name == "") {
        wx.showToast({
          title: "姓名不能为空",
          icon: "none",
          duration: 2000
        });
      } else if (!isCard) {
        wx.showToast({
          title: "身份证格式有错误，请检查并重新输入",
          icon: "none",
          duration: 2000
        });
      } else if (this.attForm.url1 == "" || typeof(this.attForm.url1) == 'undefined' || this.attForm.url2 == "" || typeof(this.attForm.url2) == "undefined") {
        wx.showToast({
          title: "请上传身份证图片",
          icon: "none",
          duration: 2000
        });
      }else{
        wx.showToast({
          title: "提交成功",
          icon: "success",
          duration: 2000
        });
      }
      console.log(isCard);
    },
    regCodeFun(idcard) {
      var ts = this;
      var code = idcard; //identity 为你输入的身份证
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;
      var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
      if (!code || !code.match(reg)) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      if (pass) {
        // ts.setData({ allow_id: true });
        wx.setStorageSync("idcard", code);
      }
      if (!pass) console.log("tip" + tip);
      return pass;
    },
    chooseImage1(e) {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], //可选择原图或压缩后的图片
        sourceType: ["album", "camera"], //可选择性开放访问相册、相机
        success: res => {
          this.images1 = res.tempFilePaths;
        }
      });
    },
    chooseImage2(e) {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], //可选择原图或压缩后的图片
        sourceType: ["album", "camera"], //可选择性开放访问相册、相机
        success: res => {
          this.images2 = res.tempFilePaths;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myAttestation {
  padding-top: 20px;
  .lineHeight {
    width: 90%;
    margin: 0 auto;
    line-height: 40px;
    &:first-child {
      border-bottom: 1px solid #eeeeee;
    }
    .left {
      display: inline-block;
      width: 30%;
      color: #0c0c0c;
      font-size: 14px;
      vertical-align: middle;
      text-align: center;
    }
    .right {
      display: inline-block;
      width: 70%;
      font-size: 14px;
      color: #0c0c0c;
      vertical-align: middle;
    }
  }
  .line {
    width: 100%;
    height: 8px;
    background-color: #f0f0f0;
    margin: 10px 0;
  }
  .idCardBox {
    width: 90%;
    margin: 0 auto;
    padding: 0 6%;
    h4 {
      color: #0c0c0c;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .card {
      width: 100%;
      height: 170px;
      border: 1px solid #707070;
      line-height: 168px;
      text-align: center;
      margin-bottom: 5px;
      position: relative;
      i {
        color: #b1a1a3;
        font-size: 60px;
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .btn {
    width: 30%;
    margin: 20px auto;
    color: #fff;
    font-size: 14px;
    background-color: #b1a1a3;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    &::after {
      border: none;
    }
  }
}
</style>
