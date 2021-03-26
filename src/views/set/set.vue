<template>
  <head-nav @rightEvent="rightEvent" rightBtnText="更多" title="设置"></head-nav>
  <van-cell title="单元格" is-link />
  <van-cell title="单元格" is-link value="内容" />
  <van-cell title="单元格" is-link arrow-direction="down" value="内容" />
  <van-button type="primary" block @click="login_out">退出</van-button>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Cell, CellGroup, Button } from "vant";
import { headNav } from "../../components/index";
export default defineComponent({
  name: "setPage",
  components: {
    "head-nav": headNav
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    function login_out() {
      store.commit("LOGIN_OUT");
      router.replace("/Login");
    }
    function rightEvent() {}
    return {
      login_out,
      rightEvent
    };
  }
});
</script>
<style lang='less' scoped>
</style>