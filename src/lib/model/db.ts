/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 15:19:52
 * @LastEditTime: 2019-10-18 20:35:36
 * @LastEditors: Please set LastEditors
 */
import { Sequelize } from 'sequelize-typescript'
import { provide, scope, ScopeEnum } from 'midway'

import { UserModel } from './user'


interface ISequelizeConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  dialect: string
}

// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@scope(ScopeEnum.Singleton)
@provide('DB')
export class DB {

  public static sequelize: Sequelize

  public static async initDB(config: ISequelizeConfig) {
    DB.sequelize = new Sequelize(
      {
        database: config.database,
        username: config.user,
        password: config.password,
        dialect: 'mysql',
        host: config.host,
        port: config.port,
        timezone: '+08:00',
        logging: false,
      },
    )

    // add models here before using them
    DB.sequelize.addModels([UserModel])

    try {
      await DB.sequelize.authenticate()
    }
    catch (error) {
      error.message = `DB connection error: ${error.message}`
      throw error
    }
  }

}
