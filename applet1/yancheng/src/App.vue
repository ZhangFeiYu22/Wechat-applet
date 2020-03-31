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
</style>
