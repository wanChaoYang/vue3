<template>
  <head-nav title="购物车"></head-nav>
</template>
<script>
import { defineComponent } from "vue";
import { headNav } from "../../components/index";
export default defineComponent({
  name: "cart",
  components: {
    "head-nav": headNav
  }
});
</script>
<style lang='less' scoped>
</style>