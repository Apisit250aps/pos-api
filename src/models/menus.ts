import { Document, model, Schema } from 'mongoose'

export interface IMenu extends Document {
  name: string
  price: number
  category: string
  description?: string
  image?: string
  status: boolean
}

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Menu = model<IMenu>('menus', menuSchema)

export default Menu
