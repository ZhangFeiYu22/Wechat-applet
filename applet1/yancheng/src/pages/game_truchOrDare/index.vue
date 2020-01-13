<template>
  <div class="game1">
    <div class="selectBox">
      <div class="optionBox">
        <p
          v-for="(item,index) in optionList"
          :key="index"
          class="optionItem"
          :class="item.active?'act':''"
          @click="toggleStyle(index)"
        >{{item.name}}</p>
      </div>
    </div>
    <div class="contentBox">
      <div class="box">
        <img src="../../../static/images/aaa1.png" mode="aspectFill" />
        <p>{{msg}}</p>
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
        { name: "喝酒", active: false },
        { name: "真心话", active: false },
        { name: "大冒险", active: false }
      ],
      msg: "这是真心话内容",
      msgArr: [
        "这是随机内容1",
        "这是随机内容2",
        "这是随机内容3",
        "这是随机内容4",
        "这是随机内容5",
        "这是随机内容6",
        "这是随机内容7"
      ]
    };
  },
  methods: {
    changeFun() {
      this.msg = this.msgArr[Math.floor(Math.random() * this.msgArr.length)];
    },
    toggleStyle(index) {
      if (this.optionList[index].active) {
        this.optionList[index].active = false;
      } else {
        var newArr = this.arrChange(this.optionList);
        var falseNum = this.statisticalFieldNumber(newArr.active);
        if (falseNum.false > 1) {
          this.optionList[index].active = true;
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
        &.act {
          background-color: #000;
          color: #eee;
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
      img {
        width: 50px;
        height: 50px;
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
