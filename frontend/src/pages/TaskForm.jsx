// src/pages/TaskForm.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function TaskForm() {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch task if editing
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(`/tasks/${id}`);
          setTask({
            title: res.data.title,
            description: res.data.description,
            priority: res.data.priority,
            status: res.data.status,
            dueDate: res.data.dueDate,
          });
        } catch (err) {
          console.error(err);
          alert("Failed to fetch task.");
        }
      };
      fetchTask();
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        // Edit
        await axios.put(`/tasks/${id}`, task);
        alert("Task updated successfully!");
      } else {
        // Create
        await axios.post("/tasks", task);
        alert("Task created successfully!");
      }
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      alert("Failed to save task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{id ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
