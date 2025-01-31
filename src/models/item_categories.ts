import { Document, model, Schema } from 'mongoose';

export interface IItemCategory extends Document {
  name: string;
  description?: string;
  status: boolean;
}

const itemCategorySchema = new Schema<IItemCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ITemCategory = model<IItemCategory>(
  'item_categories',
  itemCategorySchema
);

export default ITemCategory;
