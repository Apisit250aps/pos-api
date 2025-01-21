import mongoose from 'mongoose'
import config from './config'

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUrl as string)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) // exit process with failure
  }
}

export default connectDB
