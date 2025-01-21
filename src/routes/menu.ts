import { Router } from 'express'
import { createMenu } from '../controllers/menu'
import { media } from '../configs/upload'

const upload = media('menu')

const menu = Router()
menu.post('/', upload.single('image'), createMenu)
export default menu
