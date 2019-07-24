const newfixURL = '/base/';

const DI = {  
  /* *********************字典管理************************************ */
   // 获取字典管理列表
   selectPageDictList: newfixURL + 'selectPageDictList',
   // 新增
   addDict: newfixURL + 'addDict',
   // 删除
   deleteDict: newfixURL + 'deleteDict',
   // 编辑
   updateDict: newfixURL + 'updateDict',
  /* *******************字典项管理************************************** */
  // 获取字典项目列表
  selectDictItemList: newfixURL + 'selectDictItemList',
  // 新增
  addDictItem: newfixURL + 'addDictItem',
  // 删除
  deleteDictItem: newfixURL + 'deleteDictItem',
  // 编辑
  updateDictItem: newfixURL + 'updateDictItem'
  /* ********************************************************* */
}

export default DI
