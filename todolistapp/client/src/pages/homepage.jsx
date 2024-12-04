import { useEffect, useState } from "react";
import axios from 'axios';
import { message } from 'react-message-popup';
import EditForm from '../components/editform';

const Homepage = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/task')
      .then(response => setData(response.data.data))
      .catch(error => console.error('Error Fetching Data:', error));
  }, []);

  const HandleDeleteButton = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/task/${id}`);
      if (response.status === 200) {
        setData(data.filter(item => item._id !== id));
        message.success('Task Deleted Successfully');
      } else {
        message.error('Failed to Delete Task');
      }
    } catch (error) {
      console.error('Error in Deleting task', error);
      message.error('Error in Deleting task');
    }
  };
  
  const HandleEditButton = (tasks) => {
    setCurrentTask(tasks);
    setIsEditing(true);
  }

  const HandleSaveButton = (id, updatedTask) => {
    setData(data.map(item => item._id === id ? { ...item, ...updatedTask } : item));
    message.success('task updated successfully');
  };

  const HandleClose = () => {
    setIsEditing(false);
    setCurrentTask(null);
  }

  return (
    <div className="min-h-screen">
      <h1 className="flex justify-center mt-32 font-mono mb-5 text-xl md:text-2xl lg:text-3xl">Tasks to Accomplish</h1>
      <div className="w-full md:w-10/12 lg:w-8/12 m-auto p-4">
        {data.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available. Add a new task to get started!</p>
          ) : (
            <ul>
              {data.map((item) => (
                <li key={item._id} className="mb-4 p-4 rounded-md shadow-md bg-blue-900 flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <h2 className="text-xl md:text-2xl lg:text-3xl mb-2">{item.tasktitle}</h2>
                    <p className="text-md md:text-lg lg:text-xl">{item.taskdescription}</p>
                  </div>
                  <div className="flex gap-4 md:gap-10">
                    <button className="w-full md:w-auto bg-red-600 h-12 text-white px-4 py-2 rounded hover:bg-red-900" onClick={() => HandleDeleteButton(item._id)}>Delete</button>
                    <button className="w-full md:w-auto bg-green-600 h-12 text-white px-4 py-2 rounded hover:bg-green-900" onClick={() => HandleEditButton(item)}>Edit</button>
                  </div>
                </li>
              ))}
            </ul>
        )}
      </div>
      {isEditing && currentTask && (
        <EditForm
          task={currentTask}
          onClose={HandleClose}
          onSave={HandleSaveButton}
        />
      )}
    </div>
  ); 
}

export default Homepage;
