<template>
  <head-nav @rightEvent="rightEvent" rightBtnText="设置" title="我的"></head-nav>
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
    // const store = useStore();
    const router = useRouter();
    function rightEvent() {
      router.push("/set");
    }
    return {
      rightEvent
    };
  }
});
</script>
<style lang='less' scoped>
</style>