import express from 'express'
import cors from 'cors'
import path from 'path'
import { __dirname } from './utils/getDirName.js';

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))


// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* middlewares */

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))

import basicRouter from './routes/user.routes.js'

app.use('/api/v1/',basicRouter)

// Route for rendering the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});
export { app }