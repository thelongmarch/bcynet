
<template>
  <section class="idx-main">
    <div class="main">
      <!-- header -->
      <div class="haader">
        <Top />
      </div>
      <!-- body -->
      <div class="body-main">
       <div class="reg-main">

       </div>        
        </div>
    </div>
  </section>
</template>

<script>
import globalFun from "@/common/common";
import globalInterface from "@/service/interface";
import Top from "@/components/Top";

export default {
  components: {
    Top
  },
  data() {
    return {
      searchObj: {
        dictCode: "", //数据编码
        dictName: "", //数据名称/值
        businessType: "" //业务类型
      }
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

    init() {}
  },
  mounted() {}
};
</script>

<style  lang="less">
.idx-main {
  height: 100%;
  width: 100%;
  .main {
    height: 100%;
    width: 100%;
  }
  .body-main{
    padding-top: 60px;
    height: 100%;
  }
  .reg-main{
    height: 100%;
    width: 100%;
    background: url("../../assets/bg-login.png") repeat;
  }
}
</style>
