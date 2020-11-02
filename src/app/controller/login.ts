
/*
 * @Description: In User Settings Edit
 * @Author: wj
 * @Date: 2019-10-10 09:45:40
 * @LastEditTime: 2019-10-18 20:28:18
 * @LastEditors:WJ
 */
import {
  controller, provide, post, Context, inject, plugin, config,
} from 'midway'
import * as bcrypt from 'bcrypt'

import { ILoginData, IUserData } from '../../interface'
import { UserService } from '../../lib/service/user'
import { RedisService } from '../../lib/service/redis'
 @provide()
 @controller('/login')
export class LoginController {

  constructor(
       @inject('userService') private userService: UserService,
       @inject('redisService') private redis: RedisService,
  ) {}

    @plugin('jwt')
  jwt !: any

    @config('jwt')
    jwtConfig !: any

    @config('redisExpireTime')
    redisExpireTime: any

    /**
   * @description 登录获取token
   * @param ctx Context 上下文
   */
    @post('/')
    public async userLogin(ctx: Context) {
      const loginInfo: ILoginData = ctx.request.body
      const userInfo: IUserData = await this.userService.findUserInfoByName(loginInfo.name)
      if (userInfo) {
        const isMatch = await bcrypt.compare(loginInfo.password, userInfo.password as string)
        if (isMatch) {
          const token = this.jwt.sign('payload', this.jwtConfig.secret)
          this.redis.set(token, userInfo.name, this.redisExpireTime)
          this.redis.set(userInfo.name, token, this.redisExpireTime)
          ctx.status = 200
          ctx.body = {
            data: '登录成功！',
            token,
          }
        }
        else {
          ctx.status = 400
          ctx.body = '密码错误！'
        }
      }
      else {
        ctx.status = 400
        ctx.body = '用户不存在'
      }
    }

}
