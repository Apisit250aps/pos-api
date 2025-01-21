import { Request, Response } from 'express'
import { IResponse } from '../types/types'
import Menu, { IMenu } from '../models/menus'

export async function createMenu(
  req: Request,
  res: Response<IResponse<IMenu>>
): Promise<void> {
  try {
    const { name, price, category, description }: IMenu = req.body
    const image = req.file?.path
    if (!name || !price ) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields!',
      })
      return
    }
    const menu = new Menu({ name, price, category, description, image })

    await menu.save()
    res.status(201).json({
      success: true,
      message: 'Menu created successfully',
      data: menu,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    })
  }
}
