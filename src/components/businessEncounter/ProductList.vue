<template>
  <div class="product-list" @click="onClick">
    <div class="product-img">
      <img :src="imgSrc" alt />
    </div>
    <div class="product-des">{{productDes}}</div>
    <div class="product-price">￥{{productPrice}}</div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "productList",
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    productDes: {
      type: String,
      default: ""
    },
    productPrice: {
      type: String,
      default: ""
    }
  },
  setup(props, ctx) {
    function onClick() {
      ctx.emit("onClick", {});
    }
    return {
      onClick
    };
  }
});
</script>
<style lang='less' scoped>
.product-list {
  // border: 0.5px solid #eeeeee;
  break-inside: avoid; //列里面的项不折断
  width: 1.2rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 10px #eeeeee;
  padding: 10px;
  .product-img {
    display: flex;
    justify-content: center;
    img {
      width: 1.2rem;
    }
  }
  .product-des {
    text-align: center;
    color: #2c3e50;
    font-size: 0.12rem;
    margin-top: 0.15rem;
  }
  .product-price {
    text-align: center;
    color: red;
    font-size: 0.12rem;
  }
}
</style>