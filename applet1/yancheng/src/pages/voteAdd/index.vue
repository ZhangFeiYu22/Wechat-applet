<template>
  <div>
    <navigation-bar :title="'创建投票'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="voteAdd">
      <!-- 内容列表 -->
      <div class="content w94">
        <!-- <textarea
          class="edit-text"
          placeholder="请输入投票内容简述..."
          placeholder-style="color:#dcdcdc"
          @input="getInputValue"
        ></textarea>-->
        <textarea
          v-if="textStatus"
          class="edit-text edit-textShow"
          auto-focus
          @blur="bindblurTextStatus"
          v-model="optionsData.content"
        ></textarea>
        <div
          v-else
          class="edit-text edit-textNo"
          :style="{color: textNoColor}"
          @click="changeTextStatus"
        >{{realTextValue}}</div>
        <div class="optionList" v-for="(item,index) in options" :key="index">
          <i class="iconfont icon-iconless" @click.stop="optionDel(index)"></i>
          <input
            type="text"
            placeholder="输入选项内容"
            v-model="item.optionsContent"
            placeholder-style="color:#c4c4c4"
          />
        </div>
        <div class="optionList optionAdd" @click="optionAdd">
          <i class="iconfont icon-tianjia"></i>
          <p>添加投票选项</p>
        </div>

        <div class="edit-img">
          <div v-for="(item,index) in imgArr" :key="index">
            <image :src="item" mode="aspectFill" />
          </div>
          <div class="iconfont icon-jiahao" @click.stop="chooseImage"></div>
        </div>
      </div>

      <div class="createBtn" @click="publishFun">发布</div>
    </div>
  </div>
</template>

<script>
import { voteAdd } from "@/api/vote";
import { imgsUpload } from "@/utils/imgsUpload";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      imgArr: [],
      optionsData: {
        content: ""
      },
      options: [
        { optionsContent: "" },
        { optionsContent: "" },
        { optionsContent: "" }
      ],
      textStatus: false,
      textNoColor: "#dcdcdc",
      realTextValue: "请输入投票内容简述..."
    };
  },
  methods: {
    changeTextStatus() {
      this.realTextValue = "";
      this.textStatus = true;
    },
    bindblurTextStatus() {
      if (this.optionsData.content.length == 0) {
        this.realTextValue = "请输入投票内容简述...";
        this.textNoColor = "#dcdcdc";
      } else {
        this.realTextValue = this.optionsData.content;
        this.textNoColor = "#353535";
      }
      this.textStatus = false;
    },
    selectOne(num) {
      this.itemsNum = num;
    },
    optionDel(num) {
      let self = this;
      wx.showModal({
        title: "确定删除该选项吗",
        success(res) {
          if (res.confirm) {
            self.options.splice(num, 1);
          }
        }
      });
    },
    optionAdd() {
      console.log("this.options--", this.options);
      if (this.options.length < 6) {
        var lists = this.options;
        lists.push({ optionsContent: "" });
        this.options = lists;
      } else {
        wx.showToast({
          title: "最多可添加六个选项",
          icon: "none",
          duration: 1500
        });
      }
    },
    chooseImage() {
      let self = this;
      self.$store.dispatch("getOssData", { dir: "city/voteContent" });
      wx.chooseImage({
        count: 9,
        sizeType: "compressed",
        sourceType: ["album", "camera"],
        success(res) {
          self.imgArr = imgsUpload(res.tempFilePaths);
        }
      });
    },
    publishFun() {
      var _this = this;
      _this.options.forEach((item, index) => {
        if (index == 0) {
          _this.optionsData.optionOne = item.optionsContent;
        } else if (index == 1) {
          _this.optionsData.optionTwo = item.optionsContent;
        } else if (index == 2) {
          _this.optionsData.optionThree = item.optionsContent;
        } else if (index == 3) {
          _this.optionsData.optionFour = item.optionsContent;
        }
      });
      console.log("发布", this.optionsData);
      wx.showModal({
        title: "确定发布？",
        success(res) {
          voteAdd(_this.optionsData).then(res => {
            console.log(res);
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.voteAdd {
  width: 96%;
  left: 2%;
  top: 12%;
  bottom: 2%;
  box-shadow: 0 0 2px 2px #eee;
  padding: 15px 0;
  border-radius: 5px;
  position: fixed;
  .content {
    .edit-text {
      height: 60px;
      padding: 2px 0;
      overflow-y: scroll;
      width: 100%;
      font-size: 15px;
      line-height: 20px;
      color: #353535;
    }
    .edit-textShow {
      box-sizing: border-box;
    }
    .edit-textNo {
      color: #dcdcdc;
    }
    .optionList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 20px;
      margin-bottom: 20px;
      i {
        width: 30px;
        color: #ff1010;
      }
      input {
        flex: 1;
        color: #333;
        font-size: 12px;
      }
    }
    .optionAdd {
      i {
        color: #1097ff;
      }
      p {
        flex: 1;
        font-size: 12px;
        color: #1097ff;
      }
    }
    .edit-img {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-between;
      image {
        width: 90px;
        height: 90px;
        margin: 0 15px 5px 0;
      }
      .icon-jiahao {
        width: 90px;
        height: 90px;
        border: 1px solid #707070;
        font-size: 18px;
        color: #888;
        line-height: 90px;
        text-align: center;
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
