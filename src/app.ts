/*
 * @Description: file content
 * @Author: your name
 * @Date: 2019-10-11 11:39:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-18 15:24:13
 */

import { DB } from './lib/model/db'

// build db connections when starting APP
export = (app: any) => {
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...')

    await DB.initDB(app.config.sequelize)

    console.log('✅  Your awesome APP launched')
  })
}
