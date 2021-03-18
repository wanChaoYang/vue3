<template>
  <div id="nav">
    <router-view />
    <!-- <router-link to="/Demo">Demo</router-link>| -->
    <van-tabbar v-model="state.active" @change="onChange" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/appsPage">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart" badge="3">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Login">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      active: 0
    });
    onMounted(() => {
      // router.options.routes.forEach(element => {
      //   if (element.meta) {
      //     state.showTab = element.meta.showTab;
      //   }
      // });
    });
    function onChange(result): void {
      console.log(router);
      console.log(router.currentRoute.value.meta);
      /**
       * 因为无法获取roter当前mate状态，所以暂时无法所屏蔽tab
       */
      // router.options.routes.forEach(element => {});
    }
    return {
      state,
      onChange
    };
  }
});
</script>
<style lang="less" scoped>
.van-tabbar-item {
  font-size: 0.14rem !important;
}
</style>
