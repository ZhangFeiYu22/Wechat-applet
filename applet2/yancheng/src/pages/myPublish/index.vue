<template>
  <div class="myPublish" @click.stop="hideZanAndPinglun">
    <navigation-bar :title="'我的发布'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="navBox">
      <div class="navItem" :class="navType == '0' ? 'active' : ''" @click="itemToggle('0')">
        <p>状态</p>
      </div>
      <div class="navItem" :class="navType == '1' ? 'active' : ''" @click="itemToggle('1')">
        <p>投票</p>
      </div>
      <div class="navItem" :class="navType == '2' ? 'active' : ''" @click="itemToggle('2')">
        <p>活动</p>
      </div>
      <div class="navItem" :class="navType == '3' ? 'active' : ''" @click="itemToggle('3')">
        <p>征寻</p>
      </div>
    </div>
    <!-- 状态 -->
    <div class="contentList w94" v-if="navType == '0'">
      <div class="contentItem" v-for="(item,index) in forumList" :key="index">
        <div class="content" :class="item.showEllip ? 'ellip' : ''">{{item.content}}</div>
        <div v-if="item.showEllip" class="toggleBox">
          <div class="more_txt" @click.stop="requireTxt(index)">
            <span>{{item.showEllip ? '展开' : '收起'}}</span>
          </div>
        </div>
        <!-- 图片展示 -->
        <div class="imgsList">
          <div
            class="imgsItem"
            v-for="(picItem,picIndex) in item.images"
            :key="picIndex"
            @click.stop="showImg(index,picIndex)"
          >
            <img v-if="picItem" :src="picItem" mode="aspectFill" />
          </div>
        </div>
        <div class="timeHandle">
          <div class="time">
            {{item.createTime}}
            <span
              class="del"
              @click="delOneSelf(item.id,index)"
              v-if="item.createrId == delId"
            >删除</span>
          </div>
          <div class="handle">
            <i
              class="iconfont"
              :class="item.isLike == 1 ?'icon-aixin1':'icon-aixin0'"
              @click.stop="likeFun(item.isLike,item.id,index)"
            ></i>
            <i class="iconfont icon-pinglun" @click.stop="goTopic(item.id)"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 投票 -->
    <div class="contentList contentList_2" v-if="navType == '1'">
      <voteItem :headShow="false" :voteLists="voteLists"></voteItem>
    </div>
    <!-- 活动 -->
    <div class="contentList contentList_2" v-if="navType == '2'">
      <activityItem :acticityList="acticityList"></activityItem>
    </div>
    <!-- 征寻 -->
    <div class="contentList contentList_2" v-if="navType == '3'">
      <consultItem :statusShow="true" :consultList="solicitLists"></consultItem>
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
  </div>
</template>

<script>
import {
  forumContentGet,
  forumContentDel,
  forumContentGetLogin,
  forumLike,
  forumLikeNo,
  messageTo
} from "@/api/home";
import {
  communityFriendsListGet,
  communityFriendsListDel,
  communityFriendsListGetLogin,
  communityLike,
  communityLikeNo,
  communityCommentPost
} from "@/api/community";
import { getMember, getMemberForum, getMemberComm } from "@/api/personal";
import {
  myPublish_activity,
  myPublish_vote,
  myPublish_solicit
} from "@/api/my";
import { getDateDiff } from "@/utils/getDateDiff";
import navigationBar from "@/components/navigationBar";
import activityItem from "@/components/activityItem";
import voteItem from "@/components/voteItem";
import consultItem from "@/components/consultItem";
export default {
  components: {
    navigationBar,
    activityItem,
    voteItem,
    consultItem
  },
  data() {
    return {
      delId: "",
      mid: "", // 用户ID
      sixinValue: "",
      maskVal: false, //私信显示判断
      navType: 0,
      memberInfo: {},
      forumList: [],
      showZanAndPinglunNum: null, //点击是那个  将评论点赞显示出来
      zanPingActiveId: null, //点击是那个  将评论点赞显示出来    保存这个ID  评论和点赞使用
      commentValue: "",
      showPinLun: false,
      pinglunIndex: "",
      placeholderPL: "评论",
      show_back: 1, //1位留言  2为回复

      communityFriendsList: [],
      voteLists: [],
      acticityList: [],
      solicitLists: [],
      // 分页数据
      pageData: {
        pageSize: 5, //一页显示条数
        pageIndex: 0, //页码
        total: 0 //总条数
      }
    };
  },
  onLoad(options) {
    this.mid = options.createrId;
    this.delId = wx.getStorageSync("authId");
    this.fetchMember(options.createrId);
    this.fetchMemberForum(options.createrId);
    this.fetchMemberComm(options.createrId);
  },
  onShow() {
    this.delId = wx.getStorageSync("authId");
  },
  methods: {
    // 个人信息
    async fetchMember(id) {
      let memRes = await getMember(id);
      if (memRes.status == 200) {
        this.memberInfo = memRes.result;
        this.folMemberGet(memRes.result.id);
      }
    },
    // 获取话题列表
    async fetchMemberForum(id) {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let ffRes = await getMemberForum(id, data);
      if (ffRes.status == 200) {
        var forumRes = ffRes.result.data;
        _this.pageData.total = ffRes.result.total;
        var forResult = forumRes.map(item => {
          if (item.images !== "" && item.images) {
            item.images = item.images.split(";");
          } else {
            item.images = [];
          }
          if (item.content.length > 80) {
            item["showEllip"] = true;
          } else {
            item["showEllip"] = false;
          }
          if (item.createTime) {
            let dateStr = item.createTime;
            item.createTime = getDateDiff(dateStr);
          }
          return item;
        });
        if (_this.pageData.pageIndex > 0) {
          _this.forumList = _this.forumList.concat(forResult);
        } else {
          // 第一页则直接赋值 （下拉刷新）
          _this.forumList = forResult;
        }
      }
    },
    // 获取活动列表
    async fetchActivity() {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let acRes = await myPublish_activity(data);
      if (acRes.status == 200) {
        _this.pageData.total = acRes.result.total;
        let acticityList = acRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.acticityList = _this.acticityList.concat(acticityList);
        } else {
          _this.acticityList = acticityList;
        }
      }
    },
    // 获取投票列表
    async fetchVote() {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let voRes = await myPublish_vote(data);
      if (voRes.status == 200) {
        _this.pageData.total = voRes.result.total;
        let voteListsMap = voRes.result.data;
        let voteLists = voteListsMap.map(vo => {
          if (vo.options) {
            vo.options = JSON.parse(vo.options);
          }
          if (vo.images) {
            vo.images = vo.images.split("|");
          }
          return vo;
        });
        if (_this.pageData.pageIndex > 0) {
          _this.voteLists = _this.voteLists.concat(voteLists);
        } else {
          _this.voteLists = voteLists;
        }
      }
    },
    // 获取征寻列表
    async fetchSolicit() {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let soRes = await myPublish_solicit(data);
      if (soRes.status == 200) {
        _this.pageData.total = soRes.result.total;
        let solicitLists = soRes.result.data;
        if (_this.pageData.pageIndex > 0) {
          _this.solicitLists = _this.solicitLists.concat(solicitLists);
        } else {
          _this.solicitLists = solicitLists;
        }
      }
    },
    delOneSelf(id, index) {
      var _this = this;
      wx.showModal({
        content: "确定删除吗？",
        success(res) {
          if (res.confirm) {
            if (_this.navType == "0") {
              forumContentDel(id).then(delRes => {
                if (delRes.status == 200) {
                  wx.showToast({
                    title: "删除成功",
                    icon: "none",
                    duration: 2000
                  });
                  _this.forumList.splice(index, 1);
                }
              });
            } else {
              communityFriendsListDel(id).then(delRes => {
                if (delRes.status == 200) {
                  wx.showToast({
                    title: "删除成功",
                    icon: "none",
                    duration: 2000
                  });
                  _this.communityFriendsList.splice(index, 1);
                }
              });
            }
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 获取社区列表
    async fetchMemberComm(id) {
      let _this = this;
      let data = {
        pageSize: _this.pageData.pageSize,
        pageIndex: _this.pageData.pageIndex
      };
      let cfRes = await getMemberComm(id, data);
      if (cfRes.status == 200) {
        var comRes = cfRes.result.data;
        _this.pageData.total = cfRes.result.total;
        var resResult = comRes.map(item => {
          if (item.images !== "") {
            item.images = item.images.split(";");
          }
          if (item.content.length > 80) {
            item["showEllip"] = true;
          } else {
            item["showEllip"] = false;
          }
          if (item.createTime) {
            let dateStr = item.createTime;
            item.createTime = getDateDiff(dateStr);
          }
          return item;
        });
        if (_this.pageData.pageIndex > 0) {
          _this.communityFriendsList = _this.communityFriendsList.concat(
            resResult
          );
        } else {
          // 第一页则直接赋值 （下拉刷新）
          _this.communityFriendsList = resResult;
        }
      }
    },
    // nav 切换
    itemToggle(num) {
      this.navType = num;
      this.pageData = {
        pageSize: 5,
        pageIndex: 0,
        total: 0
      };
      switch (num) {
        case "0":
          this.fetchMemberForum(this.mid);
          break;
        case "1":
          this.fetchVote();
          break;
        case "2":
          this.fetchActivity();
          break;
        case "3":
          this.fetchSolicit();
          break;

        default:
          break;
      }
    },
    // 展开收起
    requireTxt(index) {
      let val = this.forumList[index].showEllip;
      if (val) {
        this.forumList[index].showEllip = false;
      } else {
        this.forumList[index].showEllip = true;
      }
    },
    // 社区的动态详情
    goTopic(id) {
      wx.navigateTo({
        url: `/pages/topicDetails/main?forumContentId=${id}`
      });
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr =
        this.navType == "0"
          ? this.forumList[outIdx].images
          : this.communityFriendsList[outIdx].images;
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
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
    // 点赞，取消点赞
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
    // 评论
    showPinLunFun(index) {
      this.showZanAndPinglunNum = null;
      this.commentValue = "";
      this.placeholderPL = "留言: " + "飞鱼";
      this.showPinLun = true;
      this.show_back = 1;
      this.pinglunIndex = index;
    },
    // 长按回复
    backPinLunFun(comItem, index) {
      console.log(comItem);
      this.showZanAndPinglunNum = null;
      this.placeholderPL = "回复: " + comItem.memberName;
      this.showPinLun = true;
      this.show_back = 2;
      this.pinglunIndex = index;
      this.comItemData = comItem;
    },
    // 关注（点赞）
    likeFun(isLike, id, index) {
      var _this = this;
      if (isLike == 2) {
        forumLike(id).then(res => {
          if (res.status == 200) {
            _this.forumList[index].isLike = 1;
            wx.showToast({
              title: "关注成功",
              icon: "none",
              duration: 1500
            });
          }
        });
      } else {
        forumLikeNo(id).then(res => {
          if (res.status == 200) {
            _this.forumList[index].isLike = 2;
            wx.showToast({
              title: "取消关注",
              icon: "none",
              duration: 1500
            });
          }
        });
      }
    },
    // 评论内容赋值
    getcomment(e) {
      this.commentValue = e.target.value;
    },
    // 动态的评论
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
          communityId: _this.zanPingActiveId,
          memberName: "飞鱼"
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
          this.communityFriendsList[
            this.pinglunIndex
          ].properties.communityCommentList.push(pingD);
        }
      });
    }
  },
  onReachBottom: function() {
    if (this.navType == 0) {
      if (this.forumList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchMemberForum(this.mid);
      }
    } else if (this.navType == 1) {
      if (this.voteLists.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchVote();
      }
    } else if (this.navType == 2) {
      if (this.acticityList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchActivity();
      }
    } else if (this.navType == 3) {
      if (this.solicitLists.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchSolicit();
      }
    } else {
      if (this.communityFriendsList.length >= this.pageData.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.pageData.pageIndex++;
        this.fetchMemberComm(this.mid);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.myPublish {
  .navBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 10px 0 10px;
    border-bottom: 1px solid #eee;
    .navItem {
      i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        font-size: 30px;
        color: #999;
      }
      p {
        display: inline-block;
        font-size: 18px;
        vertical-align: middle;
        color: #777;
      }
      &.active {
        i {
          color: #111;
          font-weight: 600;
        }
        p {
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
  // 内容列表
  // 社区
  .contentList {
    margin-top: 20px;
    .contentItem {
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 20px;
      .content {
        line-height: 20px;
        color: #333;
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
        .time {
          width: 40%;
          font-size: 14px;
          color: #8b8b8b;
          .del {
            color: #5d7394;
            font-size: 13px;
            margin-left: 10px;
          }
        }
        .handle {
          width: 15%;
          display: flex;
          justify-content: space-between;
          .iconfont {
            font-size: 20px;
          }
        }
      }
    }
  }
  // 动态
  .contentList_2 {
    .contentItem {
      .timeHandle {
        position: relative;
        .handle {
          display: flex;
          justify-content: space-between;
          width: 20px;
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
          img {
            width: 28px;
            height: 28px;
            border-radius: 28px;
          }
        }
        .zanWord {
          margin-left: 10px;
          font-size: 14px;
          color: #010101;
          color: #666;
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
