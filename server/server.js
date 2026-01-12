import express from 'express'
import AuthRoutes from './src/routes/auth.routes.js'
import JobsRoutes from './src/routes/jobs.routes.js'
import ApplicationRoutes from './src/routes/application.routes.js'
import ProjectRoutes from './src/routes/projects.routes.js'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
const app = express()

app.set('trust proxy', 1);

const allowedOrigins = [  
    "https://skill-bridge-lilac.vercel.app",
  "http://localhost:5173"]
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())
app.get('/', (req, res)=>{
    res.send("OM SHREE GANESHAY NAMAHA, server is running!")
})

app.use('/api/auth', AuthRoutes)
app.use('/api/jobs', JobsRoutes)
app.use('/api/applications', ApplicationRoutes)
app.use('/api/projects', ProjectRoutes)

const port = process.env.PORT
app.listen(port, (req,res)=>{
    console.log(`The server is running on port http://localhost:${port}`)
})