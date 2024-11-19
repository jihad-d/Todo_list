import React, { useState } from 'react';
import { Task } from './TaskTable';
import { Id } from "../convex/_generated/dataModel";

interface TaskListProps {
  tasks: Task[];
  onMoveToInProgress: (taskId: Id<"tasks">) => void;
  onMoveToDone: (taskId: Id<"tasks">) => void;
  onDeleteTask: (taskId: Id<"tasks">) => void;
  onUpdateTask: (taskId: Id<"tasks">, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onMoveToInProgress,
  onMoveToDone,
  onDeleteTask,
  onUpdateTask
}) => {
  const [editingTaskId, setEditingTaskId] = useState<Id<"tasks"> | null>(null);
  const [editText, setEditText] = useState<string>('');

  const startEditing = (task: Task) => {
    setEditingTaskId(task._id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editingTaskId && editText.trim() !== '') {
      onUpdateTask(editingTaskId, editText.trim());
      setEditingTaskId(null);
    }
  };

  const renderTask = (task: Task, className: string) => {
    if (editingTaskId === task._id) {
      return (
        <div className={className}>
          <input 
            type="text" 
            className="task-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
          />
          <button onClick={saveEdit}>Enregistrer</button>
          <button onClick={() => setEditingTaskId(null)}>Annuler</button>
        </div>
      );
    }

    return (
      <div key={task._id} className={className}>
        <span>{task.text}</span>
        {task.status === 'To Do' && (
          <>
            <button onClick={() => startEditing(task)}>Modifier</button>
            <button onClick={() => onMoveToInProgress(task._id)}>In Progress</button>
          </>
        )}
        {task.status === 'In Progress' && (
          <>
            <button onClick={() => startEditing(task)}>Modifier</button>
            <button onClick={() => onMoveToDone(task._id)}>Done</button>
          </>
        )}
        {task.status === 'Done' && (
          <button onClick={() => startEditing(task)}>Modifier</button>
        )}
        <button onClick={() => onDeleteTask(task._id)}>Supprimer</button>
      </div>
    );
  };

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
        <td>
          {tasks
            .filter((task) => task.status === 'To Do')
            .map((task) => renderTask(task, "task-to-do"))}
        </td>
        <td>
          {tasks
            .filter((task) => task.status === 'In Progress')
            .map((task) => renderTask(task, "task-in-progress"))}
        </td>
        <td>
          {tasks
            .filter((task) => task.status === 'Done')
            .map((task) => renderTask(task, "task-done"))}
        </td>
      </tbody>
    </table>
  );
};

export default TaskList;

