import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

app.use(express.json());

// use task routes
app.use('/tasks', taskRoutes);

// listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
