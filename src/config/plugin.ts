/*
 * @Description: file content
 * @Author: your name
 * @Date: 2019-10-10 09:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-15 17:10:49
 */
// import { EggPlugin } from 'midway'
// export default {
//   static: true, // default is true
// } as EggPlugin


export const jwt = {
  enable: true,
  package: 'egg-jwt',
}
export const redis = {
  enable: true,
  package: 'egg-redis',
}

export const mysql = {
  enable: true,
  package: 'egg-mysql',
}
