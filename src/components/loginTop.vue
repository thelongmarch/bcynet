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
            <span class="home-img"></span>
            <span class="home-title">首页</span>
          </div>
          <div class="right-bell">
            <!-- <img :src="bell" alt width="24px" /> -->
            <span class="bell-img"></span>
            <span class="bell-title">消息</span>
          </div>
          <div class="head-img">
            <img :src="header" alt class="header-trans" width="34px" />
            <div class="header-list">
              退出
            </div>
          </div>
          <div class="right-publish">
            <el-popover placement="top-start" width="300" trigger="hover">
              <div class="list-main">
                <div class="list-com">
                  <img src alt />
                </div>
                <div class="list-com"></div>
                <div class="list-com"></div>
              </div>

              <div class="publish-m" slot="reference">
                <el-button type="danger" class="danger-spe">
                  <img :src="edit" alt width="24px" />发布
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
      header: header
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
        width: 80px;
        .home-img {
          width: 24px;
          display: inline-block;
          height: 24px;
          background-image: url("../assets/home.png");
          background-repeat: no-repeat;
          background-size: cover;
          margin-top: 11px;
          color: #999;
          cursor:pointer;
        }
        .home-title {
          display: inline-block;
          vertical-align: top;
          color: #999;
          font-size: 16px;
          font-weight: 500;
          cursor:pointer;
        }
        .home-title:hover {        
          color: #666;
        }
      }
      .right-bell {
        width: 80px;
         .bell-img {
          width: 24px;
          display: inline-block;
          height: 24px;
          background-image: url("../assets/bell.png");
          background-repeat: no-repeat;
          background-size: cover;
          margin-top: 11px;
          color: #999;
          cursor:pointer;
        }
        .bell-title {
          display: inline-block;
          vertical-align: top;
          color: #999;
          font-size: 16px;
          font-weight: 500;
          cursor:pointer;
        }
        .bell-title:hover {        
          color: #666;
        }
      }
      .head-img {
        width: 37px;
        position: relative;
        cursor: pointer;
        .header-trans{
          border-radius: 50%;
          margin-top: 8px;
          cursor: pointer;
        }
        .header-trans:hover{
          //  transform: scale(1.5);
          // transform:translate(55px);
          // animation:header-animation 2s ease-out;
        }
        @keyframes header-animation{
          0%{transform:translate(0);opacity:0;}
          50%{transform:translate(30px);opacity:1;}
          70%{transform:translate(35px);opacity:1;}
          100%{transform:translate(60px);opacity:0;}
        }
        .header-list{
         
          position: absolute;
          overflow: hidden;
          height: 0;
          top: 50px;
          left: -114px;
          width: 260px;
          background-color: #fff;
          transition-property: height;
          transition-duration: .3s;
        }       
      
        // .header-list:hover{
        //   display: block;
        // }

      }
      // head hover
      .head-img:hover .header-list{
          display: block;
          height: 265px;
      }

    }
  }
}
</style>
