/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 11:32:14
 * @LastEditTime: 2019-10-14 11:40:44
 * @LastEditors: Please set LastEditors
 */
import { plugin, provide } from 'midway'

import { IRedisService } from '../../interface'


@provide('redisService')
export class RedisService implements IRedisService {

  @plugin('redis')
  redis: any

  // 设置
  async set(key: string, value: string, seconds?: number) {
    const res: string = JSON.stringify(value)
    if (! seconds) {
      await this.redis.set(key, res)
    }
    else {
      // 设置有效时间
      await this.redis.set(key, res, 'EX', seconds)
    }
  }

  // 获取
  async get(key: string) {
    let data = await this.redis.get(key)
    if (! data) { return }
    data = JSON.parse(data)
    return data
  }

  // 清空redis
  async flushall() {
    this.redis.flushall()
    return
  }

}
