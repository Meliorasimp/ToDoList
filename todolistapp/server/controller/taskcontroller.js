import taskmodel from "../model/taskmodel.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const gettask = async(req, res) => {
    try {
      const gettask = await taskmodel.find({})
      res.status(201).json({success: true, data: gettask})
    }
    catch(error){
      console.log('Server error')
      res.status(500).json({success: false, message: 'Cannot find the data of Products'})
    }
};

export const posttask = async(req, res) => {
    const tasks = req.body;
    if(!tasks.tasktitle || !tasks.taskdescription) {
      return res.status(400).json('please fill in all fields')
    }
    const newtask = new taskmodel(tasks); //create a new instance of the taskmodel to save the new data :)
    try {
      await newtask.save();
      res.status(201).json({success: true, data: newtask})
    }
    catch(error) {
      res.status(400).json({success: false, message: error})
    }
};

export const deletetask = async(req, res) => {
    const { id } = req.params;
    try {
      if (!ObjectId.isValid(id)) {
        res.status(400).json({success: false, message: 'Invalid product ID'});
      }
      const deletedtask =  await taskmodel.findByIdAndDelete(id);

      if(!deletedtask) {
        res.status(400).json({success: false, message: 'Product not Found'})
      }
      res.status(200).json({success: true, message: "product deleted!"})
    }
    catch (error) {
      console.log('Error deleting tasks')
      res.status(500).json({success: false, message: error.message})
    }
 };
 
 export const updatetask = async(req, res) => {
    const { id } = req.params;
    const task = req.body;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid task ID'})
      }
    try {
      const updatedtask = await taskmodel.findByIdAndUpdate(id, task, {new: true})
      if(!updatedtask) {
        return res.status(400).json({success:false, message: 'task not found!'})
      }
      res.status(200).json({ success: true, data: updatedtask})
      console.log('Updated successfully')
    }
    catch (error) {
      console.log('error updating tasks')
      res.status(500). json({success: false, message: error.message})
    }
};

