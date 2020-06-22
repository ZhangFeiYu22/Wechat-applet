<template>
  <div class="topic">
    <navigation-bar :title="'话题'" :navBackgroundColor="'#fff'" :publish-visible="2"></navigation-bar>
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in forumList" :key="index">
        <div class="headName" @click.stop="goPersonal(item.createrId)">
          <img v-if="item.createrAvatar" :src="item.createrAvatar" mode="aspectFill" />
          <span>{{item.createrName}}</span>
        </div>
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
    <div style="height:20px"></div>
  </div>
</template>

<script>
import {
  adGet,
  forumContentGet,
  forumContentDel,
  forumContentGetLogin,
  forumLike,
  forumLikeNo
} from "@/api/home";
import { getDateDiff } from "@/utils/getDateDiff";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      delId: "",
      forumList: [],
      pageSize: 5, //一页显示条数
      pageIndex: 0, //页码
      total: 0 //总条数
    };
  },
  onLoad() {
    if (wx.getStorageSync("isLogin")) {
      this.delId = wx.getStorageSync("authId");
      this.fetchForumContentList();
    } else {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
    // if (wx.getStorageSync("isLogin")) {
    //   this.fetchForumContentList();
    // } else {
    //   wx.showModal({
    //     content: "登录获取更多权限",
    //     success(res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: "/pages/login/main"
    //         });
    //       } else if (res.cancel) {
    //         console.log("用户点击取消");
    //       }
    //     }
    //   });
    // }
  },
  onShow() {
    this.delId = wx.getStorageSync("authId");
  },
  methods: {
    fetchForumContentList() {
      var data = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      };
      this.fetchForumContent(data);
    },
    delOneSelf(id, index) {
      var _this = this;
      wx.showModal({
        content: "确定删除吗？",
        success(res) {
          if (res.confirm) {
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
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 获取列表数据
    async fetchForumContent(data) {
      var forumRes;
      if (wx.getStorageSync("isLogin")) {
        forumRes = await forumContentGetLogin(data);
      } else {
        forumRes = await forumContentGet(data);
      }
      if (forumRes.status == 200) {
        var resData = forumRes.result.data;
        this.total = forumRes.result.total;
        var resResult = resData.map(item => {
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
        // 如果不是第一页，追加数据
        if (this.pageIndex > 0) {
          this.forumList = this.forumList.concat(resResult);
        } else {
          // 第一页则直接赋值 （下拉刷新）
          this.forumList = resResult;
        }
        wx.stopPullDownRefresh(); //停止下拉刷新
      }
    },

    // 折叠展开
    requireTxt(index) {
      let val = this.forumList[index].showEllip;
      if (val) {
        this.forumList[index].showEllip = false;
      } else {
        this.forumList[index].showEllip = true;
      }
    },

    //跳转个人中心
    goPersonal(creatId) {
      wx.navigateTo({
        url: `/pages/personal/main?createrId=${creatId}`
      });
    },
    goTopic(id) {
      wx.navigateTo({
        url: `/pages/topicDetails/main?forumContentId=${id}`
      });
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(index, imgIndex) {
      let outIdx = index;
      let inIdx = imgIndex;
      let imgArr = this.forumList[outIdx].images;
      wx.previewImage({
        current: imgArr[inIdx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
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
    }
  },
  onReachBottom: function() {
    if (this.forumList.length >= this.total) {
      wx.showToast({
        title: "到底了",
        icon: "none",
        duration: 2000
      });
    } else {
      this.pageIndex++; //获取现在页码
      this.fetchForumContentList();
    }
  },
  //下拉刷新
  onPullDownRefresh: function() {
    this.pageIndex = 0;
    this.fetchForumContentList();
  }
};
</script>

<style lang="less" scoped>
.topic {
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
}
</style>
