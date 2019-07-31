
<template>
  <section class="idx-main">
    <div class="main">
      <el-radio-group v-model="radio1" @change="btnFun()">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
      </el-radio-group>

      <div class="main-left">
        <el-tree
          :data="data"
          v-if="currentBtn===1"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="id"
          :current-node-key="currentNodekey1"
          :default-expanded-keys="expandedkeys1"
          :default-checked-keys="[5]"
          ref="tree1"
        >
          <span class="span-ellipsis" slot-scope="{ node, data }">
            <span :title="node.label">{{ node.label }}</span>
          </span>
        </el-tree>
        <!-- default-expand-all -->
        <el-tree
          v-if="currentBtn===2"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :current-node-key="currentNodekey"
          :default-expanded-keys="expandedkeys"
          highlight-current
          ref="tree"
          node-key="id"
        >
          <span class="span-ellipsis" slot-scope="{ node, data }">
            <span :title="node.label">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
  </section>
</template>

<script>

import globalFun from "@/common/common";
export default {
  components: {
    
  },
  data() {
    return {
      data: [
        {
          label: "一级 1",
          id: 1,
          children: [
            {
              label: "二级 1-1",
              id: 2,
              children: [
                {
                  label: "三级 1-1-1",
                  id: 3
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          id: 4,
          children: [
            {
              label: "二级 2-1",
              id: 5,
              children: [
                {
                  label: "三级 2-1-1",
                  id: 6
                }
              ]
            },
            {
              label: "二级 2-2",
              id: 7,
              children: [
                {
                  label: "三级 2-2-1",
                  id: 8
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          id: 9,
          children: [
            {
              label: "二级 3-1",
              id: 10,
              children: [
                {
                  label: "三级 3-1-1",
                  id: 11
                }
              ]
            },
            {
              label: "二级 3-2",
              id: 12,
              children: [
                {
                  label: "三级 3-2-1",
                  id: 13
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeData: [],
      currentNodekey: "", //默认选中的节点树
      expandedkeys: [], //默认展开的节点树
      currentNodekey1: "", //默认选中的节点树
      expandedkeys1: [], //默认展开的节点树
      currentBtn: 1,
      radio1: "上海"
    };
  },
  created() {},
  methods: {
    btnFun() {
      if (this.radio1 === "上海") {
        this.currentBtn = 1;
      }
      if (this.radio1 === "北京") {
        this.currentBtn = 2;
        this.setTree();
      }
      if (this.radio1 === "广州") {
        this.currentBtn = 3;
      }
    },
    setTree() {
      let data = [
        { id: 1, name: "一级2", pid: 0 },
        {
          id: 2,
          name:
            "三级211asdfffffffffff垃圾啊来得及发拉鸡蛋里放假啊垃圾服垃圾身份了睡觉啦手机费垃圾身份",
          pid: 5
        },
        { id: 5, name: "二级21", pid: 1 },
        { id: 4, name: "二级22", pid: 1 },
        { id: 3, name: "三级221", pid: 4 },
        { id: 8, name: "一级1", pid: 0 },
        { id: 6, name: "二级11", pid: 8 },
        { id: 7, name: "三级111", pid: 6 },
        { id: 10, name: "一级3", pid: 0 },
        { id: 9, name: "二级31", pid: 10 },
        { id: 16, name: "三级311", pid: 9 },
        { id: 11, name: "二级32", pid: 10 },
        { id: 20, name: "三级321", pid: 11 }
      ];
      let temp = this.arrToTree(data, "pid", 0, "id", "name", "pid");
      this.treeData = temp;
      this.$nextTick(() => {
        let index = this.data[0].children[0].id;
        this.currentNodekey = index;
        this.expandedkeys.push(index);
        this.$refs.tree.setCurrentKey(index);
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    /* 
     数组转换成tree
     @param{list} 数组集合
     @param{parentId} 父类id
     @param{rootName} 根元素的key值
     @param{selfId} 元素id
     @param{label}  label
     
     */
    arrToTree(list, parentId, rootName, selfId, label, pid) {
      let arrGroup = this.arrGroupFun(list, parentId);
      let rootList = arrGroup.filter(item => {
        return item.id == rootName;
      });

      if (rootList.length > 0) {
        return this.arrGroupToTree(
          rootList[0].data,
          arrGroup,
          selfId,
          label,
          pid
        );
      }
    },
    /* 
     数组转换成tree
     @param{list} 根节点数组集合
     @param{arrGroup} 根据id分类的所有数组
     @param{selfId} 元素id
     @param{label} 元素label
     @param{pid} 父类Id
     
     */
    arrGroupToTree(list, arrGroup, selfId, label, pid) {
      let _self = this;

      //每个返回的都是一个数组
      let arr = list.map(item => {
        //obj为每个数组中对象
        let obj = {
          id: item[selfId],
          label: item[label],
          pid: item[pid]
        };
        //arrGroup中element的id为每个list的父元素id
        arrGroup.forEach(element => {
          if (element.id == item[selfId]) {
            obj.children = _self.arrGroupToTree(
              element.data,
              arrGroup,
              selfId,
              label,
              pid
            );
          }
        });
        return obj;
      });

      return arr;
    },
    /* 
     数组对象按照固定字段分组
     @param{arr} 数组集合
     @param{prop} 分类字段   
     */
    arrGroupFun(arr, prop) {
      let dest = [];
      if (arguments.length >= 2 && globalFun.isArrFun(arr)) {
        let map = [];
        arr.forEach(item => {
          if (map.indexOf(item[prop]) === -1) {
            dest.push({
              id: item[prop],
              data: [item]
            });
            map.push(item[prop]);
          } else {
            dest.forEach(ele => {
              if (item[prop] == ele.id) {
                ele.data.push(item);
              }
            });
          }
        });
      }
      return dest;
    },
    init() {
      //设置默认
      this.$nextTick(() => {
        // this.currentNodekey = 1;
        let temp = this.data[0].children[0].id;
        this.currentNodekey1 = temp;
        this.expandedkeys1.push(temp);
        this.$refs.tree1.setCurrentKey(temp);
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped  lang="less">
// 设置高亮显示样式
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #c2d6ea !important;
  color: red;
}
// 设置tree的label过长问题
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.idx-main {
  height: 100%;
}
.main {
  width: 500px;
  margin: 50px auto 0 auto;
  height: 100%;
}
.main-left {
  width: 250px;
  height: 100%;
  bottom: 1px solid #000;
}
</style>
