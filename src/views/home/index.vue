
<template>
  <section class="idx-main">
    <div class="main">
      <!-- header -->
      <div class="header-spe">
        <Top />
      </div>
      <!-- body -->
      <div class="page-main">
        <div class="left-main">
          <div class="swiper-main">
            <swiper :options="swiperOption" ref="mySwiper" class="swiper-spe">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <img width="100%" :src="slide" alt="图片" />
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </swiper>
          </div>
          <!-- 瀑布流 -->
          <div class="feed-wrapper">
            <div id="vue-instance" class="container">
              <div
                v-masonry
                transition-duration="0s"
                item-selector=".card-main"
                :origin-top="false"
                :horizontal-order="false"
              >
                <!-- <div class="row">
                   <div v-masonry-tile class="col-md-4" v-for="(itemObj, index) in allImgs"> -->
                    <div v-masonry-tile class="card-main" v-for="(itemObj, index) in allImgs">
                      <div class="pubu-main">
                        <div class="title">
                          <img class="title_img_box" :src="headImg" alt />
                          <span class="title-txt">百合と绯桜</span>
                        </div>
                        <div class="desc">
                          <span>{{ itemObj.title}}</span>
                        </div>
                        <div class="pubu-img">
                          <img
                            class="card-img-top"
                            :src="itemObj.imgUrl"
                            alt="Card image cap"
                            width="100%"
                          />
                        </div>
                        <div class="pubu-footer"></div>
                      </div>

                      <!-- <div class="card-body">
                        <h5 class="card-title">
                          <strong>{{ post.title }}</strong>
                        </h5>
                        <p class="card-text">{{ smartTrim(post.content, 100) }}</p>
                      </div>-->
                    </div>
                  <!-- </div>
                </div> -->
              </div>
            </div>
          </div>
          <!--  -->
        </div>
        <div class="right-main">
          <!-- login -->
          <div class="login-wrapper">
            <div class="login-content">
              <p class="login-title">账号登录</p>
              <div v-show="loginStatus===1">
                 <el-form ref="loginSms" :model="loginObj" label-width="0px" :rules="rules">
                <el-form-item label prop="phone">
                  <el-input v-model="loginObj.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label prop="code">
                  <el-input v-model="loginObj.code" placeholder="短信验证码"></el-input>
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
              <div v-show="loginStatus===2">
                <el-form ref="loginPass" :model="loginObj" label-width="0px" :rules="rulesPassword">
                <el-form-item label prop="phone">
                  <el-input v-model="loginObj.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label  prop="password">
                  <el-input v-model="loginObj.password" placeholder="您的密码" show-password></el-input>
                  
                </el-form-item>
              </el-form>
              </div>
             
              <div class="login-check">
                <span class="login-select" @click="checkLoginFun(2)" v-if="loginStatus===1">账号密码登录</span>
                <span class="login-select" @click="checkLoginFun(1)" v-if="loginStatus===2">手机验证码登录</span>
                <!-- <span class="login-select">忘记密码？</span> -->
              </div>
              <div class="login-footer">
                <el-button type="primary" @click="loginFun">登录</el-button>
              </div>
              <div class="login-reg">
                <span class="login-select" @click="registFun">注册账号</span>
              </div>
            </div>
          </div>
          <!-- hot -->
          <div class="c-hotTags">
            <p class="head">
              <span class="name">热门标签</span>
              <span class="change">换一换</span>
            </p>
            <div class="tags-wrapper">
              <a
                class="dm-tag dm-tag-a"
                href="/huodong/235"
                target="_blank"
                title="剑网3十周年COS大赛-双人组"
                style="color: rgb(255, 111, 162); background-color: rgb(255, 223, 234); line-height: 25px; font-size: 13px; height: 25px;"
              >
                <span>剑网3十周年COS大赛-双人组</span>
              </a>
              <a
                class="dm-tag dm-tag-a"
                href="/huodong/236"
                target="_blank"
                title="剑网3十周年COS大赛-团队组"
                style="color: rgb(255, 111, 162); background-color: rgb(255, 223, 234); line-height: 25px; font-size: 13px; height: 25px;"
              >
                <span>剑网3十周年COS大赛-团队组</span>
              </a>
              <a
                class="dm-tag dm-tag-a"
                href="/huodong/234"
                target="_blank"
                title="剑网3十周年COS大赛-个人组"
                style="color: rgb(255, 111, 162); background-color: rgb(255, 223, 234); line-height: 25px; font-size: 13px; height: 25px;"
              >
                <span>剑网3十周年COS大赛-个人组</span>
              </a>
              <a
                class="dm-tag dm-tag-a"
                href="/huodong/1003"
                target="_blank"
                title="WCG游戏COS大赛"
                style="color: rgb(255, 111, 162); background-color: rgb(255, 223, 234); line-height: 25px; font-size: 13px; height: 25px;"
              >
                <span>WCG游戏COS大赛</span>
              </a>
            </div>
          </div>
          <!-- download -->
          <div class="download-banner">
            <img :src="download" width="100%" />
          </div>
          <!--  -->
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
import Top from "@/components/Top";
import sw1 from "@/assets/sw/sw1.jpg";
import sw2 from "@/assets/sw/sw2.jpg";
import sw3 from "@/assets/sw/sw3.jpg";
import sw4 from "@/assets/sw/sw4.jpg";
import sw5 from "@/assets/sw/sw5.jpg";
import download from "@/assets/download.png";
import headImg from "@/assets/a.jpg";
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
        autoplay: true, //等同于以下设置

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperSlides: [sw1, sw2, sw3, sw4, sw5],
      sw1: sw1,
      sw2: sw2,
      sw3: sw3,
      sw4: sw4,
      sw5: sw5,
      headImg: headImg,
      loginObj: {
        phone: "",        
        password: "",
        code: ""
      },
      loginStatus: 1,
      loginPlace: {
        phone: "手机号",
        password: "短信验证码"
      },
      download: download, //下载图片
      allImgs: [],
      pageMsg: {
        currentPage: 1,
        total: 0,
        pageSize: 10
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
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.getAllImg();
  },
  //定义这个sweiper对象
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    /* *************promise****************************** */   
    // 全部图片
    showAllPromise(params) {
      return this.$axios(globalInterface.showAllImg, params, "post", {
        ajaxType: "json"
      });
    },   
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
    /* ***********注册登录模板******************************** */
    registFun(){      
      this.$router.push("/register");
    },
    checkLoginFun(key) {
      this.loginStatus = key;      
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
    /* ***********check******************************** */
    randomString(len) {
      len = len || 32;
      var $chars =
        "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },  
    getAllImg1() {
      for (var i = 0; i < 16; i++) {
        this.allImgs.push({
          title: this.randomString(30),
          content: this.randomString(100)
        });
      }
    },
    async getAllImg() {
      let temp = {
        category: "",
        pageNum: this.pageMsg.currentPage,
        pageSize: this.pageMsg.pageSize,
        picDesc: "",
        title: ""
      }
      let res = await this.showAllPromise(temp);
      
      if (res.success) {
       let data = res.data;
       if(data.list.length>0){
         this.allImgs = this.allImgs.concat(data.list);
         this.pageMsg.total = data.total;
       }
       
     
      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }

      // for (var i = 0; i < 16; i++) {
      //   this.posts.push({
      //     title: this.randomString(30),
      //     content: this.randomString(100)
      //   });
      // }
    },
    handleScroll() {
      let scrollHeight = window.scrollY;
      let maxHeight =
        window.document.body.scrollHeight -
        window.document.documentElement.clientHeight;
      if (scrollHeight >= maxHeight - 200) {
        if(this.allImgs.length<this.pageMsg.total){
           this.pageMsg.currentPage++;
            this.getAllImg();
        }
      }
    },
    smartTrim(string, maxLength) {
      var trimmedString = string.substr(0, maxLength);
      return trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      );
    },
    init() {
      // setInterval(() => {           
      //   if (this.swiperSlides.length < 10) {
      //     this.swiperSlides.push(this.swiperSlides.length + 1);
      //   }
      // }, 3000);
    }
  },
  mounted() {
    // this.swiper.slideTo(5);
    //鼠标覆盖停止自动切换与隐藏前进后退按钮
    this.swiper.el.onmouseover = function() {
      this.swiper.navigation.$nextEl.removeClass("hide");
      this.swiper.navigation.$prevEl.removeClass("hide");
    };
    //鼠标覆盖停止自动切换与隐藏前进后退按钮
    this.swiper.el.onmouseout = function() {
      this.swiper.navigation.$nextEl.addClass("hide");
      this.swiper.navigation.$prevEl.addClass("hide");
    };
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
.page-main {
  width: 1200px;
  margin: 0 auto;  
  .left-main {
    width: 870px;
    min-width: 870px;
    float: left;
  }
  .right-main {
    width: 300px;
    float: right;
  }
}

.swiper-container {
  width: 870px;
  height: 300px;
}
/* swiper样式修改 */
.swiper-spe {
  .swiper-pagination-bullet {
    box-shadow: 0 0 4px 0 rgb(0, 0, 0, 0.15);
    border-color: transparent;
    opacity: 1;
    background: #fff;
    width: 10px;
    height: 10px;
    outline: none;
  }
  .swiper-pagination-bullet-active {
    background-color: #ff5f98;
  }
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
      cursor: pointer;
      border: 1px solid #bdbdbd;
      background-color: #bdbdbd;
      color: #fff;
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
/* 瀑布流 */
/* 瀑布流 */
.feed-wrapper {
  width: 100%;
  margin-top: 30px;
}
.col-md-4 {
  display: inline-block;
  margin: 0 4px 12px 4px;
}
.card-main {
  width: 425px;
  padding: 16px 16px 0;  
  background: white;
  margin: 0 4px 12px 4px;
  .title {
    display: flex;
    align-items: flex-start;
    .title_img_box {
      display: block;
      margin-right: 8px;
      width: 36px;
      height: 36px;
      position: relative;
      flex-shrink: 0;
      border-radius: 50%;
      border: 1px solid #f5f5f5;
      border-radius: 50%;
      display: block;
    }
    .title-txt {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
      margin: auto 0;
    }
  }
  .desc {
    word-break: break-word;
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.57;
  }
  .pubu-img{
    margin: 8px 0;    
    img{
          border-radius: 8px;
      display: block;
      border: 1px solid #f5f5f5;
      max-width: 100%;
    }
  }
}
</style>
