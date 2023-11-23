import { TUser } from './user.interface'
import UserModel from './user.model'

const createUserDB = async (userData: TUser) => {
  const result = await UserModel.create(userData)
  return result
}
const getUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  )
  return result
}

const UserServices = {
  createUserDB,
  getUserFromDB,
}
export default UserServices
