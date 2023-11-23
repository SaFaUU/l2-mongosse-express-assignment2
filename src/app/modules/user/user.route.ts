import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

// will call controller func
router.get('/', UserControllers.getUsers).post('/', UserControllers.createUser)

export const UserRoutes = router
