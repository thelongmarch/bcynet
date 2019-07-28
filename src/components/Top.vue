<template>
  <div class="header-main">
    <div class="left-main">
      <img :src="log" alt class="log" @click="goWebsit" />
      <router-link to="/tree" class="link-list">首页</router-link>
      <router-link to="/" class="link-list">绘画</router-link>
      <router-link to="/" class="link-list">写作</router-link>
      <router-link to="/" class="link-list">COS</router-link>
      <router-link to="/" class="link-list">问答</router-link>
      <router-link to="/" class="link-list">视频</router-link>
      <router-link to="/" class="link-spe">
        <span class="list-spe">银河英雄传说</span>
        <img :src="yinghe" alt class="yinhe-spe" @click="goWebsit" />
      </router-link>
      <router-link to="/" class="link-list">
        <img :src="phone" alt class="phone-spe" />
        <span>下载APP</span>
      </router-link>
    </div>
    <div class="right-main">
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
      <router-link to="/login" class="link-list">登录</router-link>
      <router-link to="/register" class="link-list">注册</router-link>
      <router-link to="/">
        <div class="publish-main">
          <img :src="publish" alt class="pub-img" />
          <span>发布</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import log from "@/assets/log.png";
import logoheader from "@/assets/logo-header.png";
import phone from "@/assets/phone.png";
import publish from "@/assets/publish.png";

export default {
  data() {
    return {
      log: log,
      yinghe: logoheader,
      phone: phone,
      publish: publish
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
  components: {},
  computed: {},
  methods: {
    goWebsit() {
      this.$router.push("/home");
    },
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    }
  },
  mounted() {}
};
</script>

<style scoped="scoped" lang="less" >
@import url("../styles/common.less");

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
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
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
    .link-list {
      line-height: 50px;
      padding: 0 15px;
      color: #333;
      .phone-spe {
        vertical-align: middle;
      }
    }
    .link-list:hover {
      color: #ff6fa2;
    }
    .link-spe {
      color: #333;
    }
    .link-spe:hover {
      color: #ff6fa2;
    }
    .list-spe {
      line-height: 50px;
      vertical-align: top;
    }
    .yinhe-spe {
      height: 50px;
    }
  }
  .right-main {
    display: flex;
    justify-content: flex-start;
    line-height: 50px;
    .link-list {
      line-height: 50px;
      padding: 0 15px;
      color: #333;
      .phone-spe {
        vertical-align: middle;
      }
    }
    .link-list:hover {
      color: #ff6fa2;
    }
    .publish-main {
      display: block;
      width: 113px;
      height: 50px;
      border-radius: 0;
      text-align: center;
      cursor: pointer;
      line-height: 50px;
      box-sizing: border-box;
      border: none;
      background-color: #ff6fa2;
      color: #fff;
      font-size: 16px;
      line-height: 50px;
      .pub-img {
        vertical-align: middle;
      }
    }
    .publish-main:hover {
      background-color: #ff4081;
    }
  }
}
</style>
