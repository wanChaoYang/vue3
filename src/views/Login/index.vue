<template>
  <div class="about">
    <head-nav rightBtnText="更多" title="登录/注册"></head-nav>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { headNav } from "../../components/index";
export default defineComponent({
  components: {
    "head-nav": headNav
  },
  setup() {}
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

