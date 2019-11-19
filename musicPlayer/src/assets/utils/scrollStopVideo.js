/*
 * @Author: Lambda
 * @Begin: 2019-11-19 12:37:10
 * @Update: 2019-11-19 13:48:22
 * @Update log: 更新日志
 */
// 判断一个元素是否在视窗内
function isInSport (ele, wra) {
  // 判断该图片是否能够加载，判断图片是否在可视区域内
  const wraHeight = wra.clientHeight
  const rect = ele.getBoundingClientRect()
  // 如果超出视窗返回false
  if (rect.bottom <= (wraHeight + 100) && rect.bottom >= (wraHeight / 2)) {
    return true
  }
  if (rect.top <= (wraHeight + 100) && rect.top >= 0) {
    return true
  }
  return false
}

export default isInSport
