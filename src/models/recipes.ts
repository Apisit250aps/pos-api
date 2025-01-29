import { ObjectId, Document, Schema, model } from 'mongoose';

export interface IRecipe extends Document {
  menu: ObjectId;
  item: ObjectId;
  quantity: number;
  unit: string;
}

const recipeSchema = new Schema<IRecipe>(
  {
    menu: { type: Schema.Types.ObjectId, ref: 'menus' },
    item: { type: Schema.Types.ObjectId, ref: 'inventories' },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

const Recipe = model<IRecipe>('recipes', recipeSchema);

export default Recipe;
