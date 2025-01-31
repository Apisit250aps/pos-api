import { Router } from 'express'
import { getInventory, inputInventory } from '../controllers/inventory'
import { addItemCategory, deleteItemCategory, editItemCategory, getItemCategories } from '../controllers/item_category';

const inventory = Router()
inventory.get('/', getInventory)
inventory.post('/', inputInventory)

inventory.get('/category', getItemCategories)
inventory.post('/category', addItemCategory)
inventory.put('/category/:id', editItemCategory)
inventory.delete('/category/:id', deleteItemCategory)
export default inventory