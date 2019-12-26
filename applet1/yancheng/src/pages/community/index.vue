<template>
  <div class="community">
    <div class="contentList w94">
      <div class="contentItem">
        <div class="headName">
          <img src="../../../static/images/head1.jpg" mode="aspectFill" />
          <span>张小凡</span>
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
            <img src="../../../static/images/c1.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c6.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c1.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c6.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c1.png" mode="aspectFill" />
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
    <div class="contentList w94">
      <div class="contentItem">
        <div class="headName">
          <img src="../../../static/images/head1.jpg" mode="aspectFill" />
          <span>张小凡</span>
        </div>
        <div
          class="content"
          id="contentInfo"
          :class="isToggle ?'ellip': ''"
        >细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润</div>
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
            <img src="../../../static/images/c6.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c1.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c6.png" mode="aspectFill" />
          </div>
          <div class="imgsItem">
            <img src="../../../static/images/c1.png" mode="aspectFill" />
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
    <div style="height:80px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToggle: false, //是否超过2行？true--超过，false--没有超过
      requireAll: false //展开/收起全部问题描述true--展开，false--收起
    };
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
    }
  },
  moubted() {}
};
</script>

<style lang="less" scoped>
.community {
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
