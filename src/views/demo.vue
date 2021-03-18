<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" @sendMsg="handler" />
    <input-checked @onInput="onInput" :checked="true"></input-checked>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onUnmounted,
  onUpdated,
  onRenderTracked,
  onRenderTriggered
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { inputChecked } from "../components/index";
export default defineComponent({
  name: "Demo",
  components: {
    HelloWorld,
    "input-checked": inputChecked
  },
  setup() {
    onMounted(() => {
      console.log("onMounted");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    onRenderTracked(() => {
      //主要检查哪个依赖导致当前页面重新渲染
      console.log("onRenderTracked");
    });
    onRenderTriggered(() => {
      console.log("onRenderTriggered");
    });
    const handler = function(res) {
      console.log(res);
    };
    function onInput(res): void {
      console.log(res);
    }

    return { handler, onInput };
  }
});
</script>
