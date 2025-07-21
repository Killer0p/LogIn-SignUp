
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log("Server running on port successfully ");
});
