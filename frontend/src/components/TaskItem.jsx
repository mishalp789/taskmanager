// src/components/TaskItem.jsx
import { Link } from "react-router-dom";

export default function TaskItem({ task, onDelete }) {
  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.priority}</td>
      <td>{task.status}</td>
      <td>{task.dueDate}</td>
      <td>
        <Link
          to={`/tasks/edit/${task.id}`}
          className="btn btn-warning btn-sm me-2"
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
