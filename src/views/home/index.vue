
<template>
  <section class="idx-main">
    <div class="main">
      <!-- header -->
      <div class="haader">
        <Top />
      </div>
      <!-- body -->
      <div class="page-main">
        <div class="left-main">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="right-main"></div>
      </div>
      <!-- footer -->
      <div class="footer-main"></div>
    </div>
  </section>
</template>

<script>
import globalFun from "@/common/common";
import globalInterface from "@/service/interface";
import Top from "@/components/Top";
// require styles
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    Top,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  created() {},
  methods: {
    /* *************promise****************************** */
    /* *************字典管理****************************** */
    // table
    tablePromise(params) {
      return this.$axios(globalInterface.selectPageDictList, params, "post", {
        ajaxType: "json"
      });
    },
    // add
    addPromise(params) {
      return this.$axios(globalInterface.addDict, params, "post", {
        ajaxType: "json"
      });
    },
    /* ***********字典项页面end******************************** */

    init() {
      setInterval(() => {
        console.log("simulate async data");
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1);
        }
      }, 3000);
    }
  },
  mounted() {}
};
</script>

<style  lang="less">
.idx-main {
  height: 100%;
  width: 100%;
}
.main {
  overflow: hidden;
  height: 100%;
}
.page-main {
  width: 1200px;
  margin: 70px auto 0;
  height: 100%;
}

.left-main {
  height: 200px;
}
.swiper-container {
    width: 600px;
    height: 300px;
}  
</style>
