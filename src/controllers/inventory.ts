import { Request, Response } from 'express'
import { IPagination, IResponse } from '../types/types'
import Inventory, { IInventory } from '../models/inventories'

export const inputInventory = async (
  req: Request,
  res: Response<IResponse>
): Promise<void> => {
  try {
    const items: IInventory[] = req.body
    await Inventory.insertMany(items)
    res.status(201).json({
      success: true,
      message: 'Inventory items added successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error occurred',
    })
  }
}

export const getInventory = async (
  req: Request,
  res: Response<IResponse<IInventory[]> & { pagination?: IPagination }>
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query
    

    const [inventories, totalDocs] = await Promise.all([
      Inventory.find({})
        .sort({ _id: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec(),
      Inventory.countDocuments({}),
    ])

    const pagination: IPagination = {
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalDocs / Number(limit)),
      totalDocs,
    }

    res.json({
      success: true,
      message: 'Inventory items fetched successfully',
      data: inventories,
      pagination,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error occurred',
    })
  }
}
