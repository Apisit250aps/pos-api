import { Request, Response } from 'express';
import { IPagination, IResponse } from '../types/types';
import Menu, { IMenu } from '../models/menus';

export async function createMenu(
  req: Request,
  res: Response<IResponse<IMenu>>
): Promise<void> {
  try {
    const { name, price, category, description }: IMenu = req.body;
    const image = req.file?.path;
    if (!name || !price) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields!',
      });
      return;
    }
    const menu = new Menu({ name, price, category, description, image });
    await menu.save();
    res.status(201).json({
      success: true,
      message: 'Menu created successfully',
      data: menu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
  }
}

export async function editMenu(
  req: Request,
  res: Response<IResponse<IMenu>>
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    const image = req.file;
    const menu = await Menu.findByIdAndUpdate(
      id,
      { name, price, category, description, image },
      { new: true }
    );
    if (!menu) {
      res.status(404).json({
        success: false,
        message: 'Menu not found',
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
    return;
  }
}

export async function deleteMenu(
  req: Request,
  res: Response<IResponse<IMenu>>
): Promise<void> {
  try {
    const { id } = req.params;
    const menu = await Menu.findByIdAndDelete(id);
    if (!menu) {
      res.status(404).json({
        success: false,
        message: 'Menu not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Menu deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    });
    return;
  }
}

export async function getMenus(
  req: Request,
  res: Response<IResponse<IMenu[]> & { pagination?: IPagination }>
): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [menus, totalDocs] = await Promise.all([
      Menu.find({})
        .sort({ _id: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec(),
      Menu.countDocuments({}),
    ]);
    const pagination: IPagination = {
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalDocs / Number(limit)),
      totalDocs,
    };
    res.json({
      success: true,
      message: 'Menus fetched successfully',
      data: menus,
      pagination,
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
