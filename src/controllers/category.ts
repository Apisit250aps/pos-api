import { Request, Response } from 'express';
import { IResponse } from '../types/types';
import Category, { ICategory } from '../models/categories';

export async function createCategory(
  req: Request,
  res: Response<IResponse<ICategory>>
): Promise<void> {
  try {
    const { name, description, status } = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Name is required',
      });
      return;
    }
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      res.status(400).json({
        success: false,
        message: 'Category with the same name already exists',
      });
      return;
    }
    const category = new Category({ name, description, status });
    await category.save();
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
    return;
  }
}

export async function allCategory(
  req: Request,
  res: Response<IResponse<ICategory[]>>
): Promise<void> {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'menus', // ชื่อ collection ที่เกี่ยวข้อง (ชื่อ collection ต้องเป็น plural)
          localField: '_id', // ฟิลด์ใน Category ที่จะเชื่อม
          foreignField: 'category', // ฟิลด์ใน Menu ที่เชื่อมโยง
          as: 'menus', // ใส่ข้อมูลเมนูที่เชื่อมโยงในฟิลด์นี้
        },
      },
      {
        $addFields: {
          menuCount: { $size: '$menus' }, // นับจำนวนเมนูในแต่ละ Category
        },
      },
      {
        $project: {
          menus: 0, // ถ้าไม่ต้องการให้รายการเมนูแสดงในผลลัพธ์
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'All categories',
      data: categories,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
    return;
  }
}

export async function updateCategory(
  req: Request<{ id: string }>,
  res: Response<IResponse<ICategory>>
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body as ICategory;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, status },
      { new: true }
    );
    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
    return;
  }
}

export async function deleteCategory(
  req: Request<{ id: string }>,
  res: Response<IResponse<ICategory>>
): Promise<void> {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: category,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
    return;
  }
}
