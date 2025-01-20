import { Router } from 'express'
import { getInventory, inputInventory } from '../controllers/inventory'

const inventory = Router()
inventory.get('/', getInventory)
inventory.post('/', inputInventory)

export default inventory
