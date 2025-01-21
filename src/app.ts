import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import route from './routes'
import path from 'path'
import config, { useStatic } from './config'

const mediaDir = useStatic({ dir: config.path.media })
const publicDir = useStatic({ dir: config.path.public, root: false })
const staticDir = useStatic({ dir: config.path.static, root: false })
const app = express()
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/favicon.ico')));
app.use(publicDir.url, express.static(publicDir.directory))
app.use(staticDir.url, express.static(staticDir.directory))
app.use(mediaDir.url, express.static(mediaDir.directory))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(config.corsOptions))
app.use(helmet())

app.use(route)

export default app
