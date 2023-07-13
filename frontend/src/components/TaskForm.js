import React from 'react'

const TaskForm = ({createTask,handleInputChange,name,isEditing,updateTask}) => {
  return (
    <form className='task-form' onSubmit={isEditing?updateTask:createTask}>
      <input type='text' placeholder='Add a Task' name='name' value={name} onChange={handleInputChange}></input>
      <button type='submit'>{isEditing?"Edit":"Add"}</button>
    </form>
  )
}

export default TaskForm
