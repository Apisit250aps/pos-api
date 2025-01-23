import { Router } from 'express';
import {
  createMenu,
  deleteMenu,
  editMenu,
  getMenus,
} from '../controllers/menu';
import {
  allCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category';
import { media } from '../configs/upload';

const upload = media('menu');

const menu = Router();
menu.get('/', getMenus);
menu.post('/', upload.single('image'), createMenu);
menu.put('/:id', upload.single('image'), editMenu);
menu.delete('/:id', deleteMenu);

menu.get('/category', allCategory);
menu.post('/category', createCategory);
menu.put('/category/:id', updateCategory);
menu.delete('/category/:id', deleteCategory);
export default menu;
