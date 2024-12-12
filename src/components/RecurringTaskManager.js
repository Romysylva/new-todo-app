import React, { useEffect } from "react";
import { updateTaskRecurrence } from "../api/api";

const RecurringTaskManager = ({ tasks, setTasks }) => {
  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const handleSetRecurrence = async (taskId, recurrence) => {
    try {
      const updatedTask = await updateTaskRecurrence(taskId, recurrence);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id
            ? { ...task, recurrence: updatedTask.recurrence }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task recurrence:", error);
    }
  };

  return (
    <div className="recurring-task-manager">
      <h2>Recurring Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - Recurs: {task.recurrence || "None"}
            <select
              onChange={(e) => handleSetRecurrence(task._id, e.target.value)}
              value={task.recurrence || "none"}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecurringTaskManager;
