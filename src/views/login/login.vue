
<template>
  <section class="idx-main">
   <div class="main">
     <!-- header -->
     <div class="haader">
       <Top/>
     </div>
     <!-- body -->
     <div class="body-main">
      <div class="login-main">
           <div class="login-content">
            <img :src="loginImg" class="logo-login" alt="爱好者社区">
            <el-form ref="form" :model="loginObj" label-width="0px">
              <el-form-item label>
                <el-input v-model="loginObj.phone" :placeholder="loginPlace.phone"></el-input>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="loginObj.ems" :placeholder="loginPlace.password"></el-input>
                <input type="button" value="点击获取" class="sms-spe" v-if="loginStatus===1"/>
              </el-form-item>
            </el-form>
            <div class="login-check">
              <span class="login-select" @click="checkLoginFun(2)" v-if="loginStatus===1">密码登录(手机号或者邮箱)</span>
              <span class="login-select" @click="checkLoginFun(1)" v-if="loginStatus===2">手机验证码登录</span>
              <span>忘记密码？</span>
            </div>
            <div class="login-footer">
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
import loginImg from "@/assets/login-log.png";


export default {
  components: {
    Top
  },
  data() {
    return {
     loginObj: {
        phone: "",
        ems: ""
      },
      loginImg:loginImg,
      loginStatus:1,
      loginPlace:{
        phone:'手机号',
        password:'短信验证码'
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
    checkLoginFun(key){
      this.loginStatus = key;
      if(1===key){
        this.loginPlace = {
          phone:'手机号',
          password:'短信验证码'
        }
      }else{
        this.loginPlace = {
          phone:'手机号或邮箱',
          password:'您的密码'
        }
      }
    },
    init() {
     
    }
  },
  mounted() {
    
  }
};
</script>

<style  lang="less">
.idx-main{
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
  .login-main{
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
        border-radius: 4px;
        z-index: 3;
        cursor: text;
        border: 1px solid #bdbdbd;
        background-color: #bdbdbd;
        color: #fff;
      }
      .logo-login{
        display: block;
        width: 270px;
        height: 110px;
        margin: 40px auto 40px;
      }
      .login-check{
        display: flex;
        justify-content: space-between;
      }
      .login-select{        
        cursor: pointer;
      }
      .login-select:hover{
         color: #ff6fa2;
      }
    }
  }
}
</style>
