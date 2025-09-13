import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import TaskForm from "./pages/TaskForm";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            }
          />
          <Route
            path="/tasks/create"
            element={
              <RequireAuth>
                <TaskForm />
              </RequireAuth>
            }
          />
          <Route
            path="/tasks/edit/:id"
            element={
              <RequireAuth>
                <TaskForm />
              </RequireAuth>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </div>
    </div>
  );
}
