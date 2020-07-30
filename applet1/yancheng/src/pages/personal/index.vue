<template>
  <div class="my" @click.stop="hideZanAndPinglun">
    <navigation-bar :title="'个人详情'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="head">
      <div class="headImg">
        <img v-if="memberInfo.avatar" :src="memberInfo.avatar" mode="aspectFill" />
      </div>
      <div class="rightIcon" @click="isAttenToggle(memberInfo.isFollow,memberInfo.id)">
        <p class="attention attentioned" v-if="memberInfo.isFollow">已关注</p>
        <p class="attention" v-else>
          <i class="iconfont icon-jiahao"></i>
          <span>关注</span>
        </p>
      </div>
    </div>
    <div class="baseInfo">
      <div class="nameSexPhone">
        <p class="name">{{memberInfo.nickName}}</p>
        <p class="sex">
          <i class="iconfont" :class="memberInfo.gender == 1 ? 'icon-nan': 'icon-nv'"></i>
        </p>
        <p class="phone">{{memberInfo.mobile}}</p>
      </div>
      <div class="inaword">{{memberInfo.introduction}}</div>
      <div class="other">
        <p class="constellation">{{memberInfo.constellation}}</p>
        <p class="address">{{memberInfo.city}}</p>
        <p class="follower">{{memberInfo.followNum > 0 ? memberInfo.followNum + '人关注' : '暂无关注'}}</p>
      </div>
      <div class="editInfoBtn" @click="sixinFun">
        <i class="iconfont icon-sixin"></i>
        <span>私信</span>
      </div>
    </div>
    <div class="linew"></div>
    <!-- <div class="navBox">
      <div class="navItem" :class="navType == '0' ? 'active' : ''" @click="itemToggle('0')">
        <p>话题</p>
      </div>
      <div class="navItem" :class="navType == '1' ? 'active' : ''" @click="itemToggle('1')">
        <p>社区</p>
      </div>
    </div> -->
    <!-- 话题 -->
    <div class="contentList w94" v-if="navType == '0'">
      <div class="lengthNo" v-if="forumList.length == 0">该用户暂无话题动态</div>
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
    <!-- 动态 -->
    <div class="contentList contentList_2 w94" v-else>
      <div class="lengthNo" v-if="communityFriendsList.length == 0">该用户暂无社区动态</div>
      <div class="contentItem" v-for="(item,index) in communityFriendsList" :key="item.id">
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
          <div class="time">
            {{item.createTime}}
            <span
              class="del"
              @click.stop="delOneSelf(item.id,index)"
              v-if="item.memberId == delId"
            >删除</span>
          </div>
          <div class="handle">
            <div class="zan-pinglun" v-if="showZanAndPinglunNum == item.id">
              <span
                @click.stop="zanHandle(item.id,item.isLike,index)"
              >{{item.isLike == 1 ? '取消': '点赞'}}</span>
              <span @click.stop="showPinLunFun(index)">评论</span>
            </div>
            <div class="iconfont icon-pinglun2" @click.stop="showZanAndPinglun(item.id)"></div>
          </div>
        </div>
        <!-- 点赞展示 -->
        <div
          class="zanShowBox"
          @click.stop="goZan"
          v-if="item.properties.communityLikeList.length > 0"
        >
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
              v-if="comComItem.replyId"
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

    <div class="mask" @click.stop="closeMask" v-if="maskVal"></div>
    <div class="maskCont" v-if="maskVal">
      <div class="title">
        <img v-if="memberInfo.avatar" :src="memberInfo.avatar" mode="aspectFill" />
        <span>{{memberInfo.nickName}}</span>
      </div>
      <div class="textaCont">
        <textarea
          class="textA"
          auto-focus
          placeholder="请留下你想说的话，将发送到对方的消息中心"
          v-model="sixinValue"
          placeholder-style="color:#b8b8b8"
        ></textarea>
        <span class="numSpan">限100字</span>
      </div>
      <button class="contBtn" @click="conBtnPut">发送</button>
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
import {
  getMember,
  getMemberForum,
  getMemberComm,
  followMemberPost,
  followMemberDel
} from "@/api/personal";
import { getDateDiff } from "@/utils/getDateDiff";
import { constellation } from "@/utils/constellation";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      delId: "",
      mid: "", // 用户ID
      sixinValue: "",
      maskVal: false, //私信显示判断
      navType: 0, //话题，状态判断
      likeAct: false, //喜欢判断
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
      // 话题分页
      ffPage: {
        pageSize: 5, //一页显示条数
        pageIndex: 0, //页码
        total: 0 //总条数
      },
      // 社区分页
      cfPage: {
        pageSize: 3, //一页显示条数
        pageIndex: 0, //页码
        total: 0 //总条数
      }
    };
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data());
    this.mid = options.createrId;
    this.fetchMember(options.createrId);
    this.fetchMemberForum(options.createrId);
    // this.fetchMemberComm(options.createrId);
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
        this.$nextTick(() => {
          this.memberInfo["constellation"] =
            constellation(this.memberInfo.birthday) + "座";
        });
      }
    },
    // 获取话题列表
    async fetchMemberForum(id) {
      let _this = this;
      let data = {
        pageSize: _this.ffPage.pageSize,
        pageIndex: _this.ffPage.pageIndex
      };
      let ffRes = await getMemberForum(id, data);
      if (ffRes.status == 200) {
        var forumRes = ffRes.result.data;
        _this.ffPage.total = ffRes.result.total;
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
        if (_this.ffPage.pageIndex > 0) {
          _this.forumList = _this.forumList.concat(forResult);
        } else {
          // 第一页则直接赋值 （下拉刷新）
          _this.forumList = forResult;
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
        pageSize: _this.cfPage.pageSize,
        pageIndex: _this.cfPage.pageIndex
      };
      let cfRes = await getMemberComm(id, data);
      if (cfRes.status == 200) {
        var comRes = cfRes.result.data;
        _this.cfPage.total = cfRes.result.total;
        var comResult = comRes.map(item => {
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
        if (_this.cfPage.pageIndex > 0) {
          _this.communityFriendsList = _this.communityFriendsList.concat(
            comResult
          );
        } else {
          // 第一页则直接赋值 （下拉刷新）
          _this.communityFriendsList = comResult;
        }
      }
    },
    //  个人 关注 切换
    isAttenToggle(isFoll, id) {
      if (isFoll) {
        this.folMemberDel(id);
      } else {
        this.folMemberPost(id);
      }
    },
    // 个人 关注
    async folMemberPost(id) {
      let poRes = await followMemberPost(id);
      if (poRes.status == 200) {
        this.memberInfo.isFollow = poRes.result;
        wx.showToast({
          title: "关注成功",
          icon: "none",
          duration: 2000
        });
      }
    },
    // 个人  取消关注
    async folMemberDel(id) {
      let deRes = await followMemberDel(id);
      if (deRes.status == 200) {
        this.memberInfo.isFollow = false;
        wx.showToast({
          title: "取消关注",
          icon: "none",
          duration: 2000
        });
      }
    },
    // 动态，社区切换
    itemToggle(num) {
      this.navType = num;
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
    // 话题关注
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
          console.log("p----", res);
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
    // 私信弹窗
    sixinFun() {
      this.maskVal = true;
      this.sixinValue = "";
    },
    // 关闭私信弹窗
    closeMask() {
      this.maskVal = false;
    },
    // 发送私信
    conBtnPut() {
      let data = {
        msg: this.sixinValue,
        recipient: this.memberInfo.id
      };
      messageTo(data).then(res => {
        if (res.status == 200) {
          this.maskVal = false;
          wx.showToast({
            title: "发送成功",
            duration: 2000 //停留时间
          });
        }
      });
    },
    // 评论内容赋值
    getcomment(e) {
      this.commentValue = e.target.value;
    },
    // 动态的评论
    submitComment(e) {
      var _this = this;
      let authInfo = wx.getStorageSync("authInfo");
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
          comment: _this.commentValue + "l",
          communityId: _this.comItemData.communityId,
          // memberName: _this.communityFriendsList[_this.pinglunIndex].memberName,
          memberName: authInfo.nickName,
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
      if (this.forumList.length >= this.ffPage.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.ffPage.pageIndex++;
        this.fetchMemberForum(this.mid);
      }
    } else {
      if (this.communityFriendsList.length >= this.cfPage.total) {
        wx.showToast({
          title: "到底了",
          icon: "none",
          duration: 2000
        });
      } else {
        this.cfPage.pageIndex++;
        this.fetchMemberComm(this.mid);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  .head {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headImg {
      width: 70px;
      height: 70px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightIcon {
      display: flex;
      justify-content: space-around;
      .attention {
        background-color: #b1a1a3;
        width: 65px;
        text-align: center;
        line-height: 25px;
        border-radius: 25px;
        color: #fff;
        .iconfont {
          font-size: 12px;
          margin-right: 2px;
          color: #fff;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          font-size: 12px;
          vertical-align: middle;
        }
        &.attentioned {
          color: #cbcbcb;
          background: transparent;
          font-size: 12px;
          border: 1px solid #cbcbcb;
        }
      }
    }
  }
  .baseInfo {
    width: 90%;
    margin: 10px auto;
    position: relative;
    .nameSexPhone {
      display: flex;
      justify-content: left;
      align-items: center;
      .name {
        font-size: 20px;
        font-weight: 600;
        margin-right: 10px;
      }
      .sex {
        font-size: 14px;
        color: #707070;
        margin-right: 10px;
      }
      .phone {
        font-size: 16px;
        color: #525151;
      }
    }
    .inaword {
      font-size: 12px;
      color: #333;
      margin: 10px 0;
    }
    .other {
      display: flex;
      justify-content: left;
      p {
        padding: 2px 10px;
        margin-right: 10px;
        background-color: #eee;
        font-size: 12px;
        color: #525151;
        border-radius: 5px;
      }
    }
    .editInfoBtn {
      font-size: 12px;
      position: absolute;
      top: 20%;
      right: 0;
      padding: 4px 15px;
      border-radius: 5px;
      transform: translateY(-50%);
      line-height: 25px;
      i {
        display: inline-block;
        margin-right: 5px;
        font-size: 20px;
        color: #707070;
        vertical-align: middle;
      }
      span {
        color: #f00;
        vertical-align: middle;
      }
    }
  }
  .linew {
    width: 100%;
    height: 8px;
    background-color: #eee;
    margin-top: 20px;
  }
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
  .lengthNo {
    font-size: 14px;
    text-align: center;
    color: #999;
    margin-top: 30%;
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
  // 私信弹窗
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .maskCont {
    position: absolute;
    z-index: 4;
    width: 80%;
    // height: 35%;
    background-color: #fff;
    padding: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .title {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      img {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        margin-right: 10px;
      }
    }
    .textaCont {
      background-color: #e8e8e8;
      height: 127px;
      padding: 10px;
      position: relative;
      .textA {
        font-size: 14px;
        width: 100%;
        height: 100%;
        text-align: justify;
        color: #333;
      }
      .numSpan {
        position: absolute;
        display: block;
        right: 10px;
        bottom: 5px;
        color: #b7b7b7;
        font-size: 15px;
      }
    }
    .contBtn {
      background-color: #b1a1a3;
      color: #fff;
      width: 110px;
      height: 26px;
      line-height: 26px;
      margin: 10px auto 0;
      font-size: 15px;
      &::after {
        border: none;
      }
    }
  }
}
</style>
