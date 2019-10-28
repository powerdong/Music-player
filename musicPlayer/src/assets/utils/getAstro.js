/*
 * @Author: Lambda
 * @Begin: 2019-10-28 12:05:42
 * @Update: 2019-10-28 12:06:27
 * @Update log: 更新日志
 */
export const getAstro = (m, d) => {
  return '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(m * 2 - (d < '102223444433'.charAt(m - 1) - -19) * 2, 2)
}
