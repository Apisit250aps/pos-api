import { Router } from 'express'
import { authUser, createUser, userLogin } from '../controllers/auth'
import { authenticate } from '../middlewares/authenticate'

const auth = Router()
auth.post('/register', createUser)
auth.post('/login', userLogin)
auth.get('/', authenticate, authUser)
export default auth
