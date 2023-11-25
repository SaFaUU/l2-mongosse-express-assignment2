import { TUser } from './user.interface'
import User from './user.model'

const createUserDB = async (userData: TUser) => {
  const result = await User.create(userData)

  const sanitizedResult = result.toObject()
  delete (sanitizedResult as any).orders
  delete (sanitizedResult as any).password
  delete (sanitizedResult as any).fullName._id
  delete (sanitizedResult as any).address._id
  delete (sanitizedResult as any)._id
  delete (sanitizedResult as any).createdAt
  delete (sanitizedResult as any).updatedAt
  delete (sanitizedResult as any).__v

  return sanitizedResult
}
const getUserFromDB = async () => {
  const result = await User.find({}).select(
    '-_id -fullName._id -userId -createdAt -updatedAt -__v -orders -hobbies -address._id -isActive',
  )

  return result
}
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.find({ userId }).select(
    '-_id -fullName._id -createdAt -updatedAt -__v -orders -address._id',
  )

  return result
}
const deleteSingleUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId })
  return result
}
const updateSingleUserFromDB = async (userId: number, userData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { userData },
    {
      new: true,
    },
  ).select('-_id -fullName._id -createdAt -updatedAt -__v -orders -address._id')
  return result
}
const addProductDB = async (userId: number, userData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    {
      $addToSet: {
        orders: userData,
      },
    },
  )
  return result
}

const getOrdersFromDB = async (userId: number) => {
  const result = await User.find({ userId }).select(
    '-orders._id -_id -userId -username -fullName -age -createdAt -updatedAt -__v -hobbies -address -email -isActive',
  )

  return result
}
const getOrdersTotalDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: '$_id',
        totalAmount: { $sum: '$orders.price' },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
      },
    },
  ])

  return result
}

const UserServices = {
  createUserDB,
  getUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
  addProductDB,
  getOrdersFromDB,
  getOrdersTotalDB,
}
export default UserServices
