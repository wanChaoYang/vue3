<template>
  <div class="input-seach">
    <div class="input-left" @click="clickInput">
      <div v-if="backArrow" class="icon-left" @click="backPage">
        <img :src="getImg('path')" alt />
      </div>
      <input
        type="text"
        v-model="serchInfo.seachValue"
        @input="oninput"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
    <div class="input-btn" @click="onSeach">{{rightText}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, watch, ref, inject } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SeachInput",
  props: {
    backArrow: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请输入搜索关键字"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rightText: {
      type: String,
      default: "搜索"
    }
  },
  setup(props, ctx) {
    const router = useRouter(); //实例化路由
    let serchInfo = inject("seachInfo"); //接受父组件传入的值（实现父子组件数据双向绑定）
    //将子组件的值传给父组件
    function oninput($event): void {
      ctx.emit("oninput", $event.target.value);
    }

    //点击搜索按钮
    function onSeach() {
      ctx.emit("onSeach", {});
    }

    //左上角返回
    function backPage(e) {
      e.stopPropagation();
      router.go(-1);
      ctx.emit("backPage", {});
    }

    //返回<图片按钮
    function getImg(img): string {
      return require(`../../assets/icon/${img}.png`);
    }

    //点击输入框
    function clickInput(e) {
      e.stopPropagation();
      ctx.emit("clickInput", {});
    }

    return {
      serchInfo,
      oninput,
      getImg,
      onSeach,
      backPage,
      clickInput
    };
  }
});
</script>
<style lang='less' scoped>
.input-seach {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.16rem;
  //   width: 100%;
  //   height: 0.65rem;
  .input-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.13rem;
    width: 85%;
    // border: 1px solid black;
    .icon-left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        transform: rotate(180deg);
        width: 0.25rem;
      }
    }
    input {
      outline: none;
      display: inline-block;
      width: 100%;
      background-color: #eee;
      border: 0;
      resize: none;
      height: 0.1rem;
      border-radius: 0.05rem;
      padding: 10px;
      color: #323233;
    }
  }
  .input-btn {
    font-size: 0.13rem;
    padding-left: 0.1rem;
    color: #323233;
  }
}
</style>