<template>
  <scroll-view class="scrollView" scroll-y="true" :style="{'width': ktxScreentWidth,'height': ktxScreentHeight}">
    <div class="voteAdd">
      <!-- 内容列表 -->
      <div class="content w94">
        <textarea
          class="edit-text"
          placeholder="标题"
          placeholder-style="color:#dcdcdc;font-size:15px;"
          @input="getInputValueTitle"
        ></textarea>
        <div class="edit-img">
          <div v-for="(item,index) in imgArr1" :key="index">
            <image :src="item" mode="aspectFill" />
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImageOne"></div>
        </div>
        <div class="line">
          <div class="left">是否收费：</div>
          <div class="right isno">
            <span class="bg" :class="bga?'bg_a':''" @click="toggleBag('1')">是</span>
            <span class="bg" :class="bga?'':'bg_a'" @click="toggleBag('0')">否</span>
          </div>
        </div>
        <div class="line">
          <div class="left">费用：</div>
          <div class="right cost">
            <input type="text" />
            <span>元</span>
          </div>
        </div>
        <div class="line">
          <div class="left">时间：</div>
          <div class="right">
            <input type="text" placeholder="2019.12.01-12.02" placeholder-style="color:#D1CFCF" />
          </div>
        </div>
        <div class="line">
          <div class="left">地点：</div>
          <div class="right">
            <input type="text" placeholder="江苏省 南京市 栖霞区" placeholder-style="color:#D1CFCF" />
          </div>
        </div>
        <div class="line detail">
          <div class="left">详细：</div>
          <div class="right">
            <input type="text" placeholder="街道\路名\门牌号" placeholder-style="color:#D1CFCF" />
          </div>
        </div>
        <div class="linebg"></div>
        <div class="bb">
          <p class="tt">活动详情</p>
          <textarea
            class="edit-text"
            placeholder="文字描述"
            placeholder-style="color:#dcdcdc"
            @input="getInputValueDetail"
          ></textarea>
          <div class="edit-img">
            <div v-for="(item,index) in imgArr2" :key="index">
              <image :src="item" mode="aspectFill" />
            </div>
            <div class="iconfont icon-jiahao" @click.stop="chooseImageTwo"></div>
          </div>
        </div>
        <div class="bb">
          <p class="tt">活动须知</p>
          <textarea
            class="edit-text"
            placeholder="文字描述"
            placeholder-style="color:#dcdcdc"
            @input="getInputValueNotice"
          ></textarea>
        </div>
      </div>

      <cover-view class="createBtn" @click="publishFun">发布</cover-view>
    </div>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      ktxScreentWidth: '',
      ktxScreentHeight: '',
      txtTitle: "",
      txtDetail: "",
      txtNotice: "",
      imgArr1: null,
      imgArr2: null,
      options: [{ name: "1" }, { name: "2" }, { name: "3" }],
      bga: true
    };
  },
  mounted() {
    let systemInfo = wx.getSystemInfoSync();
    console.log('0---',systemInfo)
    // 屏幕的高度
    this.ktxScreentWidth = systemInfo.windowWidth * 0.94 + 'px';
    this.ktxScreentHeight = systemInfo.windowHeight * 0.96 + 'px';
  },
  methods: {
    selectOne(num) {
      this.itemsNum = num;
    },
    chooseImageOne() {
      let self = this;
      wx.chooseImage({
        count: 1,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          self.imgArr1 = res.tempFilePaths;
        }
      });
    },
    chooseImageTwo() {
      let self = this;
      wx.chooseImage({
        count: 5,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          self.imgArr2 = res.tempFilePaths;
        }
      });
    },
    toggleBag(num) {
      if (num == "1") {
        this.bga = true;
      } else {
        this.bga = false;
      }
    },
    getInputValueTitle(e) {
      this.txtTitle = e.detail.value;
    },
    getInputValueDetail(e) {
      this.txtDetail = e.detail.value;
    },
    getInputValueNotice(e) {
      this.txtNotice = e.detail.value;
    },
    publishFun() {
      console.log("发布");
    }
  }
};
</script>

<style lang="less" scoped>
.scrollView {
  margin: 3% auto 0;
  box-shadow: 0 0 2px 2px #eee;
  border-radius: 5px;
}
.voteAdd {
  // width: 94%;
  // height: 94%;
  // left: 2%;
  // top: 2%;
  // box-shadow: 0 0 2px 2px #eee;
  padding: 15px 0;
  // border-radius: 5px;
  // position: fixed;
  // overflow-y: scroll;
  // margin: 3%;
  .edit-text {
    height: 64px;
    padding: 2px 0;
    width: 100%;
    overflow-y: scroll;
    font-size: 12px;
    line-height: 20px;
    color: #353535;
  }
  .content {
    .edit-img {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-between;
      margin-bottom: 20px;
      image {
        width: 75px;
        height: 75px;
        margin: 0 15px 5px 0;
      }
      .icon-jiahao {
        width: 75px;
        height: 75px;
        border: 1px solid #707070;
        font-size: 30px;
        color: #888;
        line-height: 75px;
        text-align: center;
      }
    }
    .line {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      .left {
        width: 20%;
        font-size: 12px;
        color: #343434;
      }
      .right {
        flex: 1;
        font-size: 12px;
        &.cost {
          input {
            display: inline-block;
            border: 1px solid #707070;
            line-height: 20px;
            height: 20px;
            padding: 0 5px;
            width: 50px;
            vertical-align: middle;
            margin-right: 10px;
          }
          span {
            vertical-align: middle;
          }
        }
        &.isno {
          .bg {
            display: inline-block;
            width: 30px;
            border: 1px solid #707070;
            color: #343434;
            text-align: center;
            line-height: 20px;
            &.bg_a {
              background-color: #b1a1a3;
              color: #fff;
              border: none;
              line-height: 22px;
            }
          }
        }
      }
    }
    .linebg {
      width: 100%;
      height: 4px;
      background-color: #eee;
      margin-bottom: 20px;
    }
    .bb {
      .tt {
        font-size: 12px;
        color: #333;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
  }

  .createBtn {
    background-color: #b1a1a3;
    color: #fff;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 30%;
    text-align: center;
    border-radius: 30px;
    position: fixed;
    bottom: 5%;
    left: 35%;
  }
}
</style>
