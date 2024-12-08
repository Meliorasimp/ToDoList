import React, { useState } from "react";
import { Message } from "react-message-popup";
import axios from "axios";

const EditForm = ({ task, onClose, onSave }) => {
  const [tasktitle, setTasktitle] = useState(task.tasktitle);
  const [taskdescription, setTaskdescription] = useState(task.taskdescription);
  const token = localStorage.getItem('token');

  const handleSave = async () => {
    try {
      const updatedTask = { tasktitle, taskdescription };
      const response = await axios.put(`http://localhost:3000/task/${task._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        onSave(task._id, updatedTask);
        Message.success('Task Updated Successfully');
        onClose();
      } else {
        Message.error('Failed to Update Task');
      }
    } catch (error) {
      console.error('Error in Updating task', error);
      Message.error('Error in Updating task');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-blue-50 p-6 rounded-md shadow-lg w-1/3">
        <div className="flex flex-col">
          <h2 className="text-black">Edit Task</h2>
          <input
            type="text"
            value={tasktitle}
            onChange={(e) => setTasktitle(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={taskdescription}
            onChange={(e) => setTaskdescription(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between">
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Save
            </button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
