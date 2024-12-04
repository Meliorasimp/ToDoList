import { gettask, deletetask, posttask, updatetask } from "../controller/taskcontroller.js";
import express from 'express';
const router = express.Router();

router.get('/', gettask);

router.post('/', posttask);

router.delete('/:id', deletetask);

router.put('/:id', updatetask);

export default router;