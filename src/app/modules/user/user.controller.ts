import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response) => {
  const userData = req.body
  console.log(req.body)
}
export const UserControllers = {
  createUser,
}
