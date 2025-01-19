import app from "./app"
import { PORT } from "./configs"

const main = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

main()