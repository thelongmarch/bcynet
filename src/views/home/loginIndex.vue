
<template>
  <section class="idx-main">
    <div class="main">
      <!-- header -->
      <div class="header-spe">
        <loginTop />
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
                transition-duration="0.3s"
                item-selector=".item"
                :origin-top="true"
                :horizontal-order="false"
              >
                <div class="row">
                  <div v-masonry-tile class="col-md-4" v-for="(post, index) in posts">
                    <div class="card m-4" style="width: 18rem;">
                      <img
                        class="card-img-top"
                        src="http://via.placeholder.com/350x150"
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <h5 class="card-title">
                          <strong>{{ post.title }}</strong>
                        </h5>
                        <p class="card-text">{{ smartTrim(post.content, 100) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
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
              <el-form ref="form" :model="loginObj" label-width="0px">
                <el-form-item label>
                  <el-input v-model="loginObj.phone" :placeholder="loginPlace.phone"></el-input>
                </el-form-item>
                <el-form-item label>
                  <el-input v-model="loginObj.ems" :placeholder="loginPlace.password"></el-input>
                  <input type="button" value="点击获取" class="sms-spe" v-if="loginStatus===1" />
                </el-form-item>
              </el-form>
              <div class="login-check">
                <span class="login-select" @click="checkLoginFun(2)" v-if="loginStatus===1">账号密码登录</span>
                <span class="login-select" @click="checkLoginFun(1)" v-if="loginStatus===2">手机验证码登录</span>
                <span class="login-select">忘记密码？</span>
              </div>
              <div class="login-footer">
                <el-button type="primary">创建账号</el-button>
              </div>
              <div class="login-reg">
                <span class="login-select">注册账号</span>
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
import loginTop from "@/components/loginTop";
import sw1 from "@/assets/sw/sw1.jpg";
import sw2 from "@/assets/sw/sw2.jpg";
import sw3 from "@/assets/sw/sw3.jpg";
import sw4 from "@/assets/sw/sw4.jpg";
import sw5 from "@/assets/sw/sw5.jpg";
import download from "@/assets/download.png";
// require styles
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    loginTop,
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
      loginObj: {
        phone: "",
        ems: ""
      },
      loginStatus: 1,
      loginPlace: {
        phone: "手机号",
        password: "短信验证码"
      },
      download: download, //下载图片
      posts: []     
    };
  },
  created() {    
    window.addEventListener("scroll", this.handleScroll);
    this.getPosts();
  },
  //定义这个sweiper对象
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
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
    getPosts() {
      for (var i = 0; i < 16; i++) {
        this.posts.push({
          title: this.randomString(30),
          content: this.randomString(100)
        });
      }
    },
    handleScroll() {
      let scrollHeight = window.scrollY;
      let maxHeight =
        window.document.body.scrollHeight -
        window.document.documentElement.clientHeight;

      if (scrollHeight >= maxHeight - 200) {
        this.getPosts();
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
      //   console.log("simulate async data");
      //   debugger
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

<style  lang="less">
.idx-main {
  height: 100%;
  width: 100%;
}
.main {
  height: 100%;
}
.header-spe {
  z-index: 101;
  position: fixed;
  top: 0;
}
.page-main {
  width: 1200px;
  margin: 70px auto 0;
  border: 1px solid;
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
/* 瀑布流 */
.feed-wrapper {
  width: 100%;
  margin-top: 30px;
}
.col-md-4{
  display: inline-block;
}
</style>
