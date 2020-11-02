/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 14:53:18
 * @LastEditTime: 2020-10-21 14:29:46
 * @LastEditors: wujing
 */

// this is a web middleware just for some router

import { WebMiddleware, provide, Context, inject } from 'midway'

import { RedisService } from '../../lib/service/redis'

@provide('tokenAuthorize')
export class TokenAuthorize implements WebMiddleware {

  constructor(
    @inject('redisService') private redisService: RedisService,
  ) {}

  resolve() {
    return async (ctx: Context, next: any) => {
      const { token } = ctx.request.header
      if (token) {
        const userName = await this.redisService.get(token)
        if (userName) {
          await next()
        }
        else {
          ctx.status = 400
          ctx.body = 'token无效！'
        }
      }
      else {
        ctx.status = 400
        ctx.body = 'token缺失！'
      }
    }
  }
}
