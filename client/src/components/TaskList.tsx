// src/components/TaskList.tsx
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log(process.env.REACT_APP_API_BASE_URL);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title: string, description: string) => {
    try {
      const response = await api.post('/tasks', { title, description });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      try {
        const response = await api.put(`/tasks/${id}`, {
          ...task,
          isCompleted: !task.isCompleted,
        });
        setTasks(tasks.map(t => (t.id === id ? response.data : t)));
      } catch (error) {
        console.error('Error toggling task completion:', error);
      }
    }
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          {...task}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
