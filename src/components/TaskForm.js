// import React, { useState, useEffect } from "react";

// const TaskForm = ({ setTasks, selectedTask, setSelectedTask }) => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     priority: "Low",
//     dueDate: "",
//     recurrence: "None",
//     Timer: "",
//   });

//   // Load tasks from local storage on mount
//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     setTasks(storedTasks);
//   }, [setTasks]);

//   // Populate form with selected task data when editing
//   useEffect(() => {
//     if (selectedTask) {
//       setTask({
//         title: selectedTask.title,
//         description: selectedTask.description,
//         priority: selectedTask.priority || "Low",
//         dueDate: selectedTask.dueDate || "",
//         recurrence: selectedTask.recurrence || "None",
//         timer: selectedTask.timer ? selectedTask.timer / 60 : "",
//       });
//     } else {
//       resetForm();
//     }
//   }, [selectedTask]);

//   const resetForm = () => {
//     setTask({
//       title: "",
//       description: "",
//       priority: "Low",
//       dueDate: "",
//       recurrence: "None",
//       timer: "",
//     });
//   };

//   const saveTasksToLocalStorage = (tasks) => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (selectedTask) {
//       setTasks((prevTasks) => {
//         const updatedTasks = prevTasks.map((t) =>
//           t._id === selectedTask._id
//             ? { ...t, ...task, timer: task.timer * 60 }
//             : t
//         );
//         saveTasksToLocalStorage(updatedTasks);
//         return updatedTasks;
//       });
//       setSelectedTask(null);
//     } else {
//       const newTask = {
//         ...task,
//         _id: Date.now(),
//         completed: false,
//         timer: task.timer * 60,
//       };
//       setTasks((prevTasks) => {
//         const updatedTasks = [...prevTasks, newTask];
//         saveTasksToLocalStorage(updatedTasks); // Save to local storage
//         return updatedTasks;
//       });
//     }

//     resetForm(); // Clear the form
//   };

//   return (
//     <div className="task-form">
//       <h2>{selectedTask ? "Edit Task" : "Add New Task"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={task.title}
//             onChange={(e) => setTask({ ...task, title: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             value={task.description}
//             onChange={(e) => setTask({ ...task, description: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="priority">Priority:</label>
//           <select
//             id="priority"
//             value={task.priority}
//             onChange={(e) => setTask({ ...task, priority: e.target.value })}
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="dueDate">Due Date:</label>
//           <input
//             type="date"
//             id="dueDate"
//             value={task.dueDate}
//             onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
//           />
//         </div>
//         <div>
//           <label htmlFor="recurrence">Recurrence:</label>
//           <select
//             id="recurrence"
//             value={task.recurrence}
//             onChange={(e) => setTask({ ...task, recurrence: e.target.value })}
//           >
//             <option value="None">None</option>
//             <option value="Daily">Daily</option>
//             <option value="Weekly">Weekly</option>
//             <option value="Monthly">Monthly</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="timer">Timer (minutes):</label>
//           <input
//             type="number"
//             id="timer"
//             value={task.timer}
//             onChange={(e) => setTask({ ...task, timer: e.target.value })}
//             min="0"
//           />
//         </div>
//         <button type="submit">
//           {selectedTask ? "Save Changes" : "Add Task"}
//         </button>
//         {selectedTask && (
//           <button
//             type="button"
//             onClick={() => {
//               setSelectedTask(null);
//               resetForm();
//             }}
//           >
//             Cancel
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default TaskForm;
import React, { useState, useEffect } from "react";

const TaskForm = ({ setTasks, selectedTask, setSelectedTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    recurrence: "None",
    timer: "",
  });

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, [setTasks]);

  // Populate form with selected task data when editing
  useEffect(() => {
    if (selectedTask) {
      setTask({
        title: selectedTask.title,
        description: selectedTask.description,
        priority: selectedTask.priority || "Low",
        dueDate: selectedTask.dueDate || "",
        recurrence: selectedTask.recurrence || "None",
        timer: selectedTask.timer ? selectedTask.timer / 60 : "", // Convert seconds to minutes
      });
    } else {
      resetForm();
    }
  }, [selectedTask]);

  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      recurrence: "None",
      timer: "",
    });
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTask) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) =>
          t._id === selectedTask._id
            ? { ...t, ...task, timer: task.timer * 60 } // Convert minutes to seconds when updating
            : t
        );
        saveTasksToLocalStorage(updatedTasks);
        return updatedTasks;
      });
      setSelectedTask(null);
    } else {
      const newTask = {
        ...task,
        _id: Date.now(),
        completed: false,
        timer: task.timer * 60,
        isActive: true,
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        saveTasksToLocalStorage(updatedTasks);
        return updatedTasks;
      });
    }

    resetForm();
  };

  return (
    <div className="task-form">
      <h2>{selectedTask ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="recurrence">Recurrence:</label>
          <select
            id="recurrence"
            value={task.recurrence}
            onChange={(e) => setTask({ ...task, recurrence: e.target.value })}
          >
            <option value="None">None</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label htmlFor="timer">Timer (minutes):</label>
          <input
            type="number"
            id="timer"
            value={task.timer}
            onChange={(e) => setTask({ ...task, timer: e.target.value })}
            min="0"
          />
        </div>
        <button type="submit">
          {selectedTask ? "Save Changes" : "Add Task"}
        </button>
        {selectedTask && (
          <button
            type="button"
            onClick={() => {
              setSelectedTask(null);
              resetForm();
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
