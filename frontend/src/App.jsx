import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setStatus("Backend connected");
      })
      .catch(() => {
        setStatus("Backend connection failed");
      });
  }, []);

  return (
    <div style={{
      maxWidth: "700px",
      margin: "40px auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>TaskFlow</h1>

      <p>
        Backend status: <strong>{status}</strong>
      </p>

      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        >
          <strong>{task.title}</strong>
          <div>
            Status: {task.completed ? "Completed" : "Pending"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
