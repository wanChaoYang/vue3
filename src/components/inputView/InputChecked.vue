/** 复选框组件
    onClick： 选择的方法参数true||false
    checked： 选中状态值，默认false
    disabled：禁止可选， 默认fasle
*/
<template>
  <div class="ui-checkbox">
    <input
      type="checkbox"
      id="checked-input"
      @click="onClick"
      :checked="checked"
      :disabled="disabled"
    />
    <label for="checked-input"></label>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "inputChecked",
  props: {
    checked: {
      type: Boolean,
      defult: false
    },
    disabled: {
      type: Boolean,
      defult: false
    }
  },
  setup(props, ctx) {
    function onClick(e): void {
      ctx.emit("onInput", e.target.checked);
    }
    return { onClick };
  }
});
</script>
<style lang='less' scoped>
.ui-checkbox {
  position: relative;
  display: inline-block;
}

.ui-checkbox input {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 2px;
  margin-top: 7px;
  visibility: hidden;
}

/*未选择中的样式*/
.ui-checkbox input + label {
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  width: 15px;
  height: 15px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 10px;
}

/*选中的样式
*/
.ui-checkbox input:checked + label {
  background-color: blue;
  border: 1px solid blue;
}

/*选中后给lable添加一个伪类*/
.ui-checkbox input:checked + label::after {
  content: "✔";
  color: white;
  font-size: 12px;
  font-weight: 600;
  // width: 10px;
  // height: 10px;
  // content: '';
  // border: 1px solid black;
}
</style>