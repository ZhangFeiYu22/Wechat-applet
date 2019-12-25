<template>
  <div class="myInfo">
    <div class="headImg">
      <img src="../../assets/images/logoName.png" mode="aspectFill">
    </div>
    <div class="infoList">
      <div class="infoItem">
        <p class="ll">昵称</p>
        <p class="cc">张小凡</p>
      </div>
      <div class="infoItem">
        <p class="ll">简介</p>
        <p class="cc">这是简介</p>
      </div>
      <div class="infoItem">
        <p class="ll">性别</p>
        <p class="cc">男</p>
      </div>
      <div class="infoItem">
        <p class="ll">生日</p>
        <p class="cc">2019-01-01</p>
      </div>
      <div class="infoItem">
        <p class="ll">城市</p>
        <p class="cc">江苏 南京</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data(){
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
.myInfo{
  .headImg{
    text-align: center;
    padding: 10px 0 20px;
    img{
      width: 70px;
      height: 70px;
    }
  }
  .infoList{
    width: 85%;
    margin: 0 auto;
    .infoItem{
      font-size: 13px;
      line-height: 40px;
      display: flex;
      justify-content: flex-start;
      color: #525151;
      .ll{
        margin-right: 30px;
      }
      .cc{
        flex-grow: 1;
        position: relative;
        &::after{
          display: block;
          content: '';
          width: 6px;
          height: 6px;
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          transform: rotate(-45deg);
          position: absolute;
          right: 0;
          top: 16px;
        }
      }
    }
  }
}
</style>
