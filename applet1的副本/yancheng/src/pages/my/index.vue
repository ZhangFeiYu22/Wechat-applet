<template>
  <div class="my">
    <div class="head">
      <div class="headImg">
        <img src="../../assets/images/logoName.png" mode="aspectFill" />
      </div>
      <div class="rightIcon">
        <i class="iconfont icon-pinglun"></i>
        <i class="iconfont icon-aixin"></i>
        <i class="iconfont icon-pinglun"></i>
      </div>
    </div>
    <div class="baseInfo">
      <div class="nameSexPhone">
        <p class="name">张小凡</p>
        <p class="sex">男</p>
        <p class="phone">182****1234</p>
      </div>
      <div class="inaword">要成为世界第一的梦珂宝训练大师</div>
      <div class="other">
        <p class="constellation">金牛座</p>
        <p class="address">南京市</p>
        <p class="follower">15人关注</p>
      </div>
      <div class="editInfoBtn">
        编辑资料
      </div>
    </div>
    <div class="line"></div>
    <div class="navBox">  
      <div class="navItem"> 
         <img src="../../assets/images/logoName.png" mode="aspectFill">
         <p>话题</p>
      </div>
      <div class="navItem"> 
         <img src="../../assets/images/logoName.png" mode="aspectFill">
         <p>状态</p>
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem">
        <!-- <div class="headName">
          <img src="../../../static/images/head1.jpg" mode="aspectFill" />
          <span>张小凡</span>
        </div> -->
        <div
          class="content"
          id="contentInfo"
          :class="isToggle ?'ellip': ''"
        >细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵</div>
        <div v-if="isToggle" class="toggleBox">
          <div class="more_txt" @click="requireTxt">
            <span>{{requireAll ? '展开' : '收起'}}</span>
          </div>
        </div>
        <div class="imgsList">
          <div class="imgsItem">
            <img src="../../../static/images/c1.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c2.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c3.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c4.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c5.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c6.png" mode="aspectFill" />
          </div>
        </div>
        <div class="timeHandle">
          <div class="time">10分钟前</div>
          <div class="handle">
            <i class="iconfont icon-aixin"></i>
            <i class="iconfont icon-pinglun"></i>
            <i class="iconfont icon-xingtuxuetang-liuyan-"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  moubted() {}
};
</script>

<style lang="less" scoped>
.my {
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headImg {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightIcon {
      display: flex;
      justify-content: space-around;
      .iconfont {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
  .baseInfo {
    width: 90%;
    margin: 10px auto;
    position: relative;
    .nameSexPhone {
      display: flex;
      justify-content: left;
      align-items: center;
      .name {
        font-size: 20px;
        font-weight: 600;
        margin-right: 10px;
      }
      .sex {
        font-size: 14px;
        color: #707070;
        margin-right: 10px;
      }
      .phone {
        font-size: 16px;
        color: #525151;
      }
    }
    .inaword {
      font-size: 12px;
      color: #333;
      margin: 10px 0;
    }
    .other {
      display: flex;
      justify-content: left;
      p{
        padding: 2px 10px;
        margin-right: 10px;
        background-color: #eee;
        font-size: 12px;
        color: #525151;
        border-radius: 5px;
      }
    }
    .editInfoBtn{
      font-size: 12px;
      color: #525151;
      background-color: #eee;
      border: 1px solid #707070;
      position: absolute;
      top: 50%;
      right: 0;
      padding: 4px 15px;
      border-radius: 5px;
      transform: translateY(-50%);
    }
  }
  .line{
    width: 100%;
    height: 8px;
    background-color: #eee;
    margin-top: 20px;
  }
  .navBox{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 15px 0 0px;
    .navItem{
      img{
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 5px;
      }
      p{
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        color: #E83E3E;
      }
    }
  }
  // 内容列表
  .contentList {
    margin-top: 20px;
    .contentItem {
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
      .headName {
        margin-bottom: 10px;
        img {
          width: 28px;
          height: 28px;
          vertical-align: middle;
          margin-right: 5px;
        }
        span {
          font-size: 18px;
          vertical-align: middle;
        }
      }
      .content {
        line-height: 20px;
        color: #6f6d6d;
        font-size: 16px;
        text-align: justify;
        &.ellip {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
        }
      }
      .toggleBox {
        font-size: 16px;
        color: #6f6d6d;
      }
      .imgsList {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
        .imgsItem {
          width: 32%;
          height: 115px;
          margin-bottom: 5px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .timeHandle {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        .time {
          width: 40%;
          font-size: 14px;
          color: #8b8b8b;
        }
        .handle {
          width: 30%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
