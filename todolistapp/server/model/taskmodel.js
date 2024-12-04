import mongoose from "mongoose";

const taskschema = new mongoose.Schema({
    tasktitle: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    taskdescription: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const taskmodel = mongoose.model('Task', taskschema);


export default taskmodel;
