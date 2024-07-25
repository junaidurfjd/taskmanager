import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

// use task routes
app.use('/tasks', taskRoutes);

// listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
