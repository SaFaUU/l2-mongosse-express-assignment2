import { Request, Response } from 'express'
import UserServices from './user.service'
import User from './user.model'
import { userValidation, orderValidation } from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { error, value } = userValidation.validate(userData)
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      })
    } else {
      const result = await UserServices.createUserDB(userData)
      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      })
    }
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
    const { error, value } = userValidation.validate(req.body)
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      })
    } else {
      const result = await UserServices.updateSingleUserFromDB(
        Number(userId),
        req.body,
      )
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      })
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

const addProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    console.log(req.body)
    const { error, value } = orderValidation.validate(req.body)
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      })
    } else {
      await UserServices.addProductDB(Number(userId), req.body)

      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
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
const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    const result = await UserServices.getOrdersFromDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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
const getOrdersTotal = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    if (!(await User.isUserExists(Number(userId)))) {
      throw new Error('User not found!')
    }
    const result = await UserServices.getOrdersTotalDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
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
  getOrders,
  getOrdersTotal,
}
