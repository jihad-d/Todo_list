import { Id } from "../convex/_generated/dataModel";
import React, { useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import TaskList from './TaskList';
import './TaskTable.css';

export interface Task {
  _id: Id<"tasks">;
  text: string;
  status: 'To Do' | 'In Progress' | 'Done';
  userId: string;
}

const TaskTable: React.FC = () => {
  const tasks = useQuery(api.tasks.getUserTasks);
  const addTask = useMutation(api.tasks.addTask);
  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask({ text: newTask });
      setNewTask('');
    }
  };

  const handleMoveToInProgress = (taskId: Id<"tasks">) => {
    updateTaskStatus({ 
      taskId, 
      status: 'In Progress' 
    });
  };

  const handleMoveToDone = (taskId: Id<"tasks">) => {
    updateTaskStatus({ 
      taskId, 
      status: 'Done' 
    });
  };

  const handleDeleteTask = (taskId: Id<"tasks">) => {
    deleteTask({ taskId });
  };

  const updateTask = useMutation(api.tasks.updateTask);

  //maj tache
  const handleUpdateTask = (taskId: Id<"tasks">, newText: string) => {
    updateTask({ taskId, text: newText });
  };


  return (
    <div className="task-table-container">
      <h1>Ma To-Do List</h1>
      
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Ajouter</button>
      </div>
      
      {tasks && (
        <TaskList
          tasks={tasks}
            onMoveToInProgress={handleMoveToInProgress}
            onMoveToDone={handleMoveToDone}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}/>
      )}
    </div>
  );
};

export default TaskTable;

