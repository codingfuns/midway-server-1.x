/*
 * @Description: 用户信息操作Model层
 * @Author: WJ
 * @Date: 2019-10-10 11:53:10
 * @LastEditors: wujing
 * @LastEditTime: 2020-10-21 14:55:36
 */
import {
  DataType, Table, Model, Column, CreatedAt, UpdatedAt,
} from 'sequelize-typescript'
import { providerWrapper } from 'midway'


const { STRING, INTEGER, BIGINT } = DataType
// using factory style to provide Model because most useful
// sequelize methods are static in Model class. If you use
// @provide style, this class will be initialized when injected.
export const factory = () => UserModel
providerWrapper([
  {
    id: 'userModel',
    provider: factory,
  },
])
// you need to export the type of Model class to ensure
// type-safety outside
export type IUserModel = typeof UserModel


// @Scopes({
//   // a self-defined scope means "non-soft-deleted rows"
//   avaliable: {
//     where: {status: 1},
//   },
// })
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 't_user',
})
export class UserModel extends Model<UserModel> {

  @Column({
    type: BIGINT({ length: 20 }),
    primaryKey: true,
    autoIncrement: true,
    comment: 'user id',
  })
  id !: number

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'user name',
  })
  name!: string

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'user password',
  })
  password!: string

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'emai address',
  })
  email!: string

  @Column({
    type: INTEGER({ length: 20 }),
    allowNull: false,
    comment: 'phone number',
  })
  phone!: number

  @Column({
    type: INTEGER({ length: 20 }),
    allowNull: false,
    comment: 'user identity',
  })
  identity!: number

  @Column({
    type: STRING(16),
    allowNull: false,
    comment: 'user nickname',
  })
  nickname!: string

  @Column({
    type: INTEGER({ length: 3 }),
    allowNull: true,
    comment: 'user age',
  })
  age!: number

  @Column({
    type: STRING(1024),
    allowNull: true,
    comment: 'user age',
  })
  avatar!: string


  @CreatedAt
  @Column
  createTime!: Date

  @UpdatedAt
  @Column
  updateTime!: Date

}
