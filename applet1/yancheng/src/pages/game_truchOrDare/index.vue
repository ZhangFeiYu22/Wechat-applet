<template>
  <div class="game1">
    <div class="selectBox">真心话</div>
    <div class="contentBox">
      <img src="../../../static/images/aaa1.png" mode="aspectFill">
      <p>{{msg}}</p>
      <button class="changBtn" @click="changeFun">换一个</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '这是真心话内容',
      msgArr: [
        '这是随机内容1',
        '这是随机内容2',
        '这是随机内容3',
        '这是随机内容4',
        '这是随机内容5',
        '这是随机内容6',
        '这是随机内容7'
      ]
    };
  },
  methods: {
    changeFun(){
      this.msg = this.msgArr[Math.floor((Math.random()*this.msgArr.length))]
    }
  },
  moubted() {}
};
</script>

<style lang="less" scoped>
.game1 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  .selectBox{
    width: 70%;
    height: 50px;
    line-height: 44px;
    border-radius: 50px;
    border: 3px solid #fff;
    color: #fff;
    text-align: center;
    margin: 10% auto 40px;
  }
  .contentBox{
    width: 70%;
    height: 300px;
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    position: relative;
    img{
      width: 50px;
      height: 50px;
    }
    p{
      color: #fff;
      margin-top: 50px;
      line-height: 20px;
    }
    .changBtn{
      position: absolute;
      height: 40px;
      line-height: 36px;
      width: 50%;
      border-radius: 40px;
      border: 2px solid #fff;
      bottom: 20px;
      left: 25%;
      font-size: 15px;
    }
  }
}
</style>
