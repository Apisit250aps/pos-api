import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import route from './routes';
import path from 'path';

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(route)

export default app
