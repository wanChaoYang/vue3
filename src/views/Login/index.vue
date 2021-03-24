<template>
  <div class="about">
    <head-nav rightBtnText="更多" title="登录/注册"></head-nav>
    <section>
      <div @click="login">登录</div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { headNav } from "../../components/index";
export default defineComponent({
  components: {
    "head-nav": headNav
  },
  setup(props, ctx) {
    const store = useStore();
    function login() {
      store.commit("LOGIN_IN", "token");
    }
    return {
      login
    };
  }
});
</script>
<style lang="less" scoped>
@import "./index.less";

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0.2rem;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>

