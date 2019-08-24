/*
 * @Author: 李浩栋
 * @Begin: 2019-08-24 11:44:49
 * @Update: 2019-08-24 12:25:48
 * @Update log: 更新日志
 */
const getters = {
  LOGIN_PAGE: state => state.loginPage,
  ICON_SUN: state => state.icontaiyang,
  ICON_NIGHT: state => state.iconyueliang1,
  MODE_TEXT: state => state.modeText,
  LOGIN_STATE: state => state.loginState,
  ACCOUNT_UID: state => state.accountUid
}

export default getters
