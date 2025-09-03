import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  // This state is used to trigger refresh in TaskList when a new task is added
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Callback passed to TaskForm
  const handleTaskAdded = () => {
    // Toggle the flag to refresh TaskList
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Manager</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={refreshFlag} />
    </div>
  );
};

export default Home;

// ------------------ Styling ------------------
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#eef2f5",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
};
