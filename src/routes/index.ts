import { Router } from 'express'
import auth from './auth'
import inventory from './inventory'
import { authenticate } from '../middlewares/authenticate'
import menu from './menu';

const route = Router()
route.use('/auth', auth)
route.use(authenticate)
route.use('/inventory', inventory)
route.use('/menu', menu)
export default route
