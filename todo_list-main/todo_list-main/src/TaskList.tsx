// TaskList.tsx (Dumb Component avec tableau HTML)
import React from 'react';
import { Task } from './TaskTable'; // Importer l'interface Task

interface TaskListProps {
  tasks: Task[];
  onMoveToInProgress: (index: number) => void;
  onMoveToDone: (index: number) => void;
  onDeleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onMoveToInProgress,
  onMoveToDone,
  onDeleteTask,
}) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>To Do</th>
          <th>In Progress</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {tasks
              .filter((task) => task.status === 'To Do')
              .map((task, index) => (
                <div key={index} className="task-to-do">
                  <span>{task.text}</span>
                  <button onClick={() => onMoveToInProgress(index)}>In Progress</button>
                  <button onClick={() => onDeleteTask(index)}>Supprimer</button>
                </div>
              ))}
          </td>
          <td>
            {tasks
              .filter((task) => task.status === 'In Progress')
              .map((task, index) => (
                <div key={index} className="task-in-progress">
                  <span>{task.text}</span>
                  <button onClick={() => onMoveToDone(index)}>Done</button>
                  <button onClick={() => onDeleteTask(index)}>Supprimer</button>
                </div>
              ))}
          </td>
          <td>
            {tasks
              .filter((task) => task.status === 'Done')
              .map((task, index) => (
                <div key={index} className="task-done">
                  <span>{task.text}</span>
                  <button onClick={() => onDeleteTask(index)}>Supprimer</button>
                </div>
              ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TaskList;

