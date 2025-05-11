const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

const tasksFile = "tasks.json";
const usersFile = "users.json";

// Load & Save Tasks
function loadTasks() {
  if (fs.existsSync(tasksFile)) {
    const data = fs.readFileSync(tasksFile);
    return JSON.parse(data);
  }
  return [];
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Load & Save Users
function loadUsers() {
  if (fs.existsSync(usersFile)) {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
  }
  return [];
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// ✅ Signup Route
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { id: Date.now(), username, password };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "Signup successful", user: newUser });
});

// ✅ Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// ✅ Get All Tasks
app.get("/api/tasks", (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// ✅ Add New Task
app.post("/api/tasks", (req, res) => {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    priority: req.body.priority,
    dueDate: req.body.dueDate || null,
    completed: false,
    createdAt: new Date(),
    completedAt: null,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// ✅ Update Task
app.put("/api/tasks/:id", (req, res) => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
      completedAt: req.body.completed ? new Date() : null,
    };
    saveTasks(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// ✅ Delete Task
app.delete("/api/tasks/:id", (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  saveTasks(tasks);
  res.json({ message: "Task deleted" });
});

// ✅ Start Server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
