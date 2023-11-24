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
router.put('/:userId/orders', UserControllers.addProduct)

export const UserRoutes = router
