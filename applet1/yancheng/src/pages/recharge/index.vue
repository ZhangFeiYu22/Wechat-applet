<template>
  <div class="recharge">
    <div class="wallet">
      <div class="gold">
        <p class="p1">
          1000
          <span>金币</span>
        </p>
        <p class="p2">
          <i class="iconfont icon-zhuyi"></i><span>1元=10金币</span>
        </p>
      </div>
    </div>
    <div class="rechargeBox">
      <div class="topBox">
        <div class="topItem">
          <p class="p1">300元</p>
          <p class="p2">送200金币</p>
        </div>
        <div class="topItem">
          <p class="p1">300元</p>
          <p class="p2">送200金币</p>
        </div>
        <div class="topItem">
          <p class="p1">300元</p>
          <p class="p2">送200金币</p>
        </div>
      </div>
      <div class="topItem" :class="reClick ? 'otherItem' : ''" @click="rechargeClick">
        <p class="p1 pp1">其他金额</p>
        <p class="p2">
          <i class="iconfont icon-xiangxia"></i>
        </p>
      </div>
    </div>
    <div class="rechargeMoney" v-if="reClick">
      <div>
        <input type="number" />
        <span class="btnSpan">立即充值</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reClick: false
    };
  },
  methods: {
    rechargeClick(){
      this.reClick = !this.reClick
    }
  }
};
</script>

<style lang="less" scoped>
.recharge {
  .wallet {
    height: 120px;
    margin: 15px auto 10px;
    background: linear-gradient(to right, #fd5139, #fe9386);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    .gold {
      .p1 {
        font-size: 30px;
        span {
          font-size: 12px;
        }
      }
      .p2 {
        font-size: 12px;
        line-height: 30px;
        i {
          display: inline-block;
          font-size: 14px;
          margin-right: 2px;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
        }
      }
    }
  }
  .rechargeBox {
    width: 90%;
    margin: 0 auto;
    .topBox {
      display: flex;
      justify-content: space-between;
    }
    .topItem {
      width: 110px;
      height: 70px;
      text-align: center;
      border: 1px solid #b9b9b9;
      border-radius: 5px;
      padding: 15px 0;
      margin-bottom: 10px;
      .p1 {
        font-size: 20px;
        line-height: 20px;
        &.pp1{
          font-size: 14px;
        }
      }
      .p2 {
        color: #ff3f3f;
        font-size: 13px;
        line-height: 20px;
      }
      &.otherItem {
        background-color: #ffddd1;
        .p1 {
          font-size: 14px;
          color: #ff3f3f;
        }
      }
    }
  }
  .rechargeMoney {
    border: 1px solid #b9b9b9;
    height: 100px;
    width: 90%;
    margin: 20px auto;
    border-radius: 5px;
    background-color: #fafafa;
    position: relative;
    &::before {
      display: block;
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border: 1px solid #b9b9b9;
      transform: rotate(45deg);
      top: -8px;
      background-color: #fafafa;
      left: 45px;
      z-index: -1;
    }
    &::after {
      display: block;
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      transform: rotate(45deg);
      top: -7px;
      background-color: #fafafa;
      left: 47px;
    }
    div {
      border: 1px solid #707070;
      height: 50px;
      line-height: 50px;
      width: 90%;
      margin: 23px auto 0;
      border-radius: 5px;
      overflow: hidden;
      input {
        height: 48px;
        line-height: 48px;
        width: 64%;
        padding: 0 3%;
        display: inline-block;
        vertical-align: top;
      }
      .btnSpan {
        display: inline-block;
        width: 30%;
        line-height: 48px;
        height: 48px;
        vertical-align: top;
        text-align: center;
        background-color: #FD5841;
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
