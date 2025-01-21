import app from './app'
import config from './config'
import connectDB from './db'

const main = async () => {
  app.listen(config.port, async () => {
    await connectDB()
    console.log(`Server is running on port ${config.port}`)
  })
}

main()
