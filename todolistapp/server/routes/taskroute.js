import { gettask, deletetask, posttask, updatetask } from "../controller/taskcontroller.js";
import { authUser } from "../middleware/authuser.js";
import express from 'express';
const router = express.Router();

router.get('/', authUser, gettask);

router.post('/', authUser, posttask);

router.delete('/:id', authUser, deletetask);

router.put('/:id', authUser, updatetask);

export default router;