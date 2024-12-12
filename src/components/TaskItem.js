// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { completeTask } from "../api/api";

// const TaskItem = ({
//   task,
//   setTasks,
//   setSelectedTask,
//   handleDeleteTask,
//   onMarkAsDone,
//   onEdit,
//   onUpdate,
// }) => {
//   const [completed, setCompleted] = useState(task.completed);

//   const handleMarkAsDone = async () => {
//     try {
//       const response = await axios.put(`/api/tasks/${task._id}/mark-done`);
//       onUpdate(response.data); // Update the parent component's state
//       setCompleted(response.data.completed);
//     } catch (error) {
//       console.error("Failed to mark task as done:", error);
//     }
//   };
//   const [timeLeft, setTimeLeft] = useState(task.timer);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const interval = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timeLeft]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   return (
//     <div className={`task-item ${task.completed ? " completed" : " "}`}>
//       <h3>Task: {task.title}</h3>
//       <p>Description: {task.description}</p>
//       <p>Priority: {task.priority}</p>
//       <div>
//         {task.dueDate && <p>Due Date: {task.dueDate}</p>}
//         {task.recurrence !== "None" && <p>Recurrence: {task.recurrence}</p>}
//         {timeLeft > 0 && <p>Time Left: {formatTime(timeLeft)}</p>}
//         {timeLeft === 0 && <p style={{ color: "red" }}>Time's up!</p>}
//         {/* <button onClick={() => onMarkAsDone(task._id)}>
//           {task.completed ? "Undo" : "Mark as Done"}
//         </button> */}
//         <button onClick={handleMarkAsDone}>
//           {completed ? "Undo" : "Mark as Done"}
//         </button>
//         {/* {completed && (
//           <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>
//         )} */}
//         <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
//         <button onClick={() => onEdit(task)}>Edit</button>
//       </div>
//     </div>
//   );
// };

// export default TaskItem;

import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskItem = ({
  task,
  setTasks,
  setSelectedTask,
  handleDeleteTask,
  onMarkAsDone,
  onEdit,
  onUpdate,
}) => {
  const [completed, setCompleted] = useState(task.completed);
  const [timeLeft, setTimeLeft] = useState(task.timer || 0); // Ensure timer starts with task.timer or 0

  useEffect(() => {
    // Decrease the time left if there is a timer set
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (task.isActive) {
      onUpdate({ ...task, isActive: false });
    }
  }, [timeLeft, task, onUpdate]);

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

  const handleTimeFormat = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        task.isActive ? "active" : "inactive"
      } `}
    >
      <h3>Task: {task.title}</h3>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      {task.dueDate && <p>Due Date: {task.dueDate}</p>}
      {task.recurrence !== "None" && <p>Recurrence: {task.recurrence}</p>}
      {timeLeft > 0 ? (
        <p>Time Left: {handleTimeFormat(timeLeft)}</p>
      ) : (
        <p style={{ color: "red" }}>Time's up!</p>
      )}
      <div>
        <button onClick={() => onMarkAsDone(task._id)}>
          {task.completed ? "Undo" : "Mark as Done"}
        </button>
        <p>Status: {task.isActive ? "Active" : "Inactive"}</p>
        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        <button onClick={() => onEdit(task)}>Edit</button>
      </div>
      {completed && task.completedAt && (
        <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>
      )}
    </div>
  );
};

export default TaskItem;
