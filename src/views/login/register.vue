
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
            <el-form ref="form" :model="regObj" label-width="0px" :rules="rules">
              <el-form-item label prop="phone">
                <el-input v-model="regObj.phone" placeholder="您的手机号码"></el-input>
              </el-form-item>
              <el-form-item label prop="code">
                <el-input v-model="regObj.code" placeholder="短信验证码"></el-input>
                <el-button
                  type="info"
                  :disabled="btnDisable"
                  class="sms-spe"
                  @click="getCode"
                  :class="!btnDisable?'sms-active':''"
                  v-if="btnShow"
                >点击获取</el-button>
                <div class="second-spe" v-if="!btnShow">{{secNum}}s</div>
              </el-form-item>
              <el-form-item label prop="email">
                <el-input v-model="regObj.email" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item label prop="password1">
                <el-input v-model="regObj.password1" placeholder="密码" show-password></el-input>
              </el-form-item>
              <el-form-item label prop="password2">
                <el-input v-model="regObj.password2" placeholder="确认密码" show-password></el-input>
              </el-form-item>
            </el-form>
            <div class="reg-read">
              <input type="checkbox" checked disabled />
              <span>我已经阅读并同意《隐私政策》</span>
            </div>
            <div class="reg-footer">
              <el-button type="primary" @click="registFun('form')">创建账号</el-button>
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
        email: "",
        password1: "",
        password2: "",
        code: ""
      },
      btnDisable: true, //默认禁用
      rules: {
        phone: [
          {
            required: true,
            message: "手机号不能为空!",
            trigger: "change"
          },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
            message: "请输入正确的手机号!"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空!",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空!",
            trigger: "change"
          },
          {
            pattern: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
            message: "请输入正确的邮箱!"
          }
        ],
        password1: [
          {
            required: true,
            message: "密码不能为空!",
            trigger: "change"
          }
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空!",
            trigger: "change"
          }
        ]
      },
      btnShow: true, //获取验证码
      secNum: "" //秒
    };
  },
  watch: {
    "regObj.phone": {
      handler(newName, oldName) {
        let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (reg.test(newName)) {
          this.btnDisable = false;
        } else {
          this.btnDisable = true;
        }
      },
      immediate: true
      // deep: true
    }
  },
  created() {},
  methods: {
    /* *************promise****************************** */
    // 获取code
    getCodePromise(params) {
      return this.$axios(globalInterface.getPhoneCode, params, "post", {
        ajaxType: "json"
      });
    },
    // 注册
    registPromise(params) {
      return this.$axios(globalInterface.regist, params, "post", {
        ajaxType: "json"
      });
    },
    /* ***********获取code******************************** */
    async getCode() {
      //codeType (integer): 验证码类型：1注册 2忘记密码 3登录校验手机号 4修改登录密码 5修改手机号 ,
      let temp = {
        codeType: 1,
        nationCode: "",
        phone: this.regObj.phone
      };
      let res = await this.getCodePromise(temp);     
      if (res.success) {
        this.btnShow = false;
        this.secNum = 60;
        let tempInter = setInterval(() => {
          this.secNum--;
          if (this.secNum < 1) {
            this.btnShow = true;
            tempInter = "";
          }
        }, 1000);
        this.$message({
          message: "验证码已发送！",
          type: "success"
        });
      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }
    },
    /* ****************注册*************************************** */
    registFun(formName) {
      let _self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_self.regObj.password1 === _self.regObj.password2) {
            _self.registSureFun();
          } else {
            this.$message({
              message: "请确认两次输入的密码一致！",
              type: "warning"
            });
          }
        }
      });
    },
    async registSureFun() {
      let temp = {
        avatar: "",
        email: this.regObj.email,
        loginPwd: this.regObj.password1,
        phone: this.regObj.phone,
        phoneCode: this.regObj.code,
        realName: "",
        sex: 0,
        username: ""
      };
      let res = await this.registPromise(temp);
      if (res.success) {
        this.$message({
          message: res.returnMsg,
          type: "success"
        });

        // 路由跳转
        let _self = this;
        setTimeout(() => {
          _self.$router.push({ name: "login" });
        }, 2000);
      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }
    },
    /* ******************init********************************** */
    init() {}
  },
  mounted() {}
};
</script>

<style scoped lang="less">
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
      }
      .second-spe {
        position: absolute;
        top: 7px;
        right: 7px;
        height: 30px;
        width: 72px;
        padding: 0;
        text-align: center;
        line-height: 30px;
        cursor: text;
        border: 1px solid #bdbdbd;
        background-color: #bdbdbd;
        color: #fff;
        border-radius: 4px;
      }
      .sms-active {
        border: 1px solid #ff6fa2;
        background-color: #ff6fa2;
        color: #fff;
      }
    }
  }
}
</style>
