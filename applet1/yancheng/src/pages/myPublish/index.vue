<template>
  <div class="myPublish">
    <navigation-bar
      :title="'我的发布'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="navBox">
      <div class="navItem" :class="itemActive == '0' ? 'active' : ''" @click="itemToggle('0')">
        <!-- <img src="../../../static/images/aaa1.png" mode="aspectFill"> -->
        <i class="iconfont icon-huati"></i>
        <!-- <p>话题</p> -->
      </div>
      <div class="navItem" :class="itemActive == '1' ? 'active' : ''" @click="itemToggle('1')">
        <!-- <img src="../../../static/images/aaa1.png" mode="aspectFill"> -->
        <i class="iconfont icon-xiangji"></i>
        <!-- <p>状态</p> -->
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="contentList w94">
      <div class="contentItem" v-for="(item,index) in forumList" :key="index">
        <!-- <div class="headName" @click.stop="goPersonal">
          <img src="../../../static/images/aaa1.png" mode="aspectFill" />
          <span>张小凡</span>
        </div>-->
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
          <div class="time">10分钟前</div>
          <div class="handle">
            <i class="iconfont" :class="likeAct?'icon-aixin1':'icon-aixin0'" @click.stop="likeFun"></i>
            <i class="iconfont icon-pinglun" @click.stop="goTopic(item.id)"></i>
            <!-- <i class="iconfont icon-sixin"></i> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forumContentGet } from "@/api/home";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      likeAct: false,
      itemActive: 0,
      forumList: [],
    };
  },
  mounted() {
    this.fetchForumContentList();
  },
  methods: {
    fetchForumContentList() {
      forumContentGet().then(res => {
        if (res.status == 200) {
          
          var resData = res.result.data;
          resData.map(item => {
            item.images = item.images.split(";");
            if(item.content.length > 100){
              item['showEllip'] = true
            }else{
              item['showEllip'] = false
            }
          });
          this.forumList = resData;
        }
      });
    },
    itemToggle(num) {
      this.itemActive = num;
    },
    goMessage() {
      wx.navigateTo({
        url: "/pages/message/main"
      });
    },
    goTopic(id) {
      wx.navigateTo({
        url: `/pages/topicDetails/main?forumContentId=${id}`
      });
    },
    requireTxt(index) {
      let val = this.forumList[index].showEllip;
      if (val) {
        this.forumList[index].showEllip = false;
      } else {
        this.forumList[index].showEllip = true;
      }
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
    likeFun() {
      this.likeAct = !this.likeAct;
      if (this.likeAct) {
        wx.showToast({
          title: "关注成功",
          icon: "none",
          duration: 1500
        });
      } else {
        wx.showToast({
          title: "取消关注",
          icon: "none",
          duration: 1500
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
.myPublish {
  .navBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 15px 0 0px;
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
        font-size: 12px;
        vertical-align: middle;
        color: #e83e3e;
      }
      &.active {
        i {
          color: #111;
          font-weight: 600;
        }
      }
    }
  }
  // 内容列表
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
        }
        .handle {
          width: 16%;
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
