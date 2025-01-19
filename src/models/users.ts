import { Document, model, Schema } from 'mongoose'
import argon2 from 'argon2'
export interface IUser extends Document {
  username: string
  password: string
  fname?: string
  lname?: string
  mname?: string
  isAdmin: boolean
  isStaff: boolean
  isActive: boolean
  lastLogin?: Date
  authentication(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isStaff: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    fname: { type: String },
    lname: { type: String },
    mname: { type: String },
  },
  { timestamps: true }
)

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await argon2.hash(this.password)
      this.password = hashedPassword
    } catch (err) {
      console.log(err)
      next()
    }
  }
  next()
})

userSchema.methods.authentication = async function (
  password: string
): Promise<boolean> {
  try {
    const isMatch = await argon2.verify(this.password, password)
    return isMatch
  } catch (err) {
    throw new Error('Error verifying password')
  }
}

const User = model<IUser>('users', userSchema)

export default User