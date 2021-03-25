<template>
  <div class="about">
    <head-nav title="登录"></head-nav>
    <section>
      <div>
        <p>亲，欢迎登录</p>
        <p>
          没有账户？
          <span>立即注册</span>
        </p>
      </div>
      <van-form>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="loginIn">登录</van-button>
        </div>
      </van-form>
    </section>
  </div>
</template>
<script lang="ts">
import { Form } from "vant";
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { headNav } from "../../components/index";
import { login } from "../../api/apiURL";
export default defineComponent({
  components: {
    "head-nav": headNav
  },
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const userInfo = reactive({
      username: "",
      password: ""
    });

    async function loginIn() {
      let data: any = await login(userInfo.username);
      store.commit("LOGIN_IN", data.token);
      router.go(-1);
    }
    return {
      loginIn,
      ...toRefs(userInfo)
    };
  }
});
</script>
<style lang="less" scoped>
@import "./index.less";
.van-button--info {
  color: #fff;
  background-color: #1989fa;
  border: 1px solid #1989fa;
}
</style>

