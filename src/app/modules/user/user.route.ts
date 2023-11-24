import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

// User Routes
router
  .get('/', UserControllers.getUsers)
  .post('/', UserControllers.createUser)
  .get('/:userId', UserControllers.getSingleUser)
  .delete('/:userId', UserControllers.deleteSingleUser)
  .put('/:userId', UserControllers.updateSingleUser)

// Order Management
router
  .get('/:userId/orders', UserControllers.getOrders)
  .put('/:userId/orders', UserControllers.addProduct)
  .get('/:userId/orders/total-price', UserControllers.getOrdersTotal)

export const UserRoutes = router
