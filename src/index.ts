import app from './app'
import { PORT } from './configs'
import connectDB from './db'

const main = async () => {
  app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`)
  })
}

main()
