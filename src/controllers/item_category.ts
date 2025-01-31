import { Request, Response } from 'express';
import { IResponse } from '../types/types';
import ITemCategory, { IItemCategory } from '../models/item_categories';

export async function addItemCategory(
  req: Request,
  res: Response<IResponse<IItemCategory>>
): Promise<void> {
  try {
    const { name, description }: IItemCategory = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields!',
      });
      return;
    }
    const existItemCategory = await ITemCategory.findOne({ name });
    if (existItemCategory) {
      res.status(400).json({
        success: false,
        message: 'Item category already exists',
      });
      return;
    }
    const itemCategory = new ITemCategory({ name, description });
    await itemCategory.save();
    res.status(201).json({
      success: true,
      message: 'Item category created successfully',
      data: itemCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
  }
  return;
}

export async function editItemCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, description }: IItemCategory = req.body;
    const itemCategory = await ITemCategory.findByIdAndUpdate(
      { _id: id },
      { name, description },
      { new: true }
    );
    if (!itemCategory) {
      res.status(404).json({
        success: false,
        message: 'Item category not found',
      });
      return;
    }
    res.json({
      success: true,
      message: 'Item category updated successfully',
      data: itemCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
  }
  return;
}

export async function deleteItemCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const itemCategory = await ITemCategory.findByIdAndDelete(id);
    if (!itemCategory) {
      res.status(404).json({
        success: false,
        message: 'Item category not found',
      });
      return;
    }
    res.json({
      success: true,
      message: 'Item category deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
  }
  return;
}

export async function getItemCategories(
  req: Request,
  res: Response<IResponse<IItemCategory[]>>
): Promise<void> {
  try {
    const itemCategories = await ITemCategory.find({});
    res.json({
      success: true,
      message: 'Item categories fetched successfully',
      data: itemCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
  }
  return;
}