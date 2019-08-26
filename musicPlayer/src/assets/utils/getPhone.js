/*
 * @Author: 李浩栋
 * @Begin: 2019-08-26 13:35:48
 * @Update: 2019-08-26 13:47:13
 * @Update log: 更新日志
 */
export function getPhone () {
  // 创建一个正则表达式
  let reg = new RegExp(/\d*$/)
  // window.location.hash 返回从 “#” 开始的 url
  // 返回一个数组（未匹配到则返回 null）
  let phone = reg.exec(window.location.hash)[0]
  return phone
}
