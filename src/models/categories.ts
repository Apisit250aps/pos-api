import { Document, model, Schema } from 'mongoose'

export interface ICategory extends Document {
  name: string
  description?: string
  status: boolean
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Category = model<ICategory>('categories', categorySchema)

export default Category
