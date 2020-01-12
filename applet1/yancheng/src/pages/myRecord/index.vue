<template>
  <div class="attention">
    <div class="navToggle">
      <div class="navI" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">活动</div>
      <div class="navI" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">投票</div>
    </div>
    <div class="activityList list" v-if="itemActive == 1">
      <div class="activityItem item" @click="goActivityDetails">
        <div class="imgBox">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="title">安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和</p>
          <p class="address">
            <i class="iconfont icon-dingwei"></i>
            <span>江苏省南京市大行宫</span>
          </p>
          <p class="time">
            <i class="iconfont icon-shijian"></i>
            <span>2019.09.09-12.21</span>
          </p>
        </div>
      </div>
      <div class="activityItem item" @click="goActivityDetails">
        <div class="imgBox">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="title">安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和安徽科大好看阿看到回复开水房啥快递合法啥会计师的看法和</p>
          <p class="address">
            <i class="iconfont icon-dingwei"></i>
            <span>江苏省南京市大行宫</span>
          </p>
          <p class="time">
            <i class="iconfont icon-shijian"></i>
            <span>2019.09.09-12.21</span>
          </p>
        </div>
      </div>
    </div>
    <div class="voteList list" v-else>
      <div class="contentItem" v-for="(item,index) in ItemList" :key="index">
        <div class="headName" @click="goPersonal">
          <div class="headImg">
            <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          </div>
          <div class="nameTime">
            <p class="name">张小凡</p>
          </div>
        </div>
        <div
          class="content"
          id="contentInfo"
          :class="item.showEllip ? 'ellip' : ''"
        >{{item.content}}</div>
        <div v-if="item.showEllip" class="toggleBox">
          <div class="more_txt" @click.stop="requireTxt(index)">
            <span>{{item.showEllip ? '展开' : '收起'}}</span>
          </div>
        </div>

        <div
          class="imgsList"
          v-if="item.picList!== undefined && item.picList!== null && item.picList .length>0"
        >
          <div
            class="imgsItem"
            v-for="(picItem,picIndex) in item.picList"
            :key="picIndex"
            @click.stop="showImg(index,picIndex)"
          >
            <img :src="picItem" mode="aspectFill" />
          </div>
        </div>
        <div class="imgsList" v-else></div>
        <div class="selectBox">
          <div
            class="selList"
            v-for="(litem,lindex) in listItems"
            :key="lindex"
            color="#1097FF"
            :class="itemsNum == lindex ? 'active' : ''"
          >
            <i class="sel"></i>
            <p class="miaosu">{{litem.value}}</p>
            <p class="bili">100%</p>
          </div>
        </div>

        <div class="timeHandle">
          <div class="time">2019.12.12 12:12</div>
          <div class="joinNum">
            <span>5</span>人参与投票
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemActive: 1,
      listItems: [
        { name: "USA", value: "美国" },
        { name: "CHN", value: "中国" },
        { name: "BRA", value: "巴西" },
        { name: "JPN", value: "日本" },
        { name: "ENG", value: "英国" },
        { name: "FRA", value: "法国" }
      ],
      ItemList: [
        {
          showEllip: false,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨"
        },
        {
          showEllip: true,
          content:
            "细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨，灯花雨往往是初春的第一场雨，淅淅沥沥的春雨就飘然而至，莺飞草长，一泓碧水粼粼而起，杨柳拂堤，碧草如丝，繁花似锦，飞泉鸣溅，古寺的梵音在石缝间流淌，雨后的空气溢出清新的芳香。而后是杏花雨，梨花雨，暮春过后，连绵不断的黄梅雨又弥漫江南。夜晚的雨声，清晨的花香，清绝的令人深深沉醉，秀雅的让人不舍离去。纷飞的细雨沾湿了一袭素裙，润透了江南女子的心。两袖的花香，轻舞出江南的独特风韵",
          picList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        }
      ]
    };
  },
  methods: {
    itemToggle(num) {
      this.itemActive = num;
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    goActivityDetails() {
      wx.navigateTo({
        url: "/pages/activityDetails/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.attention {
  .navToggle {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    .navI {
      text-align: center;
      padding: 10px 0 20px;
      font-size: 18px;
      color: #424242;
      &.active {
        color: #333;
        font-weight: 600;
        position: relative;
        &::after {
          display: block;
          content: "";
          position: absolute;
          width: 30px;
          height: 5px;
          background-color: #b1a1a3;
          bottom: 10px;
          left: 50%;
          margin-left: -15px;
          border-radius: 10px;
        }
      }
    }
  }
  .list {
    width: 94%;
    margin: 0 auto;
    .item {
      font-size: 13px;
      display: flex;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  }
  // 投票
  .voteList {
    width: 94%;
    margin: 10px auto;
    // 内容列表
    .contentItem {
      box-shadow: 0 0 2px 2px #eee;
      border-radius: 10px;
      padding:25px 10px;
      margin-bottom: 20px;
      .headName {
        display: flex;
        margin-bottom: 10px;
        .headImg {
          width: 35px;
          height: 35px;
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
              line-height: 35px;
              color: #403f3f;
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
        .more_txt {
          span {
            border-bottom: 1px solid #6f6d6d;
          }
        }
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
        .time {
          color: #7e7e7e;
          font-size: 12px;
          span {
            margin-left: 4px;
          }
        }
        .joinNum {
          color: #343434;
          font-size: 12px;
          span {
            margin-left: 4px;
          }
        }
      }
      .selectBox {
        .selList {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          i {
            width: 12px;
            height: 12px;
            border-radius: 20px;
            border: 1px solid #1097ff;
            margin-right: 10px;
          }
          .miaosu {
            flex: 1;
            font-size: 12px;
            color: #b4b4b4;
            line-height: 26px;
            border-bottom: 1px solid #b4b4b4;
          }
          .bili {
            width: 35px;
            font-size: 12px;
            color: #737373;
          }
          &.active {
            i {
              position: relative;
              background-color: #1097ff;
              &:after {
                position: absolute;
                top: 0px;
                left: 3px;
                content: "";
                display: block;
                width: 3px;
                height: 8px;
                border-right: 1px solid #fff;
                border-bottom: 1px solid #fff;
                transform: rotate(45deg);
              }
            }
            .miaosu {
              color: #000;
              border-bottom: 1px solid #1097ff;
            }
          }
        }
      }
    }
  }
  // 活动
  .activityList {
    .activityItem {
      .imgBox {
        width: 135px;
        height: 95px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wordBox {
        flex: 1;
        .title {
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
          line-clamp: 2; //显示的行
          font-size: 16px;
        }
        .address {
          font-size: 12px;
          color: #8e8e8e;
          line-height: 20px;
          margin-top: 5px;
        }
        .time {
          font-size: 12px;
          color: #8e8e8e;
          line-height: 20px;
        }
        i {
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
          font-size: 14px;
          color: #8e8e8e;
        }
        span {
          vertical-align: middle;
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
