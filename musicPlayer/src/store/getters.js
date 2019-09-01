/*
 * @Author: 李浩栋
 * @Begin: 2019-08-24 11:44:49
 * @Update: 2019-09-01 21:14:04
 * @Update log: 更新日志
 */
const getters = {
  LOGIN_PAGE: state => state.loginPage,
  ICON_SUN: state => state.icontaiyang,
  ICON_NIGHT: state => state.iconyueliang1,
  MODE_TEXT: state => state.modeText,
  LOGIN_STATE: state => state.loginState,
  ACCOUNT_UID: state => state.accountUid,
  LOAD: state => state.load
}

export default getters
