
<template>
  <section class="idx-main">
    <div class="main">
      <!-- header -->
      <div class="header-spe">
        <loginTop />
      </div>
      <!-- body -->
      <div class="publish-main">
        <div class="pub-main">
          <!-- head -->
          <div class="pub-head">
            <p class="head-title">发布图片</p>
          </div>
          <!-- 图片 -->
          <div class="pub-content">
            <el-form
              :model="oneRuleForm"
              :rules="rules"
              ref="oneRuleForm"
              class="demo-ruleForm add-activity"
            >
              <el-form-item label="图片描述：" prop="picDesc" label-width="120px">
                <el-input placeholder="请输入图片描述" :maxlength="20" v-model="oneRuleForm.picDesc"></el-input>
              </el-form-item>
              <el-form-item label="图片主题：" prop="title" label-width="120px">
                <el-input placeholder="请输入图片主题" :maxlength="20" v-model="oneRuleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="" prop="imgUrl" label-width="140px">
                <div class="upload-img">
                  <el-upload
                    class="img-uploader"
                    ref="sbUpload"
                    action="/snsmp-admin/admin/common/uploadActivityImage.do"
                    :data="{type:'4',actType:'MT002'}"
                    name="imageData"
                    :before-upload="tipBeforeShareUpload"
                    :show-file-list="false"
                    :on-success="tipHandleRedChild"
                    :multiple="false"
                  >
                    <div class="img-wrap img-line" >
                      <img :src="oneRuleForm.imgUrl" alt class="img_url" v-if="!!oneRuleForm.imgUrl" /> 
                      <i class="el-icon-plus avatar-uploader-icon" v-if="!oneRuleForm.imgUrl"></i>
                      <p v-if="!oneRuleForm.imgUrl">点击添加图片</p>
                    </div>  
                  </el-upload>
                   <div class="el-upload__tip img-up"
                    >图片大小不超过20M，格式为jpg、png、jpeg</div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="pub-btn"></div>
        </div>
      </div>
      <!-- footer -->
      <div class="footer-main"></div>
    </div>
  </section>
</template>

<script>
import globalFun from "@/common/common";
import globalInterface from "@/service/interface";
import loginTop from "@/components/loginTop";
import download from "@/assets/download.png";
// require styles

export default {
  components: {
    loginTop
  },
  data() {
    return {      
      oneRuleForm: {        
        imgUrl: "",//图片Url
        title: "",//图片主题
        picDesc: ""//图片描述
      },
      rules:{}
     
    };
  },
  created() {},
  //定义这个sweiper对象
  computed: {},
  methods: {
    /* *************promise****************************** */

    /* ***********字典项页面end******************************** */
    tipBeforeShareUpload(){

    },
    tipHandleRedChild(){

    },

    init() {}
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.idx-main {
  height: 100%;
  width: 100%;
}
.main {
  height: 100%;
  padding-top: 70px;
}
.header-spe {
  z-index: 101;
  position: fixed;
  top: 0;
}
.publish-main {
  width: 730px; 
  border: 1px solid;
  box-sizing: border-box;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.1);
  background-color: white;
  border-radius: 4px;
  margin: 0 auto;  
}

/* 登录 */
.login-wrapper {
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  .login-content {
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    .login-title {
      font-size: 16px;
      line-height: 1;
      color: #333;
      margin-bottom: 20px;
    }
    .el-input__inner:focus {
      border-color: #ff6fa2;
      outline: 0;
    }
    .el-input {
      height: 32px;
      input {
        height: 32px;
      }
    }
    .login-footer {
      .el-button--primary {
        width: 100%;
        height: 32px;
        background-color: #ff6fa2;
        color: white;
        border-color: #ff6fa2;
      }
      .el-button--primary:hover {
        background-color: #ff4081;
        border-color: #ff4081;
      }
    }
    .login-reg {
      text-align: right;
    }
    .sms-spe {
      position: absolute;
      top: 7px;
      right: 7px;
      height: 24px;
      width: 68px;
      padding: 0;
      text-align: center;
      border-radius: 4px;
      z-index: 3;
      cursor: text;
      border: 1px solid #bdbdbd;
      background-color: #bdbdbd;
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
      margin-bottom: 20px;
      color: #366cd9;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
/* hot */
.c-hotTags {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 15px;
  .head {
    line-height: 16px;
    overflow: hidden;
    margin-bottom: 4px;
    .name {
      float: left;
      font-size: 16px;
      color: #333;
    }
    .change {
      float: right;
      font-size: 12px;
      color: #ff6fa2;
      cursor: pointer;
    }
  }
}
/* download */
.download-banner {
  border-radius: 6px;
  font-size: 0;
  overflow: hidden;
  margin-top: 15px;
}
//pub
.pub-main{
  .pub-head{
    .head-title{
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #EBECED;
        padding-left: 20px;
        font-size: 18px;
        line-height: 50px;
        color: #333;
        font-weight: bold;            
    }

  }
   .upload-img .img-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .upload-img .img-uploader:hover {
    border-color: #409EFF;
  }
  .img-wrap{

  }
}
</style>
