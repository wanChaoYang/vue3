<template>
  <div class="input-seach">
    <div class="input-left" @click="clickInput">
      <div v-if="backArrow" class="icon-left" @click="backPage">
        <img :src="getImg('path')" alt />
      </div>
      <input
        type="text"
        v-model="values"
        @input="oninput"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
    <div class="input-btn" @click="onSeach">{{rightText}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, watch, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SeachInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
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
    const router = useRouter();
    let values = ref("");
    function oninput($event): void {
      ctx.emit("change", $event.target.value);
    }
    function onSeach() {
      ctx.emit("onSeach", {});
    }
    //左上角返回
    function backPage(e) {
      e.stopPropagation();
      router.go(-1);
      ctx.emit("backPage", {});
    }
    //搜索按钮
    function getImg(img): string {
      return require(`../../assets/icon/${img}.png`);
    }
    function clickInput(e) {
      e.stopPropagation();
      ctx.emit("clickInput", {});
    }
    onMounted(() => {
      //   console.log(typeof props.value);
      /**
       * 设置默认值
       * 此处还需要探索TypeScript,不知道哪里的类型没有定义正确导致这里需要定义一次类型为any才不报错
       */
      let propVal: any = props.value;
      values.value = propVal;
    });

    watch([values], (newVal, oldVal) => {
      console.log(newVal);
    });

    /*  watch(
      () => {
        return state.values;
      },
      (newVal, oldVal) => {
        let propVal: any = newVal;
        state.values = propVal;
      }
    ); */

    return {
      values,
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