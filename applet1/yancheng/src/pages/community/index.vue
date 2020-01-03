<template>
  <div class="community" @click.stop="hideZanAndPinglun">
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in ItemList" :key="item.id">
        <!-- 头像 -->
        <div class="headName">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          <span>张小凡</span>
        </div>
        <!-- 内容 -->
        <div
          class="content"
          id="contentInfo"
          :class="isToggle ?'ellip': ''"
        >细雨秀江南，江南多雨，尤其是江南春天的烟雨，就像那吴侬软语一般，透着水乡特有的滋润，雨是江南水乡的灵气，在江南，充满浪漫气息的雨，元宵节前后的雨叫灯花雨</div>
        <div v-if="isToggle" class="toggleBox">
          <div class="more_txt" @click="requireTxt">
            <span>{{requireAll ? '展开' : '收起'}}</span>
          </div>
        </div>
        <!-- 图片 -->
        <div class="imgsList">
          <div
            class="imgsItem"
            @click.stop="showImg(index,imgIndex)"
            v-for="(imgItem,imgIndex) in item.imgsList"
            :key="imgIndex"
          >
            <img :src="imgItem" mode="aspectFill" />
          </div>
        </div>
        <!-- 时间点赞 -->
        <div class="timeHandle">
          <div class="time">10分钟前</div>
          <div class="handle">
            <div class="zan-pinglun" v-if="showZanAndPinglunNum == item.id">
              <span @click.stop="zanHandle">
                <!-- <i class="iconfont icon-aixin" @click="dianzan(index)"></i> -->
                点赞
              </span>
              <span @click.stop="showPinLunFun">
                <!-- <i class="iconfont icon-pinglun"></i> -->
                评论
              </span>
            </div>
            <div class="iconfont icon-pinglun2" @click.stop="showZanAndPinglun(item.id)"></div>
          </div>
        </div>
        <!-- 点赞展示 -->
        <div class="zanShowBox">
          <div class="imgLi" v-for="(item,zanIndex) in zanPeopleList" :key="zanIndex">
            <img v-if="zanIndex<3" :src="item" mode="aspectFill" />
          </div>
          <div class="zanWord">
            等
            <span>12</span>次赞
          </div>
        </div>
        <!-- 评论展示 -->
        <div class="pinglunBox">
          <p class="line line0">
            <span class="s0">谁说的</span>：
            <span class="s0c">这是评论内容</span>
          </p>
          <p class="line line1">
            <span class="s1">谁回复</span>回复
            <span>谁说的</span>：
            <span>这是评论内容</span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="showPinLun" class="pinlunB">
      <form report-submit="true" @submit="submitComment">
        <view class="liuyan">
          <input
            class="input"
            auto-focus
            cursor-spacing="32rpx"
            :value="commentValue"
            @input="getcomment"
            :placeholder="placeholderPL"
          />
          <button class="btnPut" form-type="submit">发送</button>
        </view>
      </form>
    </div>
    <div style="height:80px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToggle: false, //是否超过2行？true--超过，false--没有超过
      requireAll: false, //展开/收起全部问题描述true--展开，false--收起
      showZanAndPinglunNum: null,
      ItemList: [
        {
          id: 1,
          name: "111",
          imgsList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        },
        {
          id: 2,
          name: "222",
          imgsList: [
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png"),
            require("../../../static/images/aaa1.png")
          ]
        }
      ],
      zanPeopleList: [
        require("../../../static/images/aaa1.png"),
        require("../../../static/images/aaa1.png"),
        require("../../../static/images/aaa1.png"),
        require("../../../static/images/aaa1.png"),
        require("../../../static/images/aaa1.png"),
        require("../../../static/images/aaa1.png")
      ],
      commentValue: "",
      showPinLun: false,
      placeholderPL: "评论"
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
    zanHandle() {
      this.showZanAndPinglunNum = null;
      wx.showToast({
        title: "点赞成功",
        icon: "none"
      });
    },
    showPinLunFun() {
      this.showZanAndPinglunNum = null;
      (this.placeholderPL = "留言: " + "飞鱼"), (this.showPinLun = true);
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      console.log(`${index}----${imgIndex}`);
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.ItemList[outIdx].imgsList;
      console.log(imgArr);
      wx.previewImage({
        current: imgArr[inIdx].url, // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    //点击评论图标,显示点赞和评论按钮
    showZanAndPinglun(id) {
      console.log(id);
      this.showZanAndPinglunNum = id;
    },
    //点选和评论的隐藏通过事件委托到全页面(暂时只实现当条朋友所在区域,全页面和滚动时也隐藏在考虑实现)
    hideZanAndPinglun() {
      this.showZanAndPinglunNum = null;
      this.showPinLun = false;
    },
    getcomment(e) {
      this.commentValue = e.target.value;
    },
    submitComment(e) {
      // wx.showToast({
      //   title: '评论功能暂未开放',
      //   icon: 'none'
      // })
      // return

      // if (!this.data.userInfo) {
      //   wx.pageScrollTo({
      //     scrollTop: 200,
      //   })
      //   wx.showToast({
      //     title: '需要授权才能点赞评论,见第一条墙消息.',
      //     icon: 'none',
      //     duration: 5000
      //   })
      //   return
      // }
      if (this.commentValue.length <= 0) {
        wx.showToast({
          title: "内容为空",
          icon: "none"
        });
        return;
      }

      // var _id = this.data.wallData[this.data.showZan]._id
      // var formId = e.detail.formId
      // var toName = ""
      // if (this.data.placeholderPL.includes("回复")) {
      //   toName = this.data.placeholderPL.replace("回复:", "")
      //   console.log(toName)
      // }

      // wx.cloud.callFunction({
      //   name: 'chat',
      //   data: {
      //     type: 'comment',
      //     collectionname: 'circle',
      //     data: {
      //       username: this.data.userInfo.nickName,
      //       userInfo: this.data.userInfo,
      //       formId: formId,
      //       _id: _id,
      //       comment: this.data.commentValue,
      //       toName: toName
      //     }
      //   }
      // }).then(res => {
      //   console.log(res)

      //   //更新这条数据
      //   const db = wx.cloud.database()
      //   db.collection("circle").doc(_id).get().then(
      //     res => {
      //       console.log(res.data)
      //       var data = this.data.wallData
      //       console.log(data)
      //       console.log(e.currentTarget.dataset.indexn)
      //       data[this.data.showZan] = res.data

      //       for (let i = 0; i < data.length; i++) {
      //         data[i].time = this.parseTime(data[i].createTime.getTime())
      //         data[i].zanText = data[i].zans.map(a => {
      //           return a.name
      //         }).join(", ")
      //       }
      //       this.setData({
      //         wallData: data,
      //         showZan: -1,
      //         placeholderPL: "留言",
      //         showPinLun: false,
      //         commentValue: ""
      //       })
      //     }
      //   )
      // })
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
      margin-bottom: 20px;
      .headName {
        margin-bottom: 10px;
        img {
          width: 28px;
          height: 28px;
          vertical-align: middle;
          margin-right: 5px;
          border-radius: 100%;
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
        position: relative;
        .time {
          font-size: 14px;
          color: #8b8b8b;
        }
        .handle {
          display: flex;
          justify-content: space-between;
          .zan-pinglun {
            position: absolute;
            bottom: -5px;
            right: 30px;
            display: block;
            background-color: #4c5154;
            height: 30px;
            border-radius: 10rpx;
            color: white;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            span {
              display: inline-block;
              width: 60px;
              &:first-child {
                position: relative;
                &::after {
                  position: absolute;
                  right: 0;
                  top: 8px;
                  display: block;
                  content: "";
                  width: 1px;
                  height: 15px;
                  background-color: #fff;
                }
              }
            }
          }
          .icon-pinglun2 {
            font-size: 20px;
            color: #8b8b8b;
          }
        }
      }
      .zanShowBox {
        height: 34px;
        position: relative;
        margin: 5px 0 20px;
        .imgLi {
          position: absolute;
          img {
            width: 34px;
            height: 34px;
            border-radius: 34px;
          }
          &:nth-child(1) {
            left: 0;
          }
          &:nth-child(2) {
            left: 20px;
          }
          &:nth-child(3) {
            left: 40px;
          }
        }
        .zanWord {
          position: absolute;
          left: 90px;
          top: 8px;
          font-size: 16px;
          color: #010101;
        }
      }
      .pinglunBox {
        background-color: #eaeaea;
        color: #3a3a3a;
        padding: 10px 5px;
        position: relative;
        &::after {
          display: block;
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent #eaeaea transparent;
          top: -18px;
        }
        .line {
          font-size: 14px;
          line-height: 20px;
          // &.line0{

          // }
          &.line1 {
            .s1 {
              color: #096fc7;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .pinlunB {
    .liuyan {
      display: flex;
      background: #fafafa;
      border-top: 1px solid #ddd;
      width: 100%;
      bottom: 0;
      position: fixed;
      z-index: 4;
      height: 50px;
      justify-content: center;
      align-items: center;
      padding: 10px 5px;
      .input {
        background-color: #fff;
        flex: 1;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 10px;
      }
      .btnPut {
        font-size: 10px;
        width: 50px;
        background: #00c161;
        color: #fff;
        height: 40px;
        line-height: 40px;
        border-radius: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        &::after {
          border: none;
        }
      }
    }
  }
}
</style>
