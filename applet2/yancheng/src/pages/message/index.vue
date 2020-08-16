<template>
  <div class="message">
     <navigation-bar
      :title="'消息'"
      :navBackgroundColor="'#fff'"
      :back-visible="true"
    ></navigation-bar>
    <div class="friendsList">
      <div class="friendsItem" v-for="(item,index) in messageList" :key="index" @click="goMessageDetail(item)">
        <div class="imgBox">
          <img v-if="item.properties.creatorAvatar" :src="item.properties.creatorAvatar" mode="aspectFill" />
        </div>
        <div class="wordBox">
          <p class="name">
            <span>{{item.properties.creatorName}}</span>
            <i class="iconfont icon-nan" v-if="item.properties.creatorGender == 1"></i>
            <i class="iconfont icon-nv" v-else-if="item.properties.creatorGender == 2"></i>
            <i class="iconfont" v-else></i>
          </p>
          <p class="info">
            对你说：
            <span>{{item.msg}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myMessageList } from "@/api/my.js";
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      messageList: [],
      headImg1: `${this.$store.state.imgUrlHttp}/a6.png`,
      headImg2: `${this.$store.state.imgUrlHttp}/a2.png`
    };
  },
  mounted () {
    this.fetchMyMessage()
  },
  methods: {
    async fetchMyMessage(){
      let mesRes = await myMessageList();
      console.log(mesRes)
      if(mesRes.status == 200){
        this.messageList = mesRes.result
      }
    },
    goMessageDetail(data) {
      let dd = JSON.stringify(data)
      wx.navigateTo({
        url: `/pages/messageDetails/main?msgData=${dd}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  padding-top: 20px;
  // 谜友
  .friendsList {
    width: 90%;
    margin: 0 auto;
    .friendsItem {
      font-size: 13px;
      display: flex;
      color: #525151;
      box-shadow: 0 4px 10px 1px #ddd;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      .imgBox {
        width: 46px;
        height: 46px;
        margin-right: 15px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wordBox {
        flex: 1;
        .name {
          line-height: 26px;
          span {
            font-size: 16px;
            color: #333;
            vertical-align: middle;
          }
          i {
            font-size: 18px;
            margin-left: 10px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .info {
          height: 14px;
          line-height: 14px;
          color: #797979;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 1; //显示的行
          line-clamp: 1; //显示的行
        }
      }
    }
  }
}
</style>
