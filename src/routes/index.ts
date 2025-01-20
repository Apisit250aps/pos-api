import { Response, Request, Router, RequestHandler } from 'express'
import auth from './auth'
import inventory from './inventory'

const route = Router()
route.get('/', (req: Request, res: Response) => {
  res.status(200)
  res.render('index', {
    title: 'EJS with TypeScript',
    message: 'Hello, TypeScript with EJS!',
  })
})

route.use('/auth', auth)
route.use('/inventory', inventory)
export default route
