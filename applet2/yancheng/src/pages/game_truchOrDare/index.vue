<template>
  <div class="game1">
    <navigation-bar
      :title="'真心话大冒险'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
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
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
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
            { icon: "icon-aixin", title: "哭得最伤心的是哪一次?为什么" },
            { icon: "icon-aixin", title: "你谈过几次恋爱" },
            { icon: "icon-aixin", title: "觉得男人吃软饭丢脸吗" },
            { icon: "icon-aixin", title: "请说出在座谁昨天没有换内裤" },
            { icon: "icon-aixin", title: "你觉得最毒舌的一句话是什么" },
            { icon: "icon-aixin", title: "从小到大你觉得最愤怒的一件事是什么" },
            { icon: "icon-aixin", title: "做过最龌龊的事情是什么" },
            { icon: "icon-aixin", title: "在众目睽睽之下踩到了大便么办" },
            { icon: "icon-aixin", title: "到目前为止收到过多少封情书" },
            { icon: "icon-aixin", title: "你现在穿什么牌子的内衣" },
            { icon: "icon-aixin", title: "最喜欢什么样的女人" },
            { icon: "icon-aixin", title: "在座你最想抱的人是" },
            { icon: "icon-aixin", title: "你最不开心的时候会有什么表现" },
            { icon: "icon-aixin", title: "上厕所后洗手吗" },
            { icon: "icon-aixin", title: "你的梦中情人是谁" },
            { icon: "icon-aixin", title: "从小到大你觉得最痛苦的一件事是什么" },
            { icon: "icon-aixin", title: "在座你认为谁的头最大" },
            { icon: "icon-aixin", title: "最近一次和谁看的电影" },
            { icon: "icon-aixin", title: "第一次舌吻是和谁" },
            { icon: "icon-aixin", title: "你觉得什么式样的内裤最性感 " },
            { icon: "icon-aixin", title: "在大商场里偷东西被捉住会怎么样" },
            { icon: "icon-aixin", title: "你每天都洗屁屁么" },
            { icon: "icon-aixin", title: "喜欢成熟的还是很傻很天真的人" },
            { icon: "icon-aixin", title: "你对异性朋友做的最出格的一件事是什么事呢" },
            { icon: "icon-aixin", title: "关系暧昧的异性知己有几个" },
            { icon: "icon-aixin", title: "你最欣赏在座谁的嘴唇" },
            { icon: "icon-aixin", title: "对自己身体的哪个部位最满意" },
            { icon: "icon-aixin", title: "朋友和男女朋友哪一个重要" },
            { icon: "icon-aixin", title: "手机掉进马桶怎么办" },
            { icon: "icon-aixin", title: "在座你认为谁的脚地板最白" },
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
            { icon: "icon-damaoxian", title: "大喊三声“我卖身不卖艺啊”" },
            { icon: "icon-damaoxian", title: "对一个陌生人大喊2声“我是禽兽”" },
            { icon: "icon-damaoxian", title: "请从你右手边数起第三位异性共舞一段,舞蹈任意" },
            { icon: "icon-damaoxian", title: "找个陌生人说:我怀了你的孩子" },
            { icon: "icon-damaoxian", title: "把离你最远的异性横抱起来" },
            { icon: "icon-damaoxian", title: "给离你最近的异性分别擦嘴、擦鼻涕、擦眼泪 " },
            { icon: "icon-damaoxian", title: "摸自己胸说“我好空虚,我好寂寞”" },
            { icon: "icon-damaoxian", title: "在街上捏一个陌生人的脸,之后说:“好软哦,什么做的?”" },
            { icon: "icon-damaoxian", title: "对陌生人女孩挤眉弄眼5秒钟以上" },
            { icon: "icon-damaoxian", title: "用舌头舔手肘部 " },
            { icon: "icon-damaoxian", title: "一边摸离你最近的同性的胸部一边说“奶妈,我饿!”" },
            { icon: "icon-damaoxian", title: "单腿着地,一只腿踩在桌子上,做享受脱丝袜的动作表情" },
            { icon: "icon-damaoxian", title: "现场模仿小便全过程 " },
            { icon: "icon-damaoxian", title: "做一个自己最性感、最妩媚的表情或动作 " },
            { icon: "icon-damaoxian", title: "右手跨过后脑勺从左边摸右眼" },
            { icon: "icon-damaoxian", title: "对着大街喊“打雷了,下雨收衣服啊”" },
            { icon: "icon-damaoxian", title: "对着整条街学鸡叫,十声 " },
            { icon: "icon-damaoxian", title: "对一个陌生人大喊2声“我喜欢你”" },
            { icon: "icon-damaoxian", title: "深情的吻白纸10秒钟 " },
            { icon: "icon-damaoxian", title: "做自己最性感或妩媚的动作或表情 " },
            { icon: "icon-damaoxian", title: "对着异性挤眉弄眼 " },
            { icon: "icon-damaoxian", title: "选一位男生,一边捶他的胸一边说,你好讨厌哦~! " },
            { icon: "icon-damaoxian", title: "找一男生,手放在他的胸上说:唉,太小了~" },
            { icon: "icon-damaoxian", title: "走到远处唱歌,要让现场的人都听到唱的是什么" },
            { icon: "icon-damaoxian", title: "脱下自己的鞋子,对着人群喊:卖谢啦~2块一双~买一送3~" },
            { icon: "icon-damaoxian", title: "对着现场任意一位异性唱情歌,并结束时单膝下跪" },
            { icon: "icon-damaoxian", title: "做一个大家都满意的鬼脸" },
            { icon: "icon-damaoxian", title: "模仿自己在家里洗澡的全过程,从脱衣开始(不是真的脱)到穿衣结束" },
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
  background: linear-gradient(#5a197f, #551b7f, #5a1a7b,);
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
