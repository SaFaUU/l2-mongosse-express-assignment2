import { Model } from 'mongoose'

export type TAdress = {
  street: string
  city: string
  country: string
}

export type TFullName = {
  firstName: string
  lastName: string
}
export type TOrderObject = {
  productName: string
  price: number
  quantity: number
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAdress
  orders?: TOrderObject[]
}

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>
}
