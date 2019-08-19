
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
              <el-form-item label prop="imgUrl" label-width="140px">
                <div class="upload-img">
                  <el-upload
                    class="img-uploader"
                    ref="sbUpload"
                    action="/xbg/common/upload"
                    :headers="headers"
                    :data="{picNum:1}"
                    name="file"
                    :before-upload="tipBeforeShareUpload"
                    :show-file-list="false"
                    :on-success="tipHandleRedChild"
                    :multiple="false"
                  >
                    <div class="img-wrap">
                      <img
                        :src="oneRuleForm.imgUrl"
                        alt
                        class="img_url"
                        v-if="!!oneRuleForm.imgUrl"
                      />
                      <i class="el-icon-plus avatar-uploader-icon" v-if="!oneRuleForm.imgUrl"></i>
                      <p v-if="!oneRuleForm.imgUrl">点击添加图片</p>
                    </div>
                  </el-upload>
                  <div class="el-upload__tip img-up">图片大小不超过20M，格式为jpg、png、jpeg</div>
                </div>
              </el-form-item>
              <el-form-item label="图片描述：" prop="picDesc" label-width="120px" class="input-spe">
                <el-input placeholder="请输入图片描述" :maxlength="20" v-model="oneRuleForm.picDesc"></el-input>
              </el-form-item>
              <el-form-item label="图片主题：" prop="title" label-width="120px" class="input-spe">
                <el-input placeholder="请输入图片主题" :maxlength="20" v-model="oneRuleForm.title"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="pub-btn">
          <el-button type="danger" @click="publishFun('oneRuleForm')">提交发布</el-button>
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
import download2 from "@/assets/download2.png";
import store from "../../store";
import $axios from 'axios'
// require styles

export default {
  components: {
    loginTop
  },
  data() {
    return {
      oneRuleForm: {
        imgUrl: "", //图片Url
        title: "", //图片主题
        picDesc: "" //图片描述
      },
      rules: {}
    };
  },
  created() {},
  //定义这个sweiper对象
  computed: {
    headers() {
      return {
        "auth-token": localStorage.getItem("Authorization")
      };
    }
  },
  methods: {
    /* *************promise****************************** */
    // publishImg
    publishPromise(params) {
      return this.$axios(globalInterface.publishImg, params, "post", {
        ajaxType: "json"
      });
    },
    /* ***********上传******************************** */
    tipBeforeShareUpload(file) {
      return this.checkImgSize(file, 20480);
    },
    checkImgSize(file, imgSize) {
      let that = this;
      let promise = new Promise(async function(resolve, reject) {
        const isJPG =
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg";
        const isLt2M = file.size / 1024 < imgSize;
        let sizeToast;
        if (file.size / 1024 >= 1024) {
          sizeToast = imgSize / 1024 + "M";
        } else {
          sizeToast = imgSize + "kb";
        }
        if (!isJPG) {
          that.$message.error("上传图片只能是JPG/PNG/JPEG格式!");
        }
        if (!isLt2M) {
          that.$message.error("上传图片大小不能超过 " + sizeToast + "!");
        }
        if (!(isJPG && isLt2M)) {
          try {
            throw new Error("图片不符合规则!");
          } catch (e) {
            reject(false);
          }
        }
        resolve(isJPG && isLt2M);
      });
      return promise;
    },
    tipHandleRedChild(response, file, fileList) {     
      if(response.success){
        this.oneRuleForm.imgUrl = response.data;
      }else{
         this.$message({
          message: response.returnMsg,
          type: "warning"
        });
      }
    },
    /* ***********发布******************************** */
    publishFun(formName) {
      let _self = this;
       this.$refs[formName].validate(async (valid) => {
            if (valid) {
             _self.publishSureFun();
            }
          });
    },
    async publishSureFun() {      
      let temp =[
          {
            category:'',
            imgUrl:this.oneRuleForm.imgUrl,
            picDesc:this.oneRuleForm.picDesc,
            title:this.oneRuleForm.title

          }
        ];
      let baseUrl = process.env.NODE_ENV === 'production' ? productionUrl : '';      
      let asyncBody = await $axios({
          method: 'post',
          baseURL: baseUrl + '/',
          url: globalInterface.publishImg,
          headers: {'auth-token': localStorage.getItem("Authorization")},
          data: temp
        })
      let res = asyncBody.data;   
      if (res.success) {
        this.$message({
          message: "发布成功！",
          type: "success"
        });
        this.$router.push("/loginIndex");
       

      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }
   
    },
    /* ***********init******************************** */
    init() {
      console.log(this.headers);
    }
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
.publish-main {
  width: 730px;
  margin: 0 auto;
}
.pub-main {
  box-sizing: border-box;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 4px;

  .pub-head {
    .head-title {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ebeced;
      padding-left: 20px;
      font-size: 18px;
      line-height: 50px;
      color: #333;
      font-weight: bold;
    }
  }
  .pub-content {
    padding-bottom: 50px;
  }
  .upload-img {
    .img-uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      width: 178px;
      height: 178px;
    }
  }
  .upload-img .img-uploader:hover {
    border-color: #409eff;
  }
  .img-wrap {
    width: 178px;
    height: 178px;
    position: relative;
    .avatar-uploader-icon {
      display: inline-block;
      margin-top: 62px;
      font-size: 28px;
    }
    .img_url {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-height: 178px;
      max-width: 178px;
    }
  }
  .input-spe {
    .el-input {
      width: 300px;
    }
  }
}
.pub-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
