import { Request, Response } from 'express'
import { IResponse } from '../types/types'
import User, { IUser } from '../models/users'

export const createUser = async (
  req: Request,
  res: Response<IResponse>
): Promise<void> => {
  try {
    const { username, password } = req.body as IUser
    const isExistUser = await User.findOne({ username })
    if (isExistUser) {
      res.status(400).json({
        success: false,
        message: 'Username already exists',
      } as IResponse)
      return
    }
    const newUser = new User({ username, password })
    await newUser.save()
    res.status(201).json({
      success: true,
      message: 'User created successfully',
    } as IResponse)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    } as IResponse)
    return
  }
}

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      } as IResponse)
      return
    }
    const isMatch = await user.authentication(password)
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      } as IResponse)
      return
    }

    const token = user.generateAuthToken()

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user,
      },
    } as IResponse)
    return
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Server Error!', success: false } as IResponse)
    return
  }
}

export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req
    const auth = await User.findOne({ _id: user.userId })

    res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      data: { auth },
    })
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error!',
    } as IResponse)
    return
  }
}
