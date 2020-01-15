<template>
  <div class="vote">
    <!-- 内容列表 -->
    <div class="contentList">
      <div class="contentItem w94" v-for="(item,index) in ItemList" :key="index">
        <div class="headName" @click="goPersonal">
          <div class="headImg">
            <img :src="headImg" mode="aspectFill" />
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
            @click="selectOne(lindex)"
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

    <div class="createBtn" @click="goCreateVote">创建投票</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskVal: false,
      itemsNum: "",
      headImg: `${this.$store.state.imgUrlHttp}/head.png`,
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
            `${this.$store.state.imgUrlHttp}/a1.png`,
            `${this.$store.state.imgUrlHttp}/a2.png`,
            `${this.$store.state.imgUrlHttp}/a3.png`,
            `${this.$store.state.imgUrlHttp}/a4.png`,
            `${this.$store.state.imgUrlHttp}/a5.png`,
            `${this.$store.state.imgUrlHttp}/a6.png`,
          ]
        }
      ]
    };
  },
  methods: {
    requireTxt(index) {
      let val = this.ItemList[index].showEllip;
      if (val) {
        this.ItemList[index].showEllip = false;
      } else {
        this.ItemList[index].showEllip = true;
      }
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.ItemList[outIdx].picList;
      console.log(imgArr);
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    selectOne(num) {
      this.itemsNum = num;
    },
    goCreateVote() {
      wx.navigateTo({
        url: "/pages/voteAdd/main"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.vote {
  padding-bottom: 30px;
  .contentList {
    width: 95%;
    margin: 10px auto;
    box-shadow: 0 0 2px 2px #eee;
    padding-top: 15px;
    border-radius: 5px;
    // 内容列表
    .contentItem {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 20px;
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
