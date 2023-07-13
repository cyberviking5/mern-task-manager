const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB Connected`)
    }catch(error){
        console.log(error)
        process.exit (1);
    }
}
module.exports=connectDB

// Write the below code in server.js 
//That will be method one 


// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`)
// })
// connectDB();
// //ONE METHOD
// const startServer=async()=>{
//     try{
//         await connectDB();
//         app.listen(PORT,()=>{
//             console.log(`Server running on port ${PORT}`)
//         })
//     }catch(error){
//         console.log(error)
//     }
// }
// startServer();
//mongodb+srv://<username>:<password>@aviralkacluster.csk2kpq.mongodb.net/?retryWrites=true&w=majority