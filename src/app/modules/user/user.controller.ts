import { Request, Response } from 'express'
import UserServices from './user.service'
import User from './user.model'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await UserServices.createUserDB(userData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    const result = await UserServices.getSingleUserFromDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    const result = await UserServices.deleteSingleUserFromDB(Number(userId))
    if (result.acknowledged) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    } else {
      throw new Error('User deletion unsuccesful!')
    }
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    const result = await UserServices.updateSingleUserFromDB(
      Number(userId),
      req.body,
    )
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    await UserServices.addProductDB(Number(userId), req.body)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
export const UserControllers = {
  createUser,
  getUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  addProduct,
}
