<template>
  <div class="community" @click.stop="hideZanAndPinglun">
    <navigation-bar :title="'社区'" :navBackgroundColor="'#fff'" :publish-visible="2"></navigation-bar>
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in communityFriendsList" :key="item.id">
        <!-- 头像 -->
        <div class="headName" @click.stop="goPersonal">
          <img v-if="item.memberAvatar" :src="item.memberAvatar" mode="aspectFill" />
          <span>{{item.memberName}}</span>
        </div>
        <!-- 内容 -->
        <div class="content" id="contentInfo" :class="item.showEllip ?'ellip': ''">{{item.content}}</div>
        <div v-if="item.showEllip" class="toggleBox">
          <div class="more_txt" @click="requireTxt(index)">
            <span>{{item.showEllip ? '展开' : '收起'}}</span>
          </div>
        </div>
        <!-- 图片 -->
        <div class="imgsList">
          <div
            class="imgsItem"
            @click.stop="showImg(index,imgIndex)"
            v-for="(imgItem,imgIndex) in item.images"
            :key="imgIndex"
          >
            <img v-if="imgItem" :src="imgItem" mode="aspectFill" />
          </div>
        </div>
        <!-- 时间  点赞 -->
        <div class="timeHandle">
          <div class="time">{{item.createTime}}</div>
          <div class="handle">
            <div class="zan-pinglun" v-if="showZanAndPinglunNum == item.id">
              <span
                @click.stop="zanHandle(item.id,item.isLike,index)"
              >{{item.isLike == 1 ? '取消': '点赞'}}</span>
              <span @click.stop="showPinLunFun(index,item.memberName)">评论</span>
            </div>
            <div class="iconfont icon-pinglun2" @click.stop="showZanAndPinglun(item.id)"></div>
          </div>
        </div>
        <!-- 点赞展示 -->
        <div class="zanShowBox" v-if="item.properties.communityLikeList.length > 0">
          <div
            class="imgLi"
            v-for="(comLikeItem,comLikeIndex) in item.properties.communityLikeList"
            :key="comLikeItem.id"
          >
            <img
              v-if="comLikeItem.avatar && comLikeIndex<3"
              :src="comLikeItem.avatar"
              mode="aspectFill"
            />
          </div>
          <div class="zanWord">等{{item.properties.communityLikeList.length}}次赞</div>
        </div>
        <!-- 评论展示 -->
        <div class="pinglunBox" v-if="item.properties.communityCommentList.length>0">
          <div
            v-for="(comComItem,comComIndex) in item.properties.communityCommentList"
            :key="comComIndex"
          >
            <p
              class="line line1"
              @longpress="backPinLunFun(comComItem,index)"
              v-if="comComItem.replyName"
            >
              <span class="s1">{{comComItem.memberName}}</span>回复
              <span>{{comComItem.replyName}}</span>：
              <span>{{comComItem.comment}}</span>
            </p>
            <p class="line line0" @longpress="backPinLunFun(comComItem,index)" v-else>
              <span class="s0">{{comComItem.memberName}}</span>：
              <span class="s0c">{{comComItem.comment}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPinLun" class="pinlunB">
      <view class="liuyan">
        <input
          class="input"
          auto-focus
          cursor-spacing="32rpx"
          :value="commentValue"
          @input="getcomment"
          :placeholder="placeholderPL"
        />
        <button class="btnPut" @click="submitComment">发送</button>
      </view>
      <!-- </form> -->
    </div>
    <div style="height:20px"></div>
  </div>
</template>

<script>
import {
  communityFriendsListGet,
  communityFriendsListGetLogin,
  communityLike,
  communityLikeNo,
  communityCommentPost,
  communityCommentDel
} from "@/api/community";
import navigationBar from "@/components/navigationBar";
import { getDateDiff } from "@/utils/getDateDiff";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      showZanAndPinglunNum: null, //点击是那个  将评论点赞显示出来
      zanPingActiveId: null, //点击是那个  将评论点赞显示出来    保存这个ID  评论和点赞使用
      commentValue: "",
      showPinLun: false,
      pinglunIndex: "",
      placeholderPL: "评论",
      show_back: 1, //1位留言  2为回复
      communityFriendsList: [],
      pageSize: 5, //一页显示条数
      pageIndex: 0, //页码
      total: 0 //总条数
    };
  },
  onLoad() {
    if (wx.getStorageSync("isLogin")) {
      this.fetchData();
    } else {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
  },
  methods: {
    fetchData() {
      var data = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      };
      this.fetchCommunituContent(data);
    },
    async fetchCommunituContent(data) {
      var comRes;
      if (wx.getStorageSync("isLogin")) {
        comRes = await communityFriendsListGetLogin(data);
      } else {
        comRes = await communityFriendsListGet(data);
      }
      if (comRes.status == 200) {
        var resData = comRes.result.data;
        this.total = comRes.result.total;
        resData.map(item => {
          if (item.images !== "") {
            item.images = item.images.split(";");
          }
          if (item.content.length > 80) {
            item["showEllip"] = true;
          } else {
            item["showEllip"] = false;
          }
          item.properties.communityCommentList.reverse();
          if (item.createTime) {
            let dateStr = item.createTime;
            item.createTime = getDateDiff(dateStr);
          }
        });
        // 如果不是第一页，追加数据
        if (this.pageIndex > 0) {
          this.communityFriendsList = this.communityFriendsList.concat(resData);
        } else {
          // 第一页则直接赋值 （下拉刷新）
          this.communityFriendsList = resData;
        }
      }
    },
    requireTxt(index) {
      let val = this.communityFriendsList[index].showEllip;
      if (val) {
        this.communityFriendsList[index].showEllip = false;
      } else {
        this.communityFriendsList[index].showEllip = true;
      }
    },
    goPersonal() {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    },
    zanHandle(id, isLike, index) {
      var _this = this;
      let authInfo = wx.getStorageSync("authInfo");
      let suData = {
        avatar: authInfo.avatar,
        memberId: authInfo.id,
        memberName: authInfo.nickName
      };
      if (isLike == 2) {
        communityLike(id).then(res => {
          if (res.status == 200) {
            _this.showZanAndPinglunNum = null;
            _this.communityFriendsList[index].isLike = 1;
            _this.communityFriendsList[index].properties.communityLikeList.push(
              suData
            );
            wx.showToast({
              title: "点赞成功",
              icon: "none"
            });
          }
        });
      } else {
        communityLikeNo(id).then(res => {
          if (res.status == 200) {
            _this.showZanAndPinglunNum = null;
            _this.communityFriendsList[index].isLike = 2;
            var newArr = _this.communityFriendsList[
              index
            ].properties.communityLikeList.filter(
              item => item.memberId != suData.memberId
            );
            _this.communityFriendsList[
              index
            ].properties.communityLikeList = newArr;
            wx.showToast({
              title: "取消点赞",
              icon: "none"
            });
          }
        });
      }
    },
    showPinLunFun(index, name) {
      this.showZanAndPinglunNum = null;
      this.commentValue = "";
      this.placeholderPL = "留言: " + name;
      this.showPinLun = true;
      this.show_back = 1;
      this.pinglunIndex = index;
    },
    // 长按回复
    backPinLunFun(comItem, index) {
      var _this = this;
      let authInfo = wx.getStorageSync("authInfo");
      if (comItem.memberName == authInfo.nickName) {
        wx.showModal({
          title: "提示",
          content: "是否删除改评论",
          success(res) {
            if (res.confirm) {
              communityCommentDel(comItem.id).then(delRes => {
                if (delRes.status == 200) {
                  var newArr = _this.communityFriendsList[
                    index
                  ].properties.communityCommentList.filter(
                    item => item.id != comItem.id
                  );
                  _this.communityFriendsList[
                    index
                  ].properties.communityCommentList = newArr;
                  wx.showToast({
                    title: "删除成功",
                    icon: "none"
                  });
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      } else {
        _this.showZanAndPinglunNum = null;
        _this.commentValue = "";
        _this.placeholderPL = "回复: " + comItem.memberName;
        _this.showPinLun = true;
        _this.show_back = 2;
        _this.pinglunIndex = index;
        _this.comItemData = comItem;
      }
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.communityFriendsList[outIdx].images;
      wx.previewImage({
        current: imgArr[inIdx].url, // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    //点击评论图标,显示点赞和评论按钮
    showZanAndPinglun(id) {
      this.showZanAndPinglunNum = id;
      this.zanPingActiveId = id;
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
      var _this = this;
      var pingD;
      if (_this.commentValue.length <= 0) {
        wx.showToast({
          title: "内容为空",
          icon: "none"
        });
        return;
      }
      if (_this.show_back == 1) {
        pingD = {
          comment: _this.commentValue,
          communityId: _this.zanPingActiveId
        };
      } else {
        pingD = {
          comment: _this.commentValue,
          communityId: _this.comItemData.communityId,
          memberName: _this.communityFriendsList[_this.pinglunIndex].memberName,
          replyId: _this.comItemData.memberId,
          replyName: _this.comItemData.memberName
        };
      }
      communityCommentPost(pingD).then(res => {
        console.log(res);
        if (res.status == 200) {
          wx.showToast({
            title: "评论成功",
            icon: "none"
          });
          if (_this.show_back == 1) {
            pingD = {
              comment: res.result.comment,
              memberName: res.result.memberName,
              createTime: res.result.createTime,
              id: res.result.id
            };
          } else {
            pingD = {
              comment: res.result.comment,
              memberName: res.result.memberName,
              replyName: res.result.replyName,
              createTime: res.result.createTime,
              id: res.result.id
            };
          }
          this.communityFriendsList[
            this.pinglunIndex
          ].properties.communityCommentList.push(pingD);
        }
      });
    }
  },
  onReachBottom: function() {
    if (this.communityFriendsList.length >= this.total) {
      wx.showToast({
        title: "到底了",
        icon: "none",
        duration: 2000
      });
    } else {
      this.pageIndex++; //获取现在页码
      this.fetchData();
    }
  },
  //下拉刷新
  onPullDownRefresh: function() {
    this.pageIndex = 0;
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.community {
  .contentList {
    .contentItem {
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 20px;
      .headName {
        margin-bottom: 10px;
        display: inline-block;
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
        .more_txt {
          span {
            border-bottom: 1px solid #6f6d6d;
          }
        }
      }
      .imgsList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        .imgsItem {
          width: 32%;
          margin-right: 1.3333%;
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
        width: 50%;
        margin: 5px 0;
        display: flex;
        align-items: center;
        .imgLi {
          // position: absolute;
          margin-right: 10px;
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
          font-size: 16px;
          color: #010101;
        }
      }
      .pinglunBox {
        background-color: #eaeaea;
        color: #3a3a3a;
        padding: 10px 5px;
        position: relative;
        margin-top: 10px;
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
