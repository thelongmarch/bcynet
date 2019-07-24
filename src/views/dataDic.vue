
<template>
  <section class="idx-main">
    <!-- 字典编码 -->
    <div class="dic-main" v-show="isMain">
      <div class="head">
        <div class="parking">
          <div class="space"></div>
          <div class="u-title">字典编码管理</div>
        </div>
      </div>
      <div class="search-box">
        <div class="row-box row-spe">
          <div class="col-box">
            <el-button @click="addList" type="primary">
              <i class="el-icon-plus"></i> 新建
            </el-button>
          </div>
          <div class="col-box col-right">
            <el-button @click="doSearch()" type="warning">查询</el-button>
          </div>
        </div>
        <div class="row-box">
          <div class="col-box">
            <span class="label">字典编码</span>
            <el-input maxlength="20" v-model="searchObj.dictCode" class="morePark" />
          </div>
          <div class="col-box">
            <span class="label">字典名称</span>
            <el-input maxlength="20" v-model="searchObj.dictName" />
          </div>
          <div class="col-box">
            <span class="label">业务类型</span>               
            <el-select v-model="searchObj.businessType"                 
                  filterable
                  allow-create              
                  style="margin-left:12px;"
                  placeholder="请选择">
                  <el-option v-for="item in typeObj"
                    :key="item.dataCode"
                    :label="item.dataValue"
                    :value="item.dataCode">
                  </el-option>
                </el-select>           
          </div>
        </div>
      </div>
      <div class="code_main" style="padding:0px 0px 0px 20px;">
        <div class="code_content">
          <el-table :data="tableData" header-align="center">
            <el-table-column align="center" prop="dictCode" label="字典编码"></el-table-column>
            <el-table-column align="center" prop="dictName" label="字典名称">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">{{scope.row.dictName}}</span>
                <el-input v-model="scope.row.dictName" v-if="scope.row.status === 2"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dataDesc" label="字典描述">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">{{scope.row.dataDesc}}</span>
                <el-input v-model="scope.row.dataDesc" v-if="scope.row.status === 2"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="businessType" label="业务类型"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delList(scope.row.dictId)">删除</el-button>
                <el-button type="text" v-if="scope.row.status === 1" @click="editList(scope.row)">编辑</el-button>
                <el-button type="text" v-if="scope.row.status === 2" @click="saveList(scope.row)">保存</el-button>
                <el-button type="text" @click="setDetail(scope.row)">字典项设置</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :pageMsg="pageMsg" @currentChange="passChange" @sizeChange="sizeChange"></pagination>
        </div>
      </div>
    </div>
    <!-- 字典项设置 -->
    <div class="dic-detail" v-show="!isMain">
      <div class="head">
        <div class="parking">
          <div class="space"></div>
          <div class="u-title">
            <span class="term-cursor" @click="goBack">字典编码管理</span>
            <span class="term-arr">/</span>
            <span class="term-sub">字典项管理</span>
          </div>
        </div>
      </div>
      <div class="search-box">
        <div class="row-box row-spe">
          <div class="col-box">
            <el-button @click="goBack">返回</el-button>
          </div>
          <div class="col-box">
            <el-button @click="addTermList" type="primary">
              <i class="el-icon-plus"></i> 新建
            </el-button>
          </div>
          <div class="col-box col-right">
            <el-button @click="doTermSearch()" type="warning">查询</el-button>
          </div>
        </div>
        <div class="row-box">
          <div class="col-box">
            <span class="label">字典项编码</span>
            <el-input maxlength="20" v-model="searchTermObj.dataCode" class="morePark" />
          </div>
          <div class="col-box">
            <span class="label">字典项值</span>
            <el-input maxlength="20" v-model="searchTermObj.dataValue" />
          </div>
        </div>
      </div>
      <div class="code_main" style="padding:0px 0px 0px 20px;">
        <div class="code_content">
          <el-table :data="tableTermData" header-align="center">
            <el-table-column align="center" prop="dictCode" label="字典编码"></el-table-column>
            <el-table-column align="center" prop="dataCode" label="字典项编码"></el-table-column>
            <el-table-column align="center" prop="dataValue" label="字典项值">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">{{scope.row.dataValue}}</span>
                <el-input v-model="scope.row.dataValue" v-if="scope.row.status === 2"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dataDesc" label="字典项描述">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">{{scope.row.dataDesc}}</span>
                <el-input v-model="scope.row.dataDesc" v-if="scope.row.status === 2"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sortNo" label="排序">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">{{scope.row.sortNo}}</span>
                <el-input v-model="scope.row.sortNo" v-if="scope.row.status === 2"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delTermList(scope.row.dictItemId)">删除</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status === 1"
                  @click="editTermList(scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status === 2"
                  @click="saveTermList(scope.row)"
                >保存</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <pagination
            :pageMsg="pageTermMsg"
            @currentChange="passTermChange"
            @sizeChange="sizeTermChange"
          ></pagination> -->
        </div>
      </div>
    </div>

    <!-- 新增字典 -->
    <el-dialog
      :title="dataTitle"
      :visible.sync="dicDialog"
      width="400px"
      :before-close="handleClose"
    >
      <el-form ref="addForm" :rules="rules" :model="addFormObj" label-width="114px">
        <el-form-item label="字典编码" prop="dictCode">
          <el-input v-model="addFormObj.dictCode"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="addFormObj.dictName"></el-input>
        </el-form-item>
        <el-form-item label="字典描述" prop="dataDesc">
          <el-input v-model="addFormObj.dataDesc"></el-input>
        </el-form-item>
        <el-form-item label="业务类型" prop="businessType">
          <el-input v-model="addFormObj.businessType"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd('addForm')">取消</el-button>
        <el-button type="primary" @click="addSureFun('addForm')">立即创建</el-button>
      </div>
    </el-dialog>
    <!-- 字典项新增 -->
    <el-dialog
      :title="termTitle"
      :visible.sync="dicTermDialog"
      width="400px"
      :before-close="handleTermClose"
    >
      <el-form ref="addTermForm" :rules="rulesTerm" :model="addTermFormObj" label-width="114px">
        <el-form-item label="字典项编码" prop="dataCode">
          <el-input v-model="addTermFormObj.dataCode"></el-input>
        </el-form-item>
        <el-form-item label="字典项值" prop="dataValue">
          <el-input v-model="addTermFormObj.dataValue"></el-input>
        </el-form-item>
        <el-form-item label="字典项描述" prop="dataDesc">
          <el-input v-model="addTermFormObj.dataDesc"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortNo">
          <el-input v-model="addTermFormObj.sortNo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTermAdd('addTermForm')">取消</el-button>
        <el-button type="primary" @click="addSureTermFun('addTermForm')">立即创建</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import pagination from "@/components/pagination";
import globalFun from "@/common/common";
import globalInterface from "@/service/interface";

export default {
  components: {
    pagination
  },
  data() {
    return {
      searchObj: {
        dictCode: "", //数据编码
        dictName: "", //数据名称/值
        businessType: "" //业务类型
      },
      pageMsg: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      tableData: [], //表格数据
      searchTermObj: {
        dataCode: "", //数据项编码
        dataValue: ""
      },
      pageTermMsg: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      tableTermData: [], //表格数据
      dataTitle: "", //弹框title
      dicDialog: false, //弹框
      addFormObj: {
        dictCode: "",
        dictName: "",
        businessType: "",
        dataDesc: ""
      }, //弹框obj
      rules: {
        dictCode: [
          {
            required: true,
            message: "字典编码不能为空!",
            trigger: "change"
          }
        ],
        dictName: [
          {
            required: true,
            message: "字典名称不能为空!",
            trigger: "change"
          }
        ],
        businessType: [
          {
            required: true,
            message: "业务类型不能为空!",
            trigger: "change"
          }
        ],
        dataDesc: [
          {
            required: true,
            message: "字典描述不能为空!",
            trigger: "change"
          }
        ]
      },
      rulesTerm: {
        dataCode: [
          {
            required: true,
            message: "字典项编码不能为空!",
            trigger: "change"
          }
        ],
        dataValue: [
          {
            required: true,
            message: "字典项值不能为空!",
            trigger: "change"
          }
        ],
        dataDesc: [
          {
            required: true,
            message: "字典项描述不能为空!",
            trigger: "change"
          }
        ],
        sortNo: [
          {
            required: true,
            message: "排序不能为空!",
            trigger: "change"
          },
          {
            pattern: /^[0-9]*[1-9][0-9]*$/,
            message: "请输入正整数!"
          }
        ]
      },
      isMain: true, //字典配置
      currentDic: "", //当前字典项
      dicTermDialog: false, //字典项dialog
      termTitle: "新增字典项", //字典项title
      addTermFormObj: {
        dictCode: "",
        dataCode: "",
        dataValue: "",
        sortNo: "",
        dataDesc: ""
      } , //新增字典项
      typeObj:[]//业务类型下拉
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
    // delete
    delPromise(params) {
      return this.$axios(globalInterface.deleteDict, params, "post");
    },
    // edit
    editPromise(params) {
      return this.$axios(globalInterface.updateDict, params, "post", {
        ajaxType: "json"
      });
    },
    /* *************字典项管理****************************** */
    // table
    tableTermPromise(params) {
      return this.$axios(globalInterface.selectDictItemList, params, "post", {
        ajaxType: "json"
      });
    },
    // add
    addTermPromise(params) {
      return this.$axios(globalInterface.addDictItem, params, "post", {
        ajaxType: "json"
      });
    },
    // delete
    delTermPromise(params) {
      return this.$axios(globalInterface.deleteDictItem, params, "post");
    },
    // edit
    editTermPromise(params) {
      return this.$axios(globalInterface.updateDictItem, params, "post", {
        ajaxType: "json"
      });
    },
    /* ***********新增******************************** */
    addList() {
      this.dicDialog = true;
      this.dataTitle = "新增字典";
    },
    addSureFun(formName) {
      //验证排序为正整数
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addValiFun();
        }
      });
    },
    async addValiFun() {
      let temp = {
        dictCode: this.addFormObj.dictCode,
        dictName: this.addFormObj.dictName,
        businessType: this.addFormObj.businessType,
        dataDesc: this.addFormObj.dataDesc
      };
      let bsType = this.addFormObj.businessType;
      let res = await this.addPromise(temp);
      debugger;
      if (res.status === "success") {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.cancelAdd("addForm");
        //新增之后查询
        this.searchObj.businessType = bsType;
        this.doSearch();
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    handleClose() {
      this.cancelAdd("addForm");
    },
    cancelAdd(formName) {
      this.$refs[formName].resetFields();
      this.dicDialog = false;
    },
    /* ***********查询******************************** */
    passChange(val) {
      this.pageMsg.currentPage = val;
      this.searchTable();
    },
    sizeChange(val) {
      this.pageMsg.pageSize = val;
      this.pageMsg.currentPage = 1;
      this.searchTable();
    },
    doSearch() {
      this.pageMsg.currentPage = 1;
      this.searchTable();
    },
    async searchTable() {
      //业务类型不能为空
      if (!this.searchObj.businessType) {
        this.$message({
          message: "业务类型不能为空!",
          type: "warning"
        });
        return false;
      }
      let temp = {
        dictCode: this.searchObj.dictCode, //数据编码
        dictName: this.searchObj.dictName, //数据名称/值
        businessType: this.searchObj.businessType, //业务类型
        pageSize: this.pageMsg.pageSize,
        pageNum: this.pageMsg.currentPage
      };
      let res = await this.tablePromise(temp);
      if (res.status === "success") {
        let data = res.data;
        if (data.list.length > 0) {
          data.list.map((v, k) => {
            v.status = 1; //1表示显示状态2表示可编辑状态
          });
        }
        this.tableData = data.list;
        this.pageMsg.total = data.total;
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    /* ***********编辑、保存******************************** */
    editList(item) {
      item.status = 2;
    },
    async saveList(item) {
      //字典名称不能为空
      if (!item.dictName) {
        this.$message({
          message: "字典名称不能为空!",
          type: "warning"
        });
        return false;
      }
      //字典描述不能为空
      if (!item.dataDesc) {
        this.$message({
          message: "字典描述不能为空!",
          type: "warning"
        });
        return false;
      }
      let temp = {
        dictName: item.dictName,
        dictId: item.dictId,
        dataDesc: item.dataDesc
      };
      let res = await this.editPromise(temp);
      if (res.status === "success") {
        this.$message({
          message: "修改成功！",
          type: "success"
        });
        this.searchTable();
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    /* ***********删除******************************** */
    delList(dictId) {
      this.$confirm("确认删除此字典编码？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delSureFun(dictId);
        })
        .catch(() => {});
    },
    async delSureFun(dictId) {
      let temp = {
        dictId: dictId
      };
      let res = await this.delPromise(temp);
      if (res.status === "success") {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.doSearch();
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    /* ***********字典项页面init******************************** */
    setDetail(item) {
      this.currentDic = item.dictCode;
      this.isMain = false;
      this.doTermSearch();
    },
    passTermChange(val) {
      this.pageTermMsg.currentPage = val;
      this.searchTermTable();
    },
    sizeTermChange(val) {
      this.pageTermMsg.pageSize = val;
      this.pageTermMsg.currentPage = 1;
      this.searchTermTable();
    },
    doTermSearch() {
      this.pageTermMsg.currentPage = 1;
      this.searchTermTable();
    },
    async searchTermTable() {
      let temp = {
        dictCode: this.currentDic, //数据编码
        dataCode: this.searchTermObj.dataCode, //数据名称/值
        dataValue: this.searchTermObj.dataValue, //业务类型
        // pageSize: this.pageTermMsg.pageSize,
        // pageNum: this.pageTermMsg.currentPage
      };
      let res = await this.tableTermPromise(temp);      
      if (res.status === "success") {
        let data = res.data;
        if (data.length > 0) {
          data.map((v, k) => {
            v.status = 1; //1表示显示状态2表示可编辑状态
          });
        }
        this.tableTermData = data;
        // this.pageTermMsg.total = '';
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    /* ***********字典项页面--新增******************************** */
    addTermList() {
      this.dicTermDialog = true;
      this.dataTitle = "新增字典项";
      this.searchTermTable();
    },
    addSureTermFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addTermValiFun();
        }
      });
    },
    async addTermValiFun() {
      let temp = {
        dictCode: this.currentDic,
        dataCode: this.addTermFormObj.dataCode,
        dataValue: this.addTermFormObj.dataValue,
        sortNo: this.addTermFormObj.sortNo,
        dataDesc: this.addTermFormObj.dataDesc
      };
      let bsType = this.addFormObj.businessType;
      let res = await this.addTermPromise(temp);
      if (res.status === "success") {
        this.$message({
          message: "新增字典项成功！",
          type: "success"
        });
        this.cancelTermAdd("addTermForm");
        //新增之后查询
        this.searchTermTable();
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    handleTermClose() {
      this.cancelTermAdd("addTermForm");
    },
    cancelTermAdd(formName) {
      this.$refs[formName].resetFields();
      this.dicTermDialog = false;
    },
    /* ***********字典项页面--修改******************************** */
    editTermList(item) {
      item.status = 2;
    },
    async saveTermList(item) {
      if (!item.dataValue) {
        this.$message({
          message: "字典项值不能为空!",
          type: "warning"
        });
        return false;
      }
      if (!item.dataDesc) {
        this.$message({
          message: "字典描述不能为空!",
          type: "warning"
        });
        return false;
      }
      let regEn = new RegExp("^[0-9]*[1-9][0-9]*$");
      if (!regEn.test(item.sortNo)) {
        this.$message({
          message: "排序为正整数!",
          type: "warning"
        });
        return false;
      }
      let temp = {
        dataValue: item.dataValue,
        dictItemId: item.dictItemId,
        dataDesc: item.dataDesc,
        sortNo: item.sortNo
      };
      let res = await this.editTermPromise(temp);
      if (res.status === "success") {
        this.$message({
          message: "修改成功！",
          type: "success"
        });
        this.searchTermTable();
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    /* ***********字典项页面--删除******************************** */
    delTermList(dictItemId) {
      this.$confirm("确认删除此字典项？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delTermSureFun(dictItemId);
        })
        .catch(() => {});
    },
    async delTermSureFun(dictItemId) {
      let temp = {
        dictItemId: dictItemId
      };
      let res = await this.delTermPromise(temp);
      if (res.status === "success") {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.searchTermTable();
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }
    },
    /* ***********table 合并列******************************** */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {      
      if (columnIndex === 0&&rowIndex === 0) {        
        return {
          rowspan: this.tableTermData.length,
          colspan: 1
        };
      }
    },
    goBack(){
      this.isMain = true;
      //初始化数据
      this.searchTermObj = {
        dataCode: "", //数据项编码
        dataValue: ""
      };
      this.tableTermData = [];
      this.pageTermMsg = {
        currentPage: 1,
        total: 0,
        pageSize: 10
      }
    },
    async getSelect(){    
      let temp = {
        dictCode: 'system_business', //数据编码
        dataCode: '', //数据名称/值
        dataValue: '', //业务类型
        // pageSize: this.pageTermMsg.pageSize,
        // pageNum: this.pageTermMsg.currentPage
      };
      let res = await this.tableTermPromise(temp);      
      if (res.status === "success") {        
        this.typeObj = res.data; 
        
      } else {
        this.$message({
          message: res.data.errMsg,
          type: "warning"
        });
      }



    },
    /* ***********字典项页面end******************************** */

    init() {
      this.getSelect();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style  lang="less">
.dialog-footer {
  text-align: center;
}
.term-cursor {
  cursor: pointer;
}
.term-cursor:hover {
  color: #57a3f3;
  cursor: pointer;
}
.term-arr {
  color: #999;
  font-weight: normal;
}
.term-sub {
  color: #999;
  font-size: 14px;
  font-weight: normal;
}
</style>
