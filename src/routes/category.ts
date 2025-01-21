import { Router } from 'express'
import {
  allCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category'

const category = Router()
category.get('/', allCategory)
category.post('/', createCategory)
category.put('/:id', updateCategory)
category.delete('/:id', deleteCategory)
export default category
