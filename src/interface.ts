/*
 * @Description: interface
 * @Author: your name
 * @Date: 2019-10-11 14:15:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-18 20:45:22
 */
export interface ILoinModel{
  authorizeUserIdentity(): Promise<any>
}
export interface IUserData{
  name: string
  nickname: string
  password?: string | undefined
  email: string
  phone: number
  identity?: string
  age: number
  avatar: string
  date?: Date
}
export interface IUserInfo{
  data: IUserData
}

export interface IUserService{
  saveUserInfo(arg: IUserData): Promise<any>
  findAllUserInfo(): Promise<IUserData[]>
  findUserInfoById(arg: number): Promise<IUserData>
  findUserInfoByName(arg: string): Promise<IUserData>
}

export interface ILoginData{
  name: string
  password: string
}
export interface IRedisService{
  set(key: string, value: string, time: number): Promise<any>
  get(key: string): Promise<any>
}
