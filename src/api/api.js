// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });

// export const fetchTasks = () => API.get("/tasks");
// export const createTask = (task) => API.post("/tasks", task);
// export const updateTask = (id, updatedTask) =>
//   API.put(`/tasks/${id}`, updatedTask);
// export const deleteTask = (id) => API.delete(`/tasks/${id}`);
// /**
//  * Share a task with another user via email.
//  * @param {string} taskId - The ID of the task to share.
//  * @param {string} email - The email of the user to share the task with.
//  * @returns {Promise<Object>} - Response from the server.
//  */
// export const shareTask = async (taskId, email) => {
//   try {
//     const response = await axios.post(`/tasks/${taskId}/share`, { email });
//     return response.data; // Return the server's response
//   } catch (error) {
//     console.error("Error sharing task:", error);
//     throw error; // Propagate error to the caller
//   }
// };

// export const addComment = async (taskId, comment) => {
//   try {
//     const response = await axios.post(`/tasks/${taskId}/comments`, { comment });
//     return response.data; // Return the response data (updated task with comments)
//   } catch (error) {
//     console.error("Error adding comment:", error);
//     throw new Error("Failed to add comment"); // Throw an error if the API call fails
//   }
// };

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// export const fetchTasks = async () => {
//   const response = await fetch(`${API_URL}/tasks`);
//   return response.json();

// };

export const fetchTasks = async () => {
  // Check if tasks are stored in localStorage
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks); // Parse and return tasks from localStorage
  }

  // If no tasks are found in localStorage, fetch them from the API
  const response = await fetch(`${API_URL}/tasks`);
  const tasks = await response.json();

  // Save the fetched tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return tasks;
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (taskId, updates) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

// export const updateTaskRecurrence = async (taskId, recurrence) => {
//   try {
//     const response = await fetch(`${API_URL}/tasks/${taskId}`, { recurrence });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating task recurrence:", error);
//     throw new Error("Failed to update task recurrence");
//   }
// };

// In api.js

export const updateTaskRecurrence = async (taskId, recurrence) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT", // Ensure you are sending a PUT request
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ recurrence }), // Pass the recurrence in the body
    });

    if (!response.ok) {
      throw new Error("Failed to update task recurrence");
    }

    // Assuming the server returns the updated task, parse and return it
    return response.json();
  } catch (error) {
    console.error("Error updating task recurrence:", error);
    throw new Error("Failed to update task recurrence");
  }
};

export const completeTask = async (taskId, userId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return response.json();
};

export const fetchLeaderboard = async () => {
  const response = await fetch(`${API_URL}/users/leaderboard`);
  return response.json();
};

export const addComment = async (taskId, userId, comment) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, comment }),
  });
  return response.json();
};

export const shareTask = async (taskId, userIds) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/share`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIds }),
  });
  return response.json();
};

export const fetchActivityLog = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/activity`);
  return response.json();
};
