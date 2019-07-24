<template>
  <div class="pagination">
    <el-pagination v-if="pageMsg.total>10" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageMsg.currentPage"  :total="pageMsg.total" :page-size="pageMsg.pageSize"  :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper"  align="right">
    </el-pagination>
  </div>
</template>

<script>
import ElementUI from 'element-ui'

export default {
  data () {
    return {}
  },
  props: {
    pageMsg: {
      type: Object,
      default: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  components: {},
  computed: {},
  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('currentChange', val)
    }
  },
  mounted () {}
}
</script>

<style scoped="scoped">
@import url("../styles/common.css");
.pagination{
  margin:20px 80px 0px 0px;
}
.el-pagination {
  color: #666;
  font-weight: 400;
}

.el-pager li.number {
  border: 1px solid #c0c4cc !important;
  min-width: 30px;
  border-radius: 5px;
  margin: 0 5px;
}
.el-pager li.active {
  color: #fff;
  background-color: #42B983;
}
</style>
