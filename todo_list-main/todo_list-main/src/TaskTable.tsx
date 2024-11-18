import React, { useState } from "react";
import "./TaskTable.css";

interface Task {
  text: string;
  status: "To Do" | "In Progress" | "Done";
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  //ajt tache
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTask, status: "To Do" },
      ]);
      setNewTask(""); 
    }
  };

  //changer status tache
  const handleStatusChange = (task: Task, status: "In Progress" | "Done") => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t === task ? { ...t, status: status } : t
      )
    );
  };

  //supprimer tache
  const handleDeleteTask = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
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

      <table className="task-table">
        <thead>
          <tr>
            <th>To-do</th>
            <th>In Progress</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="task-column">
              {tasks
                .filter((task) => task.status === "To Do")
                .map((task, index) => (
                  <div key={index} className="task-to-do">
                    {task.text}
                    <button
                      className="button-in-progress"
                      onClick={() => handleStatusChange(task, "In Progress")}
                    >
                      En cours
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => handleDeleteTask(task)}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
            </td>

            <td className="task-column">
              {tasks
                .filter((task) => task.status === "In Progress")
                .map((task, index) => (
                  <div key={index} className="task-in-progress">
                    {task.text}
                    <button
                      className="button-done"
                      onClick={() => handleStatusChange(task, "Done")}
                    >
                      Terminer
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => handleDeleteTask(task)}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
            </td>

            <td className="task-column">
              {tasks
                .filter((task) => task.status === "Done")
                .map((task, index) => (
                  <div key={index} className="task-done">
                    {task.text}
                    <button
                      className="button-delete"
                      onClick={() => handleDeleteTask(task)}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
