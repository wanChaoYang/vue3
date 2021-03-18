<template>
  <div id="seachPage">
    <header class="border-b-eee">
      <seach-input @change="oninput" :value="state.seachValue"></seach-input>
    </header>
    <section></section>
  </div>
</template>

<script lang="ts">
import { seachinput } from "../../components/index";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "seachPage",
  components: {
    "seach-input": seachinput
  },
  setup() {
    const state = reactive({
      seachValue: ""
    });
    function oninput() {}
    return {
      state,
      oninput
    };
  }
});
</script>

<style lang="less" scoped>
@import "./seachPage.less";
</style>