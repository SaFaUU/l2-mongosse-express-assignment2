import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/api/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// global handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Something Went wrong',
    })
  }
})

export default app
