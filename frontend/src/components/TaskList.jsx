import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";

const TaskList = ({ onTaskEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle completed status
  const handleToggle = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task.id, updatedTask);
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task List</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.item}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {task.title}: {task.description}
            </span>
            <button
              onClick={() => handleToggle(task)}
              style={{
                ...styles.button,
                backgroundColor: task.completed ? "#f39c12" : "#4CAF50",
              }}
            >
              {task.completed ? "Mark Pending" : "Mark Done"}
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              style={{ ...styles.button, backgroundColor: "#e74c3c" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

// ------------------ Styling ------------------
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "1.5rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "6px 12px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
  },
};
