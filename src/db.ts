import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) // exit process with failure
  }
}

export default connectDB
