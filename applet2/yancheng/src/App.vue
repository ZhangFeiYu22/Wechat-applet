<script>
import store from "@/store";
import { getSessionInfo, getUserInfo, userInfoGet } from "@/api/login";
export default {
  mounted() {
    
  },
  methods: {
   
  }
};
</script>

<style>
@import "./../static/iconfont/iconfont.css";
page{
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
div,
view {
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.w94 {
  width: 94%;
  margin: 0 auto;
}
.icon-aixin1 {
  color: #f00 !important;
}

/* 单选按钮样式*/
radio{
  margin-right: 10px;
  color: #989898;
}
radio .wx-radio-input {
  width: 15px;
  height: 15px;
  /* border: 4rpx solid #999; */
  border-radius: 100%;
  background: none;
}

/*单选按钮选中后内部样式*/

radio .wx-radio-input.wx-radio-input-checked {
  border: 4rpx solid #3cbcee!important;
}

radio .wx-radio-input.wx-radio-input-checked::before {
  width: 60%;
  height: 60%;
  background: #3cbcee;
  border-radius: 100%;
  content: '';
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
</style>
