// src/components/TaskItem.tsx
import React from 'react';

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, isCompleted, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => onToggleComplete(id)}>{isCompleted ? 'Mark Incomplete' : 'Mark Complete'}</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
