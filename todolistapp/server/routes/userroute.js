import { postuser, loginuser } from "../controller/usercontroller.js";
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.post('/register', postuser);
router.post('/login', loginuser);

export default router;

