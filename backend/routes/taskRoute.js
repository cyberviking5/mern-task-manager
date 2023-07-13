const express=require('express')
const Task=require('../models/taskModel')
const { createTask,getTasks,getTask,deleteTask, updateTask } = require('../controllers/taskController')

const router=express.Router()
//Create a task
router.post("/",createTask)
//Get/Read Task
router.get("/",getTasks)
//get a particular Task
router.get("/:id",getTask)
//Delete a task
router.delete("/:id",deleteTask)
//Update a task
router.put("/:id",updateTask)
// router.patch("/api/tasks/:id",updateTask)


//OR

//router.route("/").get(getTasks).post(createTask)
//router.route(":id").get(getTask).delete(deleteTask).put(updateTask)


module.exports=router