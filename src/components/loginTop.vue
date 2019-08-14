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

          </div>
          <div class="right-bell">
            
          </div>
          <div class="right-publish">
            <el-popover
              placement="top-start"             
              width="300"
              trigger="hover"
             >
               <p>这是一段内容这是一段内容确定删除吗？</p>
 
              <el-button slot="reference">hover 激活</el-button>
            </el-popover>
          </div>
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
      this.$router.push("/loginIndex");
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
    border: 1px solid red;
    display: flex;
  justify-content: space-between;
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
