<template>
  <div class="mallCenter">
     <navigation-bar
      :title="'商城'"
      :navBackgroundColor="'#fff'"
    ></navigation-bar>
    <div class="load">
      敬请期待。。。
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
    };
  },
  methods: {
   
  },
};
</script>

<style lang="less" scoped>
.mallCenter {
  .load{
    position: absolute;
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
