<template>
  <div id="home ">
    <header class="border-b-eee">
      <div class="bg-fff head">
        <seach-input
          :backArrow="false"
          placeholder="搜索"
          :rightText="!token?'登录':''"
          :disabled="true"
          @change="oninput"
          @clickInput="clickInput"
          @onSeach="onSeach"
          :value="state.seachValue"
        ></seach-input>
      </div>
    </header>
    <section>
      <div class="home-swiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in state.imgList" :key="index">
            <img :src="item" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="flex-dom flex-around flex-wrap p-both15r m-t-15">
        <div
          class="menueList flex-dom flex-column flex-center m-b-15"
          v-for="(item,index) in menueData.menueList"
          :key="index"
          @click="menueClick(item.path)"
        >
          <div class="flex-dom flex-center">
            <img :src="item.img" alt />
          </div>
          <div class="font12r text-center color-e p-t-10">{{item.name}}</div>
        </div>
      </div>
    </section>
    <footer>
      <van-tabs v-model="productData.active" @click="handler">
        <van-tab title="精选商品">
          <div class="p-both20 column">
            <div class="p-t-15" v-for="(item,index) in productData.productList">
              <product-list
                :key="index"
                :imgSrc="item.imgSrc"
                :productDes="item.productDes"
                :productPrice="item.price"
                @onClick="productClick(item)"
              ></product-list>
            </div>
          </div>
        </van-tab>
        <van-tab title="进口商品">
          <div class="text-center m-t-15">敬请期待</div>
        </van-tab>
        <van-tab title="实惠">
          <div class="text-center m-t-15">敬请期待</div>
        </van-tab>
      </van-tabs>
    </footer>
  </div>
</template>
<script lang="ts">
declare function require(string): string;
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
  provide,
  toRefs
} from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
import { seachinput, productList } from "../../components/index";
export default defineComponent({
  name: "Home",
  components: {
    "seach-input": seachinput,
    "product-list": productList
  },
  setup() {
    const rotuer = useRouter();
    const store = useStore();
    const { menueClick, menueData } = menueList();
    const { productData, productClick, handler } = productListFun();
    const state = reactive({
      seachValue: "",
      imgList: [
        "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner1.png",
        "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate40.png",
        "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner2.png"
      ]
    });

    provide("seachInfo", state);
    let token = computed(() => {
      return store.state.userToken;
    });
    //跳转搜素页
    function clickInput(): void {
      rotuer.push("/seachPage");
    }

    function onSeach(): void {
      if (token && typeof token == "object") {
        //进取消息页面
        rotuer.push("/Login");
      } else {
        Toast.fail("敬请期待");
      }
    }

    onMounted(() => {});
    return {
      oninput,
      state,
      clickInput,
      onSeach,
      menueClick,
      menueData,
      productData,
      productClick,
      handler,
      token
    };
  }
});

//菜单部分的逻辑
const menueList = function() {
  const menueData = reactive({
    menueList: [
      {
        img: require("../../assets/icon/record_type2.png"),
        name: "超市",
        path: ""
      },
      {
        img: require("../../assets/icon/record_type3.png"),
        name: "数码电器",
        path: ""
      },
      {
        img: require("../../assets/icon/record_type4.png"),
        name: "水果",
        path: ""
      },
      {
        img: require("../../assets/icon/record_type5.png"),
        name: "服饰",
        path: ""
      },
      {
        img: require("../../assets/icon/record_type6.png"),
        name: "生活服务",
        path: ""
      },
      {
        img: require("../../assets/icon/head.png"),
        name: "会员",
        path: ""
      },
      {
        img: require("../../assets/icon/record_type1.png"),
        name: "折扣",
        path: ""
      },
      {
        img: require("../../assets/icon/record_type3.png"),
        name: "今日爆款",
        path: ""
      },
      {
        img: require("../../assets/icon/education_icon.png"),
        name: "海鲜",
        path: ""
      },
      {
        img: require("../../assets/icon/addupdate.png"),
        name: "更多",
        path: ""
      }
    ]
  });
  function menueClick(path) {
    if (!path) {
      Toast.fail("敬请期待");
      return;
    }
  }
  return {
    menueClick,
    menueData
  };
};

// 商品列表
const productListFun = function() {
  const productData = reactive({
    active: 1,
    productList: [
      {
        imgSrc:
          "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png",
        productDes: "HUAWEI Mate 40 Pro+ 5G 全网通 12G...",
        price: "1200"
      },
      {
        imgSrc:
          "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png",
        productDes: "HUAWEI Mate 40 ",
        price: "1200"
      },
      {
        imgSrc:
          "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png",
        productDes: "HUAWEI Mate 4",
        price: "1200"
      },
      {
        imgSrc:
          "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png",
        productDes: "HUAWEI",
        price: "1200"
      }
    ]
  });
  function productClick(result) {
    console.log(result);
  }
  function handler(result) {
    console.log(result);
  }
  return {
    productData,
    productClick,
    handler
  };
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>