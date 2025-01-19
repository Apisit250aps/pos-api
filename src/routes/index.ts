import { Response, Request, Router, RequestHandler } from 'express'

const route = Router()
route.get('/', (req: Request, res: Response) => {
  res.status(200)
  res.render('index', { title: 'EJS with TypeScript', message: 'Hello, TypeScript with EJS!' });
})

route.get('/s')
export default route
