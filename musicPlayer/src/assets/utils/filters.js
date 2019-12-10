/*
 * @Author: 李浩栋
 * @Begin: 2019-10-14 14:08:38
 * @Update: 2019-12-10 13:40:19
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

export const filterAge = time => {
  if (!time) {
    // 这里是因为默认值为0的话会返回1970
    // 当传入默认值退出
    return
  }
  let year = new Date(time).getFullYear()
  const nowYear = new Date().getFullYear()
  let age = ''
  // 存下从1950年到现在时间每5年一个间隔的数值
  let ages = []
  for (let i = 1950; i < nowYear; i += 5) {
    ages.push(i)
  }
  // 这里不能使用 forEach 因为forEach无法跳出循环！！！
  for (let i = 0; i < ages.length; i++) {
    const ele = ages[i]
    if (year <= ele + 5) {
      // 找到第一个满足条件的年份，拆分成数组，截取最后两位，组合返回
      age = ele.toString().split('').splice(-2).join('')
      break
    }
  }
  return age
}

export const filterJson = json => {
  return JSON.parse(json.toString())
}
