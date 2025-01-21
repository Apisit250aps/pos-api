import { Router } from 'express'
import auth from './auth'
import inventory from './inventory'
import category from './category'
import { authenticate } from '../middlewares/authenticate'

const route = Router()
route.use('/auth', auth)
route.use(authenticate)
route.use('/inventory', inventory)
route.use('/category', category)
export default route
