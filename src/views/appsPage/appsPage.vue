<template>
  <head-nav title="分类页面"></head-nav>
</template>
<script>
import { defineComponent } from "vue";
import { headNav } from "../../components/index";
export default defineComponent({
  name: "appsPage",
  components: {
    "head-nav": headNav
  }
});
</script>
<style lang='less' scoped>
</style>