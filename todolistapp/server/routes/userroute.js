import { postuser, loginuser } from "../controller/usercontroller.js";
import express from 'express';
const router = express.Router();

router.post('/register', postuser);
router.post('/login', loginuser);

export default router;

