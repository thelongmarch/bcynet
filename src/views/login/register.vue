
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
          <!-- body -->
          <div class="reg-content">
            <h1 class="reg-title">现在就加入</h1>
            <el-form ref="form" :model="regObj" label-width="0px">
              <el-form-item label>
                <el-input v-model="regObj.phone" placeholder="您的手机号码"></el-input>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="regObj.ems" placeholder="短信验证码"></el-input>
                <input type="button" value="点击获取" class="sms-spe" />
              </el-form-item>
            </el-form>
            <div class="reg-read">
              <input type="checkbox" name id />
              <span>我已经阅读并同意《隐私政策》</span>
            </div>
            <div class="reg-footer">
              <el-button type="primary">创建账号</el-button>
            </div>
          </div>
          
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
      regObj: {
        phone: "",
        ems: ""
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
  .body-main {
    padding-top: 60px;
    height: 100%;
  }
  .reg-main {
    height: 100%;
    width: 100%;
    background: url("../../assets/bg-login.png") repeat;
    .reg-content {
      padding: 40px;
      box-sizing: border-box;
      position: absolute;
      width: 480px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
      background-color: white;
      border-radius: 4px;
      .reg-title {
        margin-bottom: 30px;
      }
      .el-input__inner:focus {
        border-color: #ff6fa2;
        outline: 0;
      }
      .el-input {
        height: 44px;
        input {
          height: 44px;
        }
      }
      .reg-footer {
        margin-top: 30px;
        .el-button--primary {
          width: 100%;
          height: 44px;
          background-color: #ff6fa2;
          color: white;
          border-color: #ff6fa2;
        }
        .el-button--primary:hover {
          background-color: #ff4081;
          border-color: #ff4081;
        }
      }
      .sms-spe {
        position: absolute;
        top: 7px;
        right: 7px;
        height: 30px;
        width: 72px;
        padding: 0;
        text-align: center;
        border-radius: 4px;
        z-index: 3;
        cursor: text;
        border: 1px solid #bdbdbd;
        background-color: #bdbdbd;
        color: #fff;
      }
    }
  }
}
</style>
