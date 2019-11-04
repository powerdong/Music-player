/*
 * @Author: Lambda
 * @Begin: 2019-11-01 13:07:59
 * @Update: 2019-11-04 13:40:35
 * @Update log: 更新日志
 */
/**
 * 传入关键字和内容，将内容中含有关键字的部分添加对应的高亮样式
 * @param {*} keyword
 * @param {*} val
 */
export const filterSetKeyWords = (keyword, val, property) => {
  let results = []
  const _val = val
  _val.map((item, index) => {
    if (keyword && keyword.length > 0) {
      // 匹配关键字正则
      let replaceReg = new RegExp(keyword, 'g')
      // 高亮替换v-html值
      let replaceString =
        `<i style="color: #3399EA">${keyword}</i>`
      _val[index][property] = item[property].replace(
        replaceReg,
        replaceString
      )
    }
  })
  results = _val
  return results
}
