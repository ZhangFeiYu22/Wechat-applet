<template>
  <div class="game1">
    <div class="selectBox">
      <div class="optionBox">
        <p
          v-for="(item,index) in optionList"
          :key="index"
          class="optionItem"
          :class="item.active?'':'act'"
          @click="toggleStyle(index)"
        >{{item.name}}</p>
      </div>
    </div>
    <div class="contentBox">
      <div class="box">
        <i class="iconfont" :class="msgShow.icon"></i>
        <p>{{msgShow.title}}</p>
      </div>
      <button class="changBtn" @click="changeFun">换一个</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionList: [
        {
          name: "喝酒",
          active: true,
          arrList: [
            { icon: "icon-hejiu", title: "大家干杯" },
            { icon: "icon-hejiu", title: "找异性碰杯" },
            { icon: "icon-hejiu", title: "喝半杯" },
            { icon: "icon-hejiu", title: "喝两杯" },
            { icon: "icon-hejiu", title: "杯子里喝光" },
            { icon: "icon-hejiu", title: "找人碰杯" }
          ]
        },
        {
          name: "真心话",
          active: true,
          arrList: [
            { icon: "icon-aixin", title: "你希望你现在是多少岁" },
            { icon: "icon-aixin", title: "用四个字形容你现在的生活状态" },
            { icon: "icon-aixin", title: "世界上最大的悲剧是什么" },
            { icon: "icon-aixin", title: "晚上睡觉要上几次厕所" },
            { icon: "icon-aixin", title: "在座你最想打的人是谁" },
            { icon: "icon-aixin", title: "你最短的一次恋爱是什么情况" },
            { icon: "icon-aixin", title: "收到过最难忘的礼物是什么" },
            { icon: "icon-aixin", title: "如果有来生，你选择当什么" },
            { icon: "icon-aixin", title: "如果让你选择做一个电影中的角色，你会选谁呢" },
            { icon: "icon-aixin", title: "如果有一天我和你吵架，你会怎么办" },
            { icon: "icon-aixin", title: "哭得最伤心的是哪一次?为什么" }
          ]
        },
        {
          name: "大冒险",
          active: true,
          arrList: [
            { icon: "icon-damaoxian", title: "对右侧第一位异性说一分钟情话" },
            { icon: "icon-damaoxian", title: "打开抖音模仿推荐的第一个人" },
            { icon: "icon-damaoxian", title: "抱着正对面人的大腿唱情歌" },
            { icon: "icon-damaoxian", title: "对异性服务员说“请给我你的微笑 我要打包" },
            { icon: "icon-damaoxian", title: "背一位异性绕场一周" },
            { icon: "icon-damaoxian", title: "唱青藏高原最后一句" },
            { icon: "icon-damaoxian", title: "跳草裙舞、脱衣舞" },
            { icon: "icon-damaoxian", title: "深情地吻墙10秒" },
            { icon: "icon-damaoxian", title: "对人美眉挤眉弄眼" },
            { icon: "icon-damaoxian", title: "摆3个芙蓉姐姐S形" },
            { icon: "icon-damaoxian", title: "喊 燃烧吧，小宇宙" },
            { icon: "icon-damaoxian", title: "和右数第一个异性拥抱" },
          ]
        }
      ],
      msgShow: { icon: "icon-aixin", title: "真心话大冒险" },
    };
  },
  methods: {
    changeFun() {
      var newArr = []
      this.optionList.map((value,index,arr)=>{
        if(value.active == true ){
          let aaa = newArr
          return newArr = [...aaa,...value.arrList]
        }
      })
      this.msgShow = newArr[Math.floor(Math.random() * newArr.length)];
    },
    toggleStyle(index) {
      if (!this.optionList[index].active) {
        this.optionList[index].active = true;
      } else {
        var newArr = this.arrChange(this.optionList);
        var falseNum = this.statisticalFieldNumber(newArr.active);
        if (falseNum.true > 1) {
          this.optionList[index].active = false;
        } else {
          wx.showToast({
            title: "至少需要选择一个模式",
            icon: "none",
            duration: 2000
          });
        }
      }
    },
    // 对象数组转数组
    arrChange(arr) {
      var res = arr.reduce((res, v) => {
        Object.keys(v).forEach(key => {
          const value = v[key];
          if (res[key]) res[key].push(value);
          else res[key] = [value];
        });
        return res;
      }, {});
      return res;
    },
    // 数组中值出现次数
    statisticalFieldNumber(arr) {
      return arr.reduce(function(prev, next) {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});
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
  .selectBox {
    width: 70%;
    height: 50px;
    border-radius: 50px;
    overflow: hidden;
    border: 3px solid #fff;
    background: linear-gradient(to right, #5a197f, #551b7f, #5a1a7b);
    margin: 10% auto 40px;
    .optionBox {
      line-height: 44px;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: space-between;
      .optionItem {
        width: 33.33%;
        text-align: center;
        color: #fff;
        text-shadow: 0 0 2px #eee, 0 0 7px #eee, 0 0 12px #eee;
        &.act {
          background-color: #000;
          color: #ddd;
        }
      }
    }
  }
  .contentBox {
    width: 70%;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
    position: relative;
    .box {
      width: 100%;
      height: 100%;
      border: 4px solid;
      text-align: center;
      padding: 20px;
      background: linear-gradient(to bottom left, #8d188a, #33095f, #422aa4);
      border-bottom-width: 10px;
      border-image: linear-gradient(
          to right,
          #7f8eff,
          #8197ff,
          #58ffff,
          #9cf3fd
        )
        1;
      i {
        font-size: 40px;
        color: #ae6596;
      }
      p {
        color: #fff;
        margin-top: 50px;
        line-height: 20px;
      }
    }
    .changBtn {
      position: absolute;
      height: 40px;
      line-height: 36px;
      width: 50%;
      bottom: 20px;
      left: 25%;
      font-size: 15px;
      background: transparent;
      color: #a9cafd;
      border: 2px solid;
      border-radius: 40px;
      &:before {
        position: absolute;
        width: 98%;
        height: 100%;
        content: "";
        display: block;
        border: 1px solid;
        border-image: linear-gradient(
          to right,
          #9868d8,
          #c2bdff,
          #9dcef7,
          #7a77e8,
          #7d52e0
        );
        border-image-slice: 50%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
