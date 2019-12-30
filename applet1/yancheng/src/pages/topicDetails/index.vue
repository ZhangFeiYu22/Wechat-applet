<template>
  <div class="topicDetails">
    <!-- 内容列表 -->
    <div class="contentItem w94">
      <div class="headName" @click="goPersonal">
        <div class="headImg">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="nameTime">
          <p class="name">张小凡</p>
          <p class="time">2019.12.12 12:12</p>
        </div>
      </div>
      <div
        class="content"
        id="contentInfo"
        :class="isToggle ?'ellip': ''"
      >细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨，淅淅沥沥的春雨就飘然而至，莺飞草长，一泓碧水粼粼而起，杨柳拂堤，碧草如丝，繁花似锦，飞泉鸣溅，古寺的梵音在石缝间流淌，雨后的空气溢出清新的芳香。而后是杏花雨，梨花雨，暮春过后，连绵不断的黄梅雨又弥漫江南。夜晚的雨声，清晨的花香，清绝的令人深深沉醉，秀雅的让人不舍离去。纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵</div>
      <div v-if="isToggle" class="toggleBox">
        <div class="more_txt" @click="requireTxt">
          <span>{{requireAll ? '展开' : '收起'}}</span>
        </div>
      </div>
      <div class="imgsList">
        <div class="imgsItem">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="imgsItem">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="imgsItem">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="imgsItem">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="imgsItem">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="imgsItem">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
      </div>
      <div class="timeHandle">
        <div class="reviewNum">
          评论
          <span>6</span>
        </div>
        <div class="likeNum">
          喜欢
          <span>5</span>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="reviceList w94">
      <div class="reviceItem">
        <div class="leftHead">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="rightCont">
          <h5 class="name">张小凡</h5>
          <ul class="reviceCont">
            <li>
              <div class="cont">这是一段评论，评论</div>
              <div class="handle">
                <p>10分钟</p>
                <p>回复</p>
                <p>私聊</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="reviceItem">
        <div class="leftHead" @click="goPersonal">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="rightCont">
          <h5 class="name">张小凡</h5>
          <ul class="reviceCont">
            <li>
              <div class="cont">这是一段评论，评论</div>
              <div class="handle">
                <p>10分钟</p>
                <p>回复</p>
                <p>私聊</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footerBox">
      <div class="share">
        <i class="iconfont icon-fenxiang"></i>
        <span>分享</span>
      </div>
      <div class="other">
        <p>
          <i class="iconfont icon-aixin"></i>
          <span>喜欢</span>
        </p>
        <p>
          <i class="iconfont icon-pinglun"></i>
          <span>评论</span>
        </p>
        <p @click="openMask">
          <i class="iconfont icon-sixin"></i>
          <span>私信</span>
        </p>
      </div>
    </div>
    <div class="mask" @click.stop="closeMask" v-if="maskVal">
      <div class="maskCont">
        <div class="title">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          <span>张小凡</span>
        </div>
        <div class="cont">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskVal: false,
      isToggle: false, //是否超过2行？true--超过，false--没有超过
      requireAll: false //展开/收起全部问题描述true--展开，false--收起
    };
  },
  methods: {
    requireTxt() {
      if (this.isToggle) {
        this.isToggle = false;
        this.requireAll = false;
      } else {
        this.isToggle = true;
        this.requireAll = true;
      }
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    openMask(){
      this.maskVal = true;
    },
    closeMask(){
      this.maskVal = false;
    }
  },
  onShow() {
    //获取外层wrap的高度
    const that = this;
    const query = wx.createSelectorQuery();
    query.select("#contentInfo").boundingClientRect();
    console.log(query);
    query.exec(function(res) {
      if (res[0].height > 100) {
        that.isToggle = true;
        that.requireAll = true;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.topicDetails {
  padding-bottom: 60px;
  // 内容列表
  .contentItem {
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 20px;
    .headName {
      display: flex;
      margin-bottom: 10px;
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
            font-size: 12px;
            line-height: 14px;
            color: #797979;
          }
        }
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
      align-items: center;
      font-size: 14px;
      .reviewNum {
        color: #333;
        span {
          margin-left: 4px;
        }
      }
      .likeNum {
        color: #ff6161;
        span {
          margin-left: 4px;
        }
      }
    }
  }
  // 评论
  .reviceList {
    .reviceItem {
      display: flex;
      margin-bottom: 15px;
      .leftHead {
        width: 28px;
        height: 28px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rightCont {
        flex: 1;
        margin-left: 10px;
        .name {
          color: #403f3f;
          font-size: 13px;
          line-height: 18px;
        }
        .reviceCont {
          li {
            // margin-bottom: 20px;
            .cont {
              font-size: 12px;
              color: #737373;
              line-height: 18px;
            }
            .handle {
              font-size: 10px;
              color: #737373;
              width: 60%;
              display: flex;
              p {
                width: 25%;
                line-height: 24px;
                font-size: 10px;
                color: #b1a1a3;
                &:first-child {
                  width: 40%;
                  color: #737373;
                }
              }
            }
          }
        }
      }
    }
  }
  // 底部
  .footerBox {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    line-height: 30px;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    text-align: center;
    i {
      display: inline-block;
      font-size: 24px;
      color: #707070;
      vertical-align: middle;
      margin-right: 4px;
    }
    .share {
      width: 25%;
      vertical-align: middle;
      border-right: 1px solid #e0e0e0;
      span {
        font-size: 14px;
      }
    }
    .other {
      width: 75%;
      display: flex;
      justify-content: space-around;
      text-align: center;
      p {
        span {
          font-size: 14px;
          vertical-align: middle;
          color: #393939;
        }
      }
    }
  }
  // 私信弹窗
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    .maskCont{
      position: absolute;
      width: 80%;
      height: 30%;
      background-color: #fff;
      padding: 5px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      .title{
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
        img{
          width: 35px;
          height: 35px;
        }
      }
      .cont{
        background-color: #e8e8e8;
        height: 60%;
      }
    }
  }
}
</style>
