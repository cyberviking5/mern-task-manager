import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { toast } from 'react-toastify'
import axios from 'axios'
import { URL } from '../App'
import loadingImg from '../assets/loader.gif'

const TaskList = () => {
    const [tasks,setTasks]=useState([])
    const [completedTasks,setcompletedTasks]=useState([])
    const [isLoading,setisLoading]=useState(false)
    const [formData,setformData]=useState({
        name:"",
        compeleted:false
    })
    const [isEditing,setIsEditing]=useState(false)
    const [taskID,setTaskID]=useState("")
    const {name}=formData
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setformData({...formData,[name]:value})
    }
    const createTask=async(e)=>{
        e.preventDefault()
        if(name===""){
            return toast.error("input field cannot be empty")
        }
        try{
            await axios.post(`${URL}/api/tasks`,formData)
            toast.success("Task added successfully")
            setformData({...formData,name:""})
        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
        getTasks()
    }
    const getTasks=async()=>{
        setisLoading(true)
        try{
            const {data}=await axios.get(`${URL}/api/tasks`)
            setTasks(data)
            setisLoading(false)
        }catch(error){
            toast.error(error.message)
            setisLoading(false)
        }
    }
    const deleteTask=async (id)=>{
        try{
            await axios.delete(`${URL}/api/tasks/${id}`)
            getTasks();
        }catch(error){
            toast.error(error.message)
            console.log(error)
        }

    }
    const getSingleTask=async(task)=>{
        setformData({name:task.name,compeleted:false})
        setTaskID(task._id)
        setIsEditing(true)
    }
    useEffect(()=>{
        const cTask=tasks.filter((task)=>{
            return task.compeleted===true
        })
        setcompletedTasks(cTask)
    },[tasks])
    const updateTask=async(e)=>{
        e.preventDefault();
        if(name===""){
            return toast.error("Input field cannot be empty")
        }
        try{
            await axios.put(`${URL}/api/tasks/${taskID}`,formData)
            setformData({...formData,name:""})
            setIsEditing(false)
            getTasks()
        }catch(error){
            toast.error(error.message)
        }
    }
    const setToComplete=async(task)=>{
        const newFormData={
            name:task.name,
            compeleted:true
        }
        try{
            await axios.put(`${URL}/api/tasks/${task._id}`,newFormData)
            getTasks()
        }catch(error){
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getTasks();
    },[])
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing } updateTask={updateTask}/>
      {tasks.length>0 && (<div className="--flex-between --pb">
        <p><b>Total Tasks:</b>{tasks.length}</p>
        <p><b>Completed Tasks:</b>{completedTasks.length}</p>
      </div>)}
      <hr/>
      {
        isLoading && <div className='--flex-center'>
            <img src={loadingImg} alt="image"/>
        </div>
      }
      {
        !isLoading && tasks.length===0 ? (<p className='--py'> No Task Found</p>):(
            <>
            {tasks.map((task,index)=>{
                return <Task key={task._id} task={task} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setToComplete={setToComplete}/>
            })}
            </>
        )
      }
    </div>
  )
}

export default TaskList
