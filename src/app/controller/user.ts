/*
 * @Description: 接口controller
 * @Author: your name
 * @Date: 2019-10-10 15:23:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-16 20:39:49
 */
import {
  Context, controller, get, provide, inject, post,
} from 'midway'
import * as bcrypt from 'bcrypt'

import { UserService } from '../../lib/service/user'
import { IUserData } from '../../interface'


const SALT_WORK_FACTOR = 10 // 定义加密密码计算强度,从1级到10级，强度越高，密码越复杂，计算时间也越长。
@provide()
@controller('/user')
export class UserController {

  constructor(
    @inject('userService') private userService: UserService,
  ) {}

  /**
   * @description 获取所有用户信息
   * @param ctx Context 上下文
   */
  @get('/getAllUserInfo', { middleware: ['tokenAuthorize'] })
  public async getAllUserInfo(ctx: Context) {
    const data: IUserData[] = await this.userService.findAllUserInfo()
    ctx.body = data
  }

  /**
   * @description 注册
   * @param ctx Context 上下文
   */
  @post('/register', { middleware: ['apiMiddleware'] })
  public async registerMethod(ctx: Context) {
    const userInfo: IUserData = ctx.request.body
    if (userInfo.name && userInfo.password && userInfo.email && userInfo.phone && userInfo.nickname) {
      const user = await this.userService.findUserInfoByName(userInfo.name)
      if (user) {
        ctx.status = 400
        ctx.body = '用户名已被占用！'
      }
      else {
        const salt: string = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const encrypted: string = await bcrypt.hash(userInfo.password, salt)
        userInfo.password = encrypted
        const res = await this.userService.saveUserInfo(userInfo)
        if (res) {
          ctx.status = 200
          ctx.body = '创建成功！'
        }
      }
    }
    else {
      ctx.status = 400
      ctx.body = '参数错误！'
    }

  }

}
