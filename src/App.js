import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Leaderboard from "./components/Leaderboard";
import GamificationWidget from "./components/GamificationWidget";
import ActivityLog from "./components/ActivityLog";
import CommentsSection from "./components/CommentsSection";
import Timer from "./components/Timer";
// import ProgressBar from "./components/ProgressBar";
import RecurringTaskManager from "./components/RecurringTaskManager";
import TaskTracking from "./components/TaskTracking";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const progressPercentage = calculateProgress();

  const getProgressColor = (percentage) => {
    if (percentage < 33) return "#f44336";
    if (percentage < 66) return "#ff9800";
    return "#4caf50";
  };

  const progressColor = getProgressColor(progressPercentage);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleMarkAsDone = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task._id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task
      );
      console.log(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // const handleMarkAsDone = async () => {
  //   try {
  //     // Update the task completion status in the backend
  //     const response = await axios.put(`/api/tasks/${task._id}/mark-done`);
  //     onUpdate(response.data); // Update parent component's state with the new task data
  //     setCompleted(response.data.completed);
  //   } catch (error) {
  //     console.error("Failed to mark task as done:", error);
  //   }
  // };

  return (
    <div>
      <Navbar />
      <header>
        <h1>To-Do List App</h1>
        Progress Bar
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: progressColor,
            }}
          >
            {progressPercentage}% Complete
          </div>
        </div>
      </header>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <Timer />
      {/* <ProgressBar progress={calculateProgress()} /> */}
      <RecurringTaskManager tasks={tasks} setTasks={setTasks} />
      <TaskTracking tasks={tasks} />
      <div className="app-container">
        <TaskForm
          setTasks={setTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          setSelectedTask={setSelectedTask}
          onMarkAsDone={handleMarkAsDone}
        />
        <GamificationWidget />
        <Leaderboard />
        <ActivityLog />
        <CommentsSection />
      </div>
    </div>
  );
};

export default App;
