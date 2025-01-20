import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../configs'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    res.status(401).json({ error: 'No token provided' })
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token as string, JWT_SECRET as string)
    req.user = decoded // Attach the decoded payload to the request object
    next() // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
