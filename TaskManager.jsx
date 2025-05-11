import React, { useState, useEffect } from "react";
import './TaskManager.css';

import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    dueDate: "",
  });
  const [filterPriority, setFilterPriority] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title) return;
    try {
      await axios.post("http://localhost:5000/api/tasks", newTask);
      setNewTask({ title: "", priority: "Medium", dueDate: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const handleToggleComplete = async (id, current) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !current,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handlePriorityFilter = (level) => {
    if (filterPriority === level) {
      setFilterPriority(null); // toggle off
    } else {
      setFilterPriority(level);
    }
  };

  const filteredTasks = filterPriority
    ? tasks.filter((task) => task.priority === filterPriority)
    : tasks;

  return (
    <div className="task-manager-container">
      <h1 className="title">🗂️ Task Manager</h1>

      {/* Input Section */}
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={handleAddTask}>➕ Add</button>
      </div>

      {/* Priority Filters */}
      <div className="priority-filters">
        {["High", "Medium", "Low"].map((level) => (
          <button
            key={level}
            className={`priority-btn ${filterPriority === level ? "active" : ""} ${level.toLowerCase()}`}
            onClick={() => handlePriorityFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => {
            const dueDate = task.dueDate ? new Date(task.dueDate) : null;
            const now = new Date();
            const isOverdue = dueDate && dueDate < now && !task.completed;
            const isDueToday =
              dueDate &&
              dueDate.toDateString() === now.toDateString();

            return (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <div>
                  <strong>{task.title}</strong> {" "}
                  <span className={`priority-tag ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  {isDueToday && <span className="due-today">🕓 Due Today</span>}
                  {isOverdue && <span className="overdue">❌ Overdue</span>}
                </div>

                <div className="task-buttons">
                  <button onClick={() => handleToggleComplete(task.id, task.completed)}>
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="delete-btn">
                    🗑️
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default TaskManager;