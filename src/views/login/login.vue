
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
            <div  v-show="loginStatus===1">
                <el-form ref="loginSms" :model="loginObj" label-width="0px" :rules="rules">
              <el-form-item label prop="phone">
                <el-input v-model="loginObj.phone" placeholder="手机号"></el-input>
              </el-form-item> 
              <el-form-item
                label
                prop="code"   
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
                  v-if="btnShow"
                >点击获取</el-button>   
                 <div class="second-spe" v-if="!btnShow">{{secNum}}s</div>              
              </el-form-item>
            </el-form>
            </div>

            <div  v-show="loginStatus===2">
                <el-form ref="loginPass" :model="loginObj" label-width="0px" :rules="rulesPassword">
              <el-form-item label prop="phone">
                <el-input v-model="loginObj.phone" placeholder="手机号"></el-input>
              </el-form-item>            
              <el-form-item
                label
                prop="password"   
              >
                <el-input v-model="loginObj.password" placeholder="您的密码" show-password></el-input>
              </el-form-item>            
            </el-form>
            </div>          
            <div class="login-check">
              <span  class="login-select"  @click="checkLoginFun(2)" v-if="loginStatus===1">密码登录</span>
              <span class="login-select" @click="checkLoginFun(1)" v-if="loginStatus===2">手机验证码登录</span>
              <!-- <span @click="forgetPs">忘记密码？</span> -->
            </div>
            <div class="login-footer">
              <el-button type="primary" @click="loginFun">登录</el-button>
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
import store from '../../store'
import $axios from 'axios'

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
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空！",
            trigger: "change"
          }         
        ],

      },
      rulesPassword: {
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
        password: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "change"
          }         
        ],

      },
      btnShow:true,//获取验证码
      secNum:'',//秒
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
    // login
    loginPromise(params) {
      return this.$axios(globalInterface.login, params, "post", {
        ajaxType: "json"
      });
    },       
    /* ***********切换******************************** */
    checkLoginFun(key) {
      this.loginStatus = key;      
    },
    forgetPs(){
       this.$message({
          message: '暂未开放',
          type: "warning"
        });
    },
    /* ***********登录******************************** */
    loginFun() {

      let formName = this.loginStatus===1?'loginSms':'loginPass';      
      let _self = this;
      this.$refs[formName].validate(valid => {        
        if (valid) {
          _self.loginSureFun();
        }
      });
    },
    async loginSureFun() {      
      //loginType (integer, optional): 登录方式 1：密码登录，2，验证码登录            
      let temp = {
        loginType: '',
        password: "",
        phone: "",
        phoneCode: ""
      }
      //1 手机验证码登录
      if(this.loginStatus===1){
        temp = {
          loginType: 2,
          password: "",
          phone: this.loginObj.phone,
          phoneCode: this.loginObj.code
        }
      }else{
         temp = {
          loginType: 1,
          password: this.loginObj.password,
          phone: this.loginObj.phone,
          phoneCode: ""
        }
      }

      let res = await this.loginPromise(temp);  
      if (res.success) {
        this.$message({
          message: "登录成功！",
          type: "success"
        });
        let data = res.data;
        if(data){
          this.$store.commit('set_token', {Authorization: data.token});      
          // 将token存储到本地
          localStorage.setItem('Authorization', data.token);
          localStorage.setItem('phone', data.phone);
        }
      
         // 路由跳转
         let _self = this;
         setTimeout(() => {
           _self.$router.push({name: 'loginIndex'})
         }, 2000);
        
     
      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }
    },
    /* ***********获取验登录证码**************************** */
    async getCode() {
      //codeType (integer): 验证码类型：1注册 2忘记密码 3登录校验手机号 4修改登录密码 5修改手机号 ,
      let temp = {
        codeType: 3,
        nationCode: "",
        phone: this.loginObj.phone
      }
      let res = await this.getCodePromise(temp);    
      if (res.success) {
        this.btnShow = false;
        this.secNum = 60;
        let tempInter = setInterval(()=>{
          this.secNum--;
          if(this.secNum<1){
            this.btnShow = true;
            tempInter = '';
          }

        },1000)
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
    /* ***********init******************************** */
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
    background: url("~@/assets/bg-login.png") repeat;
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
