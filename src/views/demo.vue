
<template>
 <section class="idx-main">
    <p class="u-title">上架商品</p>
    <div class="search-box">
      <div class="row-box ">
        <div class="col-box">
          <span class="label">商品编码：</span>
          <el-input placeholder="请输入商品编码" maxlength="18" v-model="searchObj.code"></el-input>
        </div>
        <div class="col-box">
          <span class="label">商品名称：</span>
          <el-input placeholder="请输入商品名称" v-model="searchObj.name"></el-input>
        </div>
        <div class="col-box">
          <span class="label">商品名称：</span>
          <el-input placeholder="请输入商品名称" v-model="searchObj.name"></el-input>
        </div>
        <div class="col-box">
          <span class="label">商品名称：</span>
          <el-input placeholder="请输入商品名称" v-model="searchObj.name"></el-input>
        </div>
          <div class="col-box">
          <span class="label">状态：</span>
          <el-select v-model="searchObj.status" placeholder="请选择" @change="selectChange">
            <el-option v-for="(item,index) in statusObj" :key="index" :label="item.label"
                        :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-box">
          <el-button type="primary" size="small" @click="doSearch">查询</el-button>
        </div>
      </div>
      <div class="row-box ">
        <div class="col-box">
          <span class="label">商品编码：</span>
          <el-input placeholder="请输入商品编码" maxlength="18" v-model="searchObj.code"></el-input>
        </div>
        <div class="col-box">
          <span class="label">商品名称：</span>
          <el-input placeholder="请输入商品名称" v-model="searchObj.name"></el-input>
        </div>
        <div class="col-box">
          <span class="label">商品名称：</span>
          <el-input placeholder="请输入商品名称" v-model="searchObj.name"></el-input>
        </div>
        <div class="col-box">
          <span class="label">商品名称：</span>
          <el-input placeholder="请输入商品名称" v-model="searchObj.name"></el-input>
        </div>
          <div class="col-box">
          <span class="label">状态：</span>
          <el-select v-model="searchObj.status" placeholder="请选择" @change="selectChange">
            <el-option v-for="(item,index) in statusObj" :key="index" :label="item.label"
                        :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-box">
          <el-button  @click="doSearch">查询</el-button>
        </div>
      </div>
      <div class="row-box box-copy">
        <div class="col-box">
          <el-button type="primary" size="small" @click="addList">添加商品</el-button>
        </div>
      </div>
    </div>
    <div class="code_main">
      <div class="code_content">
        <el-table :data="tableData">
          <el-table-column label="停车场名称">
            <template slot-scope="scope">
              <p>{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column  prop="code" label="停车场名称"></el-table-column>
          <el-table-column  prop="num" label="车位数"></el-table-column>
          <el-table-column  prop="address" label="停车场地址"></el-table-column>
          <el-table-column  prop="type" label="停车场属性"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button  type="text" @click="sortGoods(scope.row)">分类</el-button>
              <el-button type="text" @click="soldOutGoods(scope.row,2)">下架</el-button>
              <el-button type="text" @click="soldOutGoods(scope.row,1)">上架</el-button>
            </template>
          </el-table-column>
        </el-table>
         <pagination :pageMsg='pageMsg' @currentChange='passChange' @sizeChange="sizeChange"></pagination>

      </div>
    </div>
 </section>
</template>

<script>
import pagination from '@/components/pagination'
export default {
  components: {
    pagination
  },
  data () {
    return {
      searchObj: {
        code: '',
        name: '',
        status: ''
      },
      statusObj: [
        {
          value: '1',
          label: '上架中'
        },
        {
          value: '0',
          label: '已下架'
        }
      ],
      pageMsg: {
        currentPage: 1,
        total: 11,
        pageSize: 10
      },
      tableData: [] // 列表

    }
  },
  created () {

  },
  methods: {
    passChange (val) {
      this.pageMsg.currentPage = val
      this.searchTable()
    },
    sizeChange (val) {
      this.pageMsg.pageSize = val
      this.pageMsg.currentPage = 1
      this.searchTable()
    },
    doSearch () {
      this.pageMsg.currentPage = 1
      this.searchTable()
    },
    selectChange () {
      this.pageMsg.currentPage = 1
      this.searchTable()
    },
    searchTable () {
      this.tableData = []
    },
    addList () {
      this.tableData = []
    }

  },
  mounted () {
    this.tableData = [
      {
        name: '苏交科大楼停车场',
        code: '0001',
        num: '668',
        address: '南京市',
        type: '线上支付'
      }
    ]
    // this.tableData = []
  }
}
</script>

<style lang="less">
  @import url("../styles/difinitions");
  @import url("../styles/_reset.css");
  @import url("../styles/elementUI_reset");
  @import url("../styles/shop+reset");

</style>
