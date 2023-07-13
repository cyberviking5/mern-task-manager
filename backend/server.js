const dotenv=require("dotenv").config()

const express=require("express")

const connectDB=require('./config/connectDB')

const mongoose=require('mongoose')

const Task=require('./models/taskModel')

const taskRoutes=require('./routes/taskRoute')

const cors=require('cors')

const app=express();

//MiddleWare
app.use(express.json())
app.use(cors())
app.use("/api/tasks",taskRoutes)
// const logger=(req,res,next)=>{
//     console.log("Middleware ran")
//     console.log(req.method)
//     next()
// }


//Routes
const PORT=process.env.PORT || 5000
// app.get('/',(req,res)=>{
//     res.send("Home Page")
// })







mongoose
.connect(process.env.MONGO_URI)
.then(()=>
{console.log("connected to MONGODB");app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})}
)
.catch((e)=>{console.log(e)})
