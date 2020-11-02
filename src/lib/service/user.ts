/*
 * @Description: userService
 * @Author: your name
 * @Date: 2019-10-10 14:46:06
 * @LastEditors  : wujing
 * @LastEditTime : 2019-12-31 16:24:57
 */
import { provide, inject } from 'midway'

import { IUserModel } from '../model/user'
import { IUserService, IUserData } from '../../interface'

@provide('userService')
export class UserService implements IUserService {

  // constructor(
  //   @inject('userModel') private readonly userModel:IUserModel
  // ){}
  @inject()
  userModel!: IUserModel

  public async saveUserInfo(userInfo: IUserData) {
    const result = await this.userModel.create(userInfo)

    return result.id
  }

  /**
   * @description 获取所有用户信息
   */
  public async findAllUserInfo() {
    const result = await this.userModel
      .findAndCountAll()
    return result
  }

  /**
   * @description 根据用户Id获取用户信息
   * @param id {number} userId
   */
  public async findUserInfoById(id: number) {
    console.log(id)
    const result = await this.userModel
      .findAndCountAll({
        limit: 10,
        offset: 1,
      })
    return result
  }

  /**
   * @description 根据用户名获取用户信息
   * @param id {number} userName
   */
  public async findUserInfoByName(name: string) {
    console.log(name)
    return await this.userModel
      .findOne({
        where: { name },
      })
  }

}
