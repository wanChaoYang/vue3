<template>
  <head-nav @rightEvent="rightEvent" rightBtnText="退出" title="我的"></head-nav>
</template>
<script>
import { defineComponent } from "vue";
import { headNav } from "../../components/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "me",
  components: {
    "head-nav": headNav
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    function rightEvent() {
      store.commit("LOGIN_OUT");
      router.replace("/Login");
    }
    return {
      rightEvent
    };
  }
});
</script>
<style lang='less' scoped>
</style>