import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

// will call controller func
router
  .get('/', UserControllers.getUsers)
  .post('/', UserControllers.createUser)
  .get('/:userId', UserControllers.getSingleUser)
  .delete('/:userId', UserControllers.deleteSingleUser)
  .put('/:userId', UserControllers.updateSingleUser)

export const UserRoutes = router
