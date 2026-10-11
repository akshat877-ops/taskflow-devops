const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: 1,
    title: "Learn Docker",
    completed: true
  },
  {
    id: 2,
    title: "Build TaskFlow",
    completed: false
  }
];

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    service: "taskflow-backend"
  });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  const task = {
    id: tasks.length + 1,
    title,
    completed: false
  };

  tasks.push(task);

  res.status(201).json(task);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TaskFlow backend running on port ${PORT}`);
});
