import axios from "axios";
import { useState } from "react";
import { message } from "react-message-popup";


const createtask = () => {
  const[taskTitle, setTaskTitle] = useState('');
  const[taskDescription, setTaskDescription] = useState('');

  const HandleSubmit = async(event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/task', {
        tasktitle: taskTitle,
        taskdescription : taskDescription
      });
      console.log('Successfully created the products');
      setTaskTitle('');
      setTaskDescription('')
      message.success('Task Created Successfully :D')
    }
    catch (error) {
      console.error('Error creating task!', error);
      message.error('Error in Creating your task :(')
    }
  }

  return (
    <div className='min-h-screen'>
      <h1 className="font-sans mt-32 mb-10 text-4xl text-center">Create a Task</h1>
      <form onSubmit={HandleSubmit} className="flex flex-col items-center gap-20">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title..."
        className="h-10 w-1/3 bg-white rounded-md text-2xl text-black"
      />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description"
        className="h-10 w-1/3 bg-white rounded-md text-2xl text-black"
      ></input>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-40 text-xl border-none hover:bg-blue-900 transition transition-duration-100">Create Task</button>
    </form>
    </div>
  )
}

export default createtask;
