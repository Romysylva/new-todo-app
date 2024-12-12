import React from "react";

const TaskTracking = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-tracking">
      <h2>Task Tracking</h2>
      <ul>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <li key={task._id}>
              {task.title} -
              {task.completedAt
                ? `Completed on ${new Date(task.completedAt).toLocaleString()}`
                : "Completion date unavailable"}
            </li>
          ))
        ) : (
          <li>No completed tasks found.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskTracking;
