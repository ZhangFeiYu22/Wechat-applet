<template>
  <div class="myVip">
    <navigation-bar :title="'会员等级'" :navBackgroundColor="'#fff'" :back-visible="true"></navigation-bar>
    <div class="head">
      <div class="headImg">
        <img src="../../../static/images/plate.png" mode="aspectFill" />
      </div>
      <div class="headName">
        <p class="name">张小凡</p>
        <p class="phone">
          <i class="iconfont icon-nan"></i>
          <span>18211112222</span>
        </p>
      </div>
    </div>

    <div class="containerMain">
      <swiper
        class="swiperBox"
        duration="500"
        previous-margin="20px"
        next-margin="20px"
        @change="swiperChange"
      >
        <block v-for="(item,index) in levList" :key="index">
          <swiper-item class="swiperItemBox">
            <div class="swiperViewBox">
              <div class="topDiv">
                <div class="left">
                  <p class="p1">
                    Lv<span class="p1_num">{{item}}</span>
                    <span class="p1_after">等级权益说明</span>
                  </p>
                  <p class="p2">
                    在消费
                    <span class="p2_num">8000</span>元可晋级
                  </p>
                  <p class="p3">
                    已经在这级积累
                    <span class="p3_num">300</span>天了
                  </p>
                </div>
                <div class="right">
                  <img src="../../../static/images/lv1.png" mode="adpectFill" />
                </div>
              </div>
              <div class="bottomDiv">
                <ul>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                  <li>
                    <img src="../../../static/images/plate.png" mode="aspectFill" />
                    <p>发布状态</p>
                  </li>
                </ul>
              </div>
              <div class="sanjiao"></div>
            </div>
          </swiper-item>
        </block>
      </swiper>
      <swiper class="swiperNum" :current="currentNum">
        <block v-for="(item,index) in levList" :key="index">
          <swiper-item class="swiperItemNumBox">
            <div class="dot"></div>
          </swiper-item>
        </block>
      </swiper>
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
      levList: ["1", "2", "3", "4", "5", "6", "7"],
      currentNum: 0
    };
  },
  mounted() {},
  methods: {
    swiperChange(e) {
      console.log(e.target.current);
      this.currentNum = e.target.current;
    }
  }
};
</script>

<style lang="less" scoped>
.myVip {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, #1c1c1c, #353536);
  .head {
    width: 90%;
    margin: 15px auto;
    display: flex;
    align-items: center;
    .headImg {
      margin-right: 10px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .headName {
      flex: 1;
      p {
        line-height: 30px;
        color: #fff;
        &.name {
          font-size: 20px;
        }
        &.phone {
          font-size: 16px;
          i {
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .containerMain {
    height: 433px;
    .swiperBox {
      height: 100%;
      background: transparent;
      .swiperItemBox {
        display: flex;
        justify-content: center;
        // align-items: center;
        .swiperViewBox {
          position: relative;
          height: 420px;
          background: linear-gradient(to bottom, #d7a164, #eddcbe);
          width: 96%;
          border-radius: 10px;
          padding: 10px 15px;
          .topDiv {
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              .p1 {
                font-size: 42px;
                font-weight: 600;
                .p1_num {
                  margin-right: 5px;
                }
                .p1_after {
                  font-size: 13px;
                  font-weight: normal;
                  &::after {
                    display: inline-block;
                    content: "";
                    width: 5px;
                    height: 5px;
                    border-right: 1px solid #fff;
                    border-bottom: 1px solid #fff;
                    transform: rotate(-45deg);
                    position: relative;
                    top: -1px;
                    right: -5px;
                  }
                }
              }
              .p2 {
                font-size: 12px;
                padding-left: 10px;
                line-height: 30px;
                &::before {
                  display: inline-block;
                  content: "";
                  width: 5px;
                  height: 5px;
                  position: relative;
                  background-color: #fff;
                  border-radius: 5px;
                  top: -3px;
                  right: 5px;
                }
                .p2_num {
                  font-size: 25px;
                }
              }
              .p3 {
                font-size: 12px;
                padding-left: 10px;
                line-height: 30px;
                &::before {
                  display: inline-block;
                  content: "";
                  width: 5px;
                  height: 5px;
                  position: relative;
                  background-color: #fff;
                  border-radius: 5px;
                  top: -3px;
                  right: 5px;
                }
              }
            }
            .right {
              img {
                width: 100px;
                height: 100px;
              }
            }
          }
          .bottomDiv {
            // width: 100%;
            height: 270px;
            background: linear-gradient(to bottom, #e9ceab, #f4e9d8);
            border-radius: 5px;
            padding: 10px;
            ul {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              li {
                width: 25%;
                text-align: center;
                margin-bottom: 20px;
                img {
                  width: 44px;
                  height: 44px;
                  border-radius: 100%;
                }
                p {
                  font-size: 12px;
                }
              }
            }
          }
          .sanjiao {
            position: absolute;
            width: 0;
            height: 0;
            border-top: 13px solid #eddcbe;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 13px solid transparent;
            left: 50%;
            transform: translateX(-50%);
            bottom: -26px;
          }
        }
      }
    }
    .swiperNum {
      margin-top: 10px;
      height: 30px;
      .swiperItemNumBox {
        display: flex;
        justify-content: center;
        margin-left: 49%;
        .dot {
          height: 2px;
          width: 100%;
          margin-top: 15px;
          background-color: skyblue;
          position: relative;
          &::before {
            display: inline-block;
            content: "";
            width: 7px;
            height: 7px;
            background-color: #ff8000;
            border: 2px solid #fff;
            border-radius: 100%;
            position: absolute;
            top: -4px;
            left: 0;
          }
        }
        &:last-child {
          width: 86.1% !important;
          .dot {
            &::before {
              display: none;
            }
            &::after {
              display: inline-block;
              content: "";
              width: 7px;
              height: 7px;
              background-color: #ff8000;
              border: 2px solid #fff;
              border-radius: 100%;
              position: absolute;
              top: -4px;
              right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
