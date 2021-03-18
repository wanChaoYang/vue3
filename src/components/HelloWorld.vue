<template>
  <div>
    <div>{{msg}}</div>
    <div class="m-t-5">
      <div>1.加法运算</div>
      <input type="text" v-model="state.num1" @keyup="add()" />
      <span>+</span>
      <input type="text" v-model="state.num2" @keyup="add()" />
      <span>{{state.result}}</span>
    </div>

    <div class="m-t-5">
      <div>2.vue3中的列表渲染即过滤</div>
      <ul>
        <li
          v-for="(item,index) in state1.stu"
          :key="index"
          @click="onClick(index)"
        >{{item.name}}---{{item.age}}</li>
      </ul>
    </div>

    <div class="m-t-5">
      <div>3.vue3中computed的使用</div>
      <input type="text" v-model="state2.num1" />
      <span>+</span>
      <input type="text" v-model="state2.num2" />
      <span>{{state2.result}}</span>
    </div>

    <div class="m-t-5">
      <div>4.子组件向父组件传承参</div>
      <button @click="clickEvent">点击我传参</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, ctx) {
    let { state, add } = addFun(); //结构出来
    let { state1, onClick } = listRender();
    let { state2 } = handComputed();
    function clickEvent() {
      ctx.emit("sendMsg", "我是传过来的参数");
    }
    return {
      state,
      add,
      state1,
      onClick,
      state2,
      clickEvent
    };
  }
});

//加法运算
const addFun = function() {
  const state = reactive({
    num1: 0,
    num2: 0,
    result: 0
  });
  function add() {
    state.result = Number(state.num1) + Number(state.num2);
    console.log(state.result);
  }
  return { state, add };
};

//数组渲染,点击谁谁消失
const listRender = function() {
  const state1 = reactive({
    stu: [
      { id: "1", name: "肖战", age: "10" },
      { id: "1", name: "刘备", age: "11" },
      { id: "1", name: "张飞", age: "12" },
      { id: "1", name: "关羽", age: "13" }
    ]
  });
  function onClick(index) {
    state1.stu = state1.stu.filter((stu, idx) => idx != index);
  }
  return { state1, onClick };
};

//利用computed做的计算器
const handComputed = function() {
  let state2 = reactive({
    num1: 0,
    num2: 0,
    result: computed(() => Number(state2.num1) + Number(state2.num2))
  });
  return { state2 };
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.m-t-5 {
  margin-top: 5px;
}
</style>
