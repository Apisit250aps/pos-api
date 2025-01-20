import { Document, model, Schema } from 'mongoose'

export interface IInventory extends Document {
  itemName: string
  cost: number
  itemQuantity: number
  quantity: number
  unit: string
  stock: number
  stockUnit: string
  minStock: number
  useRecipe(use: number): Promise<number>
}

const inventorySchema = new Schema<IInventory>(
  {
    itemName: { type: String, required: true, unique: true },
    cost: { type: Number, required: true },
    itemQuantity: { type: Number, default: 1, min: 0 },
    quantity: { type: Number, default: 1, min: 0 },
    unit: { type: String, required: true },
    stock: { type: Number, default: 1, min: 0 },
    stockUnit: { type: String, required: true },
    minStock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
)

inventorySchema.pre<IInventory>('save', function () {})
inventorySchema.methods.useRecipe = async function (
  use: number
): Promise<number> {
  try {
    if (use < 0) {
      throw new Error('Use amount cannot be negative')
    }

    if (this.quantity < use) {
      const useQ = use - this.quantity

      if (this.stock < 1) {
        throw new Error('Not enough stocks available')
      }

      this.stock -= 1
      this.quantity = this.itemQuantity - useQ
    } else {
      this.quantity -= use
    }
    return this.quantity
  } catch (error) {
    throw new Error(`Error using recipe`)
  }
}
const Inventory = model<IInventory>('inventories', inventorySchema)
export default Inventory
