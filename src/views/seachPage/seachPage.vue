<template>
  <div id="seachPage">
    <header class="border-b-eee">
      <seach-input @onSeach="onSeach" rightText="搜索"></seach-input>
    </header>
    <section></section>
  </div>
</template>

<script lang="ts">
import { seachinput } from "../../components/index";
import { defineComponent, reactive, provide, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "seachPage",
  components: {
    "seach-input": seachinput
  },
  setup() {
    const seachInfo = reactive({
      seachValue: ""
    });
    const store = useStore();
    provide("seachInfo", seachInfo); //父组件将值传给子组件（实现数据双向绑定）

    function oninput(result) {}
    function onSeach() {
      // console.log(seachInfo.seachValue);
      // console.log(store.state);
    }

    onMounted(() => {
      setTimeout(() => {
        seachInfo.seachValue = "异步改变输入框的值";
      }, 1000);
    });

    return {
      ...toRefs(seachInfo),
      oninput,
      onSeach
    };
  }
});
</script>

<style lang="less" scoped>
@import "./seachPage.less";
</style>