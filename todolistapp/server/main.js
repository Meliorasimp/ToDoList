import express from 'express';
import mongoose from 'mongoose';
import taskmodel from './model/taskmodel.js'
import { ObjectId } from 'mongodb';
import taskrouter from './routes/taskroute.js';
import userrouter from './routes/userroute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://meliorasimp:v1TvOaPZVF5aj1S3@cluster0.n3qe5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/task', taskrouter);

app.use('/user', userrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
