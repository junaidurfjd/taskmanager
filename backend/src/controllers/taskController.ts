import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";

const taskRepository = AppDataSource.getRepository(Task);

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskRepository.find();
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = taskRepository.create(req.body);
        await taskRepository.save(task);
        res.json(task);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await taskRepository.findOneBy({id: Number(req.params.id)});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        taskRepository.merge(task, req.body);
        await taskRepository.save(task);
        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await taskRepository.findOneBy({id: Number(req.params.id)});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await taskRepository.remove(task);
        res.json({ message: 'Task deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
