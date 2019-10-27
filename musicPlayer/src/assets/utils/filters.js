/*
 * @Author: 李浩栋
 * @Begin: 2019-10-14 14:08:38
 * @Update: 2019-10-27 09:44:05
 * @Update log: 更新日志
 */
export const filterSetPlayCount = value => {
  if (!value) return ''
  if (value > 10000) {
    value = parseInt(value / 10000) + '万'
  } else if (value > 100000000) {
    value = (value / 100000000).toFixed(1) + '亿'
  }
  return value
}

/**
 * 将毫秒转换为 分钟：秒数 的形式
 */
export const filterSetTime = value => {
  if (!value) return ''
  let min = parseInt(value / (1000 * 60))
  if (min < 10) {
    min = '0' + min
  }
  let sec = parseInt(value % (1000 * 60) / 1000)
  if (sec < 10) {
    sec = '0' + sec
  }
  value = `${min}:${sec}`
  return value
}

/**
 * 将毫秒转换为 年.月.日
 */
export const filterSetYear = (value, splitY = '.', splitM = '.', splitD = '') => {
  const oDate = new Date(value)
  const oYear = oDate.getFullYear()
  const oMonth = oDate.getMonth() + 1
  const oDay = oDate.getDate()
  value = `${oYear}${splitY}${oMonth}${splitM}${oDay}${splitD}`
  return value
}

/**
 * 将毫秒设置为 月-日 格式
 */
export const filterSetMonth = (value, splitM = '-', splitD = '') => {
  const oDate = new Date(value)
  let oMonth = oDate.getMonth() + 1
  let oDay = oDate.getDate()
  if (oMonth < 10) {
    oMonth = '0' + oMonth
  }
  if (oDay < 10) {
    oDay = '0' + oDay
  }
  value = `${oMonth}${splitM}${oDay}${splitD}`
  return value
}
