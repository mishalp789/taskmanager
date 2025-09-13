// src/pages/Tasks.jsx
import { useEffect, useState, useContext } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/tasks");
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search tasks
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (search.trim() === "") {
        fetchTasks();
      } else {
        const res = await axios.get(`/tasks/search?title=${search}`);
        setTasks(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tasks</h2>

      {/* Search Form */}
      <form className="mb-3 d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      <div className="mb-3">
        <Link to="/tasks/create" className="btn btn-success">
          Create Task
        </Link>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    {/* Safe check for task.user */}
                    {user && user.email === task.user?.email && (
                      <>
                        <Link
                          to={`/tasks/edit/${task.id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
