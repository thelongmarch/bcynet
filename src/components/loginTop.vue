<template>
  <div class="header-main">
    <div class="home-header">
      <!-- left -->
      <div class="left-main">
        <img :src="log" alt class="log" @click="goWebsit" />
        <div class="search-main">
          <input
            type="text"
            name="k"
            maxlength="40"
            placeholder="搜索COS、绘画、文、用户..."
            autocomplete="off"
          />
          <div class="search-ico"></div>
        </div>
      </div>
      <!-- right -->
      <div class="right-main">
        <div class="right-content">
          <div class="right-home">
            <!-- <img :src="home" alt="" width="24px">  -->
            <span class="home-img" @click="goWebsit"></span>
            <span class="home-title" @click="goWebsit">首页</span>
          </div>
          <div class="right-bell">
            <!-- <img :src="bell" alt width="24px" /> -->
            <span class="bell-img"></span>
            <span class="bell-title">消息</span>
          </div>
          <div class="head-img">
            <img :src="header" alt class="header-trans" />
            <div class="header-list">
              <div class="user-dropdown-wrapper">
                <div class="username">
                  <p class="center">
                    <a>
                      <span class="name">{{phone}}</span>
                    </a>
                  </p>
                </div>
                <div class="channels clearfix">
                  <a>
                    <span>
                      <i type="homepage" class="iconfont icon-homepage"></i>个人主页
                    </span>
                  </a>
                  <a>
                    <span>
                      <i type="setting" class="iconfont icon-setting"></i>设置
                    </span>
                  </a>
                  <a>
                    <span>
                      <i type="fold" class="iconfont icon-fold"></i>我的作品
                    </span>
                  </a>
                  <a>
                    <span>
                      <i type="feed" class="iconfont icon-feed"></i>投喂管理
                    </span>
                  </a>
                  <a>
                    <span>
                      <i type="notice-rss" class="iconfont icon-notice-rss"></i>订阅连载
                    </span>
                  </a>
                  <a>
                    <span>
                      <i type="listbought" class="iconfont icon-listbought"></i>订单管理
                    </span>
                  </a>
                </div>
                <div class="logout center" @click="loginOut">
                  <a class="fz-14">退出账号</a>
                </div>
              </div>
            </div>
          </div>
          <div class="right-publish">
            <el-popover placement="top-start" width="320" trigger="hover">
              <div class="publish-top">
                <a @click="goToPublish">
                  <img :src="picture" />
                  <div class="text">
                    <p class="type">图片</p>
                    <p class="short">绘画、COS、手办、汉服、表情包…</p>
                  </div>
                </a>
              </div>
              <div class="publish-m" slot="reference">
                <el-button type="danger" class="danger-spe">                  
                  <img :src="edit" alt width="24px" />
                  <span class="publish-title">发布</span>
                </el-button>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import log from "@/assets/log.png";
import logoheader from "@/assets/logo-header.png";
import phone from "@/assets/phone.png";
import publish from "@/assets/publish.png";
import home from "@/assets/home.png";
import bell from "@/assets/bell.png";
import edit from "@/assets/edit.png";
import header from "@/assets/header.png";
import picture from "@/assets/picture.png";
import $axios from 'axios'
import globalInterface from "@/service/interface";
import productionUrl from '../service/env'

export default {
  data() {
    return {
      log: log,
      yinghe: logoheader,
      phone: phone,
      publish: publish,
      home: home,
      bell: bell,
      edit: edit,
      header: header,
      picture: picture,
      token:'',
      phone:''
    };
  },
  props: {
    // pageMsg: {
    //   type: Object,
    //   default: {
    //     total: 0,
    //     currentPage: 1,
    //     pageSize: 10
    //   }
    // }
  },
  created(){    
    this.token = localStorage.getItem('Authorization');
    this.phone = localStorage.getItem('phone');
  },
  components: {},
  computed: {},
  methods: {
    /* *************promise****************************** */
    // 获取code
    loginOutPromise(params) {
      return this.$axios(globalInterface.logout, params, "post", {
        ajaxType: "json"
      });
    },
    /* ***********获取code******************************** */
    goWebsit() {
      this.$router.push("/loginIndex");
    },
    goToPublish() {
      this.$router.push("/publish");
    },
    async loginOut() {

      let temp = {};
      let baseUrl = process.env.NODE_ENV === 'production' ? productionUrl : '';
      let _self = this;
      let asyncBody = await $axios({
          method: 'post',
          baseURL: baseUrl + '/',
          url: globalInterface.logout,
          headers: {'auth-token': _self.token},
          data: temp
        })
      let res = asyncBody.data;   
      if (res.success) {
        this.$message({
          message: "退出成功！",
          type: "success"
        });
        this.$router.push("/home");
        //清除数据
          this.$store.commit('del_token');      
          // 将token存储到本地
          localStorage.setItem('Authorization', '');
          localStorage.setItem('phone', '');

      } else {
        this.$message({
          message: res.returnMsg,
          type: "warning"
        });
      }
    }
  },
  mounted() {
   
  }
};
</script>

<style scoped="scoped" lang="less" >
@import url("../styles/common.less");

.search-main {
  margin-top: 6px;
  position: relative;

  input {
    box-sizing: border-box;
    width: 280px;
    height: 36px;
    position: relative;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    background-color: #f7f8fa;
    display: flex;
    align-items: center;
  }
  .search-ico {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 16px;
    height: 16px;
    outline: none;
    border: none;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-image: url(../assets/search.png);
    background-color: transparent;
    background-position: 50%;
    background-repeat: no-repeat;
  }
}

.header-main {
  box-sizing: border-box;
  transform: translateZ(0);
  width: 100%;
  height: 50px;
  min-width: 1200px;
  background-color: white;
  font-size: 14px;
  z-index: 101;
  position: fixed;
  box-sizing: border-box;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  .home-header {
    width: 1200px;
    margin: 0 auto;    
    display: flex;
    justify-content: space-between;
    height: 50px;
  }
  .left-main {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: #333;
    line-height: 50px;
    .log {
      width: 107px;
      height: 38px;
      display: block;
      margin: 6px 25px 6px 20px;
      cursor: pointer;
    }
  }
  .right-main {
    display: flex;
    justify-content: flex-start;
    line-height: 50px;
    .right-content {
      display: flex;
      flex-direction: row;
      flex-flow: nowrap;
      .right-home {
        width: 90px;
        .home-img {
          width: 24px;
          display: inline-block;
          height: 24px;
          background-image: url("../assets/home.png");
          background-repeat: no-repeat;
          background-size: cover;
          margin-top: 11px;
          color: #999;
          cursor: pointer;
        }
        .home-title {
          display: inline-block;
          vertical-align: top;
          color: #999;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
        }
        .home-title:hover {
          color: #666;
        }
      }
      .right-bell {
        width: 90px;
        .bell-img {
          width: 24px;
          display: inline-block;
          height: 24px;
          background-image: url("../assets/bell.png");
          background-repeat: no-repeat;
          background-size: cover;
          margin-top: 11px;
          color: #999;
          cursor: pointer;
        }
        .bell-title {
          display: inline-block;
          vertical-align: top;
          color: #999;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
        }
        .bell-title:hover {
          color: #666;
        }
      }
      .head-img {
        width: 37px;
        position: relative;
        cursor: pointer;
        margin-right: 20px;
        .header-trans {
          position: absolute;
          z-index: 7;
          top: 0;
          left: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          transition-property: left, width, height;
          transition-duration: 0.3s;
          cursor: pointer;
          margin-top: 8px;
        }
        .header-trans:hover {
          //  transform: scale(1.5);
          // transform:translate(55px);
          // animation:header-animation 2s ease-out;
        }
        .header-list {
          position: absolute;
          overflow: hidden;
          height: 0;
          // height: 265px;
          top: 50px;
          left: -114px;
          width: 260px;
          background-color: #fff;
          transition-property: height;
          transition-duration: 0.3s;
        }

        // .header-list:hover{
        //   display: block;
        // }
      }
      // head hover
      .head-img:hover .header-list {
        display: block;
        height: 265px;
      }
      .head-img:hover img {
        left: -17px;
        width: 64px;
        height: 64px;
      }
    }
  }
}

//头像
.user-dropdown-wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
  .username {
    padding: 33px 20px 0;
    .center {
      padding-bottom: 12px;
      border-bottom: 1px solid #e0e0e0;
      text-align: center;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        max-width: 190px;
      }
    }
  }
  .channels {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 25px 20px 6px;
  }
  .channels a {
    display: block;
    width: 50%;
    margin-bottom: 20px;
    line-height: 22px;
    cursor: pointer;
    text-align: center;
  }
  .channels a span {
    color: #666;
    vertical-align: top;
  }
  .clearfix {
    zoom: 1;
  }
  .logout {
    line-height: 34px;
    background-color: #fafafa;
    border-top: 1px solid #e0e0e0;
    cursor: pointer;
    text-align: center;
  }
}
//发布
.publish-top {
  background-color: #fff;
  width: 300px;
  padding: 10px 10px 0;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  .text {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    .type {
      font-size: 16px;
      line-height: 1;
      color: #333;
    }
    .newHome-publish-btn .publish-loaf a .short {
      font-size: 12px;
      line-height: 1;
      color: #ccc;
      margin-top: 6px;
    }
  }
}
.publish-top a {
  color: #333;
  display: flex;
  flex-direction: row;
  width: 280px;
  height: 66px;
  padding: 5px 15px 5px 5px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f5f6f7;
  cursor: pointer;
}
.publish-top a img {
  width: 56px;
  height: 56px;
  display: flex;
  flex: none;
  margin-right: 10px;
}
//发布按钮
.danger-spe{     
    width: 75px;
    height: 32px;
    border-radius: 6px;
    background-color: #ff6fa2;    
    font-size: 16px;
    font-weight: 500;
    line-height: 1.13;
    color: #fff;
    cursor: pointer;
        margin-left: 7px;
    margin-top: 8px;
    .publish-title{
         vertical-align: top;
    padding-top: 5px;
    display: inline-block;
    }
}

</style>
