import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});