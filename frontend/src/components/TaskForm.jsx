import React, { useState } from "react";
import { createTask } from "../services/taskService";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      const newTask = { title, description, completed };
      await createTask(newTask);

      // Clear form
      setTitle("");
      setDescription("");
      setCompleted(false);
      setError("");

      // Notify parent to refresh task list
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "80px" }}
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

// ------------------ Styling ------------------
const styles = {
  container: {
    maxWidth: "400px",
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  checkboxLabel: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    gap: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};
