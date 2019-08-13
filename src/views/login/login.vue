
<template>
  <section class="idx-main">
    <div class="main">
      <!-- header -->
      <div class="haader">
        <Top />
      </div>
      <!-- body -->
      <div class="body-main">
        <div class="login-main">
          <div class="login-content">
            <img :src="loginImg" class="logo-login" alt="爱好者社区" />
            <el-form ref="form" :model="loginObj" label-width="0px" :rules="rules">
              <el-form-item label prop="phone">
                <el-input v-model="loginObj.phone" :placeholder="loginPlace.phone"></el-input>
              </el-form-item>
              <el-form-item
                label
                prop="password"
                v-if="loginStatus===2"
                :rules="[{required:true,validator:validatorPass,trigger:'change'}]"
              >
                <el-input v-model="loginObj.password" placeholder="您的密码"></el-input>
              </el-form-item>
              <el-form-item
                label
                prop="code"
                v-if="loginStatus===1"
                :rules="[{required:true,validator:validatorCode,trigger:'change'}]"
              >
                <el-input
                  v-model="loginObj.code"
                  placeholder="短信验证码"
                  ></el-input>
                <el-button
                  type="info"
                  :disabled="btnDisable"  
                  class="sms-spe"               
                  @click="getCode"
                  :class="!btnDisable?'sms-active':''"
                >点击获取</el-button>               
              </el-form-item>
            </el-form>
            <div class="login-check">
              <span
                class="login-select"
                @click="checkLoginFun(2)"
                v-if="loginStatus===1"
              >密码登录(手机号或者邮箱)</span>
              <span class="login-select" @click="checkLoginFun(1)" v-if="loginStatus===2">手机验证码登录</span>
              <span>忘记密码？</span>
            </div>
            <div class="login-footer">
              <el-button type="primary" @click="loginFun('form')">登录</el-button>
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
import loginImg from "@/assets/login-log.png";

export default {
  components: {
    Top
  },
  data() {
    return {
      loginObj: {
        phone: "",
        password: "",
        code: ""
      },
      loginImg: loginImg,
      loginStatus: 1, //1短信验证2密码
      loginPlace: {
        phone: "手机号",
        password: "短信验证码"
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
        ]
      }
    };
  },
  watch: {
    "loginObj.phone": {
      handler(newName, oldName) {        
        let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(reg.test(newName)){          
            this.btnDisable = false;
        }else{
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
    // add
    addPromise(params) {
      return this.$axios(globalInterface.addDict, params, "post", {
        ajaxType: "json"
      });
    },
    /* ***********切换******************************** */
    validatorCode(rule, value, callback) {
      if (!this.loginObj.code) {
        callback(new Error("验证码不能为空！"));
      }
    },
    validatorPass(rule, value, callback) {
      if (!this.loginObj.password) {
        callback(new Error("密码不能为空！"));
      }
    },
    /* ***********切换******************************** */
    checkLoginFun(key) {
      this.loginStatus = key;
      if (1 === key) {
        this.loginPlace = {
          phone: "手机号",
          password: "短信验证码"
        };
      } else {
        this.loginPlace = {
          phone: "手机号或邮箱",
          password: "您的密码"
        };
      }
    },
    /* ***********登录******************************** */
    loginFun(formName) {
      let _self = this;    
      this.$refs[formName].validate(valid => {
        if (valid) {
          _self.loginSureFun();
        }
      });
    },
    loginSureFun() {},
    async getCode() {
      let temp = {
        codeType: 3,
        nationCode: "",
        phone: this.loginObj.phone
      }
      let res = await this.getCodePromise(temp);
      debugger;
      if (res.success) {


//         data: null
// returnCode: "10106"
// returnMsg: "用户账号不存在"
// success: false
        this.$message({
          message: "新增成功",
          type: "success"
        });
     
      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }

    },
    /* ***********注册******************************** */
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
  .login-main {
    height: 100%;
    width: 100%;
    background: url("../../assets/bg-login.png") repeat;
    .login-content {
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
      .login-title {
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
      .login-footer {
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
      }
      .sms-active{
        border: 1px solid #ff6fa2;
        background-color: #ff6fa2;
        color: #fff;
      }
      .logo-login {
        display: block;
        width: 270px;
        height: 110px;
        margin: 40px auto 40px;
      }
      .login-check {
        display: flex;
        justify-content: space-between;
      }
      .login-select {
        cursor: pointer;
      }
      .login-select:hover {
        color: #ff6fa2;
      }
    }
  }
  .com-tip {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 3px;
    position: absolute;
  }
 
}
</style>
