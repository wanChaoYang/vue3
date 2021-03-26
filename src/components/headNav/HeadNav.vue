/* 
顶部导航
  事件：
  rightEvent：触发右侧按钮
  backPage：触发返回按钮
 */

<template>
  <nav class="nav" :class="fixed">
    <div class="center-icon" @click="backPage">
      <span class="left-arrow"></span>
      <span class="left-back">{{leftBtntext}}</span>
    </div>
    <div class="nav-head">{{title}}</div>
    <div class="center-icon" @click="rightEvent">
      <span :class="rightIcon">{{rightBtnText}}</span>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "headNav",
  props: {
    fixed: {
      type: String,
      defult: "",
      des: "固定顶部定位传 fixed='fixed'"
    },
    rightIcon: {
      type: String,
      defult: "",
      des: "右边icon 传值share是分享图标 可在自己页面自定义图标"
    },
    rightBtnText: {
      type: String,
      defult: "",
      des: "右边按钮文字"
    },
    leftBtntext: {
      type: String,
      defult: "",
      des: "左边按钮文字"
    },
    title: {
      type: String,
      defult: "",
      des: "标题"
    }
  },
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();

    function backPage(): void {
      let token = store.state.userToken;
      // console.log(token);
      if (token) {
        //进取消息页面
        router.go(-1);
      } else {
        router.push("/Home");
      }
      ctx.emit("backPage", {});
    }
    function rightEvent(): void {
      ctx.emit("rightEvent", {});
    }

    return {
      backPage,
      rightEvent
    };
  }
});
</script>
<style lang="less" scoped>
.nav {
  padding-top: 0.15rem;
  //   border: 1px solid black;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.13rem;
  padding-left: 0.05rem;
  padding-right: 0.15rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  .back {
    .left-back {
      padding-left: 0.05rem;
      color: #666666;
    }
  }
  .nav-head {
    font-weight: 600;
    color: #666666;
  }
  .center-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
  }
  .share {
    background-image: url(../../assets/icon/share.png);
    background-repeat: no-repeat;
    height: 0.15rem;
    width: 0.15rem;
    background-size: 100%;
    display: inline-block;
  }
  .left-arrow {
    background-image: url(../../assets/icon/path.png);
    background-repeat: no-repeat;
    height: 0.24rem;
    width: 0.24rem;
    background-size: 100%;
    display: inline-block;
    transform: rotate(180deg);
  }
}
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
</style>