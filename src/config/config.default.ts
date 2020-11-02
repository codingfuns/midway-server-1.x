/*
 * @Description: file content
 * @Author: your name
 * @Date: 2019-10-10 09:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-18 15:23:19
 */
import { EggAppInfo } from 'midway'

import { DefaultConfig } from './config.modal'


export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig
  config.security = {
    csrf: {
      enable: false,
    },
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}'

  // add your config here
  config.middleware = []

  config.welcomeMsg = 'Hello midwayjs!'
  config.jwt = {
    secret: '123456',
  }
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  }
  config.redisExpireTime = 24 * 60 * 60
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'midway',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }
  config.sequelize = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'midway',
    dialect: 'mysql',
  }
  return config
}
