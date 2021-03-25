<template>
  <div id="nav">
    <router-view />
    <!-- <router-link to="/Demo">Demo</router-link>| -->
    <van-tabbar v-model="state.active" @change="onChange" route v-if="routeInfo.showTab">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/appsPage">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart" badge="3">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  setup(proxy, ctx) {
    const router = useRouter();
    const useoute = useRoute();
    const state = reactive({
      active: 0
    });

    /**
     * 需要通过计算属性才能获取到当前路由信息
     * 注意：通过点击事件和生命周期函数都只能获取前一个页面的路由信息
     */
    let routeInfo: any = computed(() => {
      return useoute.meta;
    });
    onMounted(() => {});
    function onChange(result): void {}

    return {
      state,
      onChange,
      routeInfo
    };
  }
});
</script>
<style lang="less" scoped>
.van-tabbar-item {
  font-size: 0.14rem !important;
}
</style>
