// import React, { useEffect } from "react";
// import TaskItem from "./TaskItem";
// import { fetchTasks, deleteTask } from "../api/api";

// const TaskList = ({ tasks = [], setTasks, setSelectedTask, onMarkAsDone }) => {
//   useEffect(() => {
//     const savedTasks = JSON.parse(localStorage.getItem("tasks"));
//     if (savedTasks) {
//       setTasks(savedTasks);
//     } else {
//       const getTaskList = async () => {
//         const data = await fetchTasks();
//         setTasks(data || []);
//       };
//       getTaskList();
//     }
//   }, [setTasks]);

//   const handleDeleteTask = async (taskId) => {
//     await deleteTask(taskId); // Assuming you have a deleteTask API function

//     setTasks((prevTasks) => {
//       const updatedTasks = prevTasks.filter((task) => task._id !== taskId);
//       localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sync with localStorage
//       return updatedTasks;
//     });
//   };

//   // const handleMarkAsDone = (taskId) => {
//   //   // Mark task as done
//   //   setTasks((prev) =>
//   //     prev.map((task) =>
//   //       task._id === taskId ? { ...task, completed: !task.completed } : task
//   //     )
//   //   );
//   // };

//   const handleEditTask = (task) => {
//     // Set the selected task for editing
//     setSelectedTask(task);
//   };
//   const handleTaskUpdate = (updatedTask) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task._id === updatedTask._id ? updatedTask : task
//       )
//     );
//   };
//   return (
//     <div className="task-list">
//       <h3 style={{ textAlign: "center" }}>All Task</h3>
//       {tasks && tasks.length > 0 ? (
//         tasks.map((task) => {
//           if (task && task._id) {
//             return (
//               <TaskItem
//                 key={task._id}
//                 task={task}
//                 setTasks={setTasks}
//                 setSelectedTask={setSelectedTask}
//                 handleDeleteTask={handleDeleteTask}
//                 // onMarkAsDone={handleMarkAsDone}
//                 onEdit={handleEditTask}
//                 onUpdate={handleTaskUpdate}
//               />
//             );
//           }
//           return null;
//         })
//       ) : (
//         <p>No task present</p>
//       )}
//     </div>
//   );
// };

// export default TaskList;
import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { fetchTasks, deleteTask } from "../api/api";

const TaskList = ({ tasks = [], setTasks, setSelectedTask, onMarkAsDone }) => {
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    } else {
      const getTaskList = async () => {
        const data = await fetchTasks();
        setTasks(data || []);
      };
      getTaskList();
    }
  }, [setTasks]);

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId); // Assuming you have a deleteTask API function

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task._id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sync with localStorage
      return updatedTasks;
    });
  };

  // const handleMarkAsDone = (taskId) => {
  //   setTasks((prevTasks) => {
  //     const updatedTasks = prevTasks.map((task) =>
  //       task._id === taskId
  //         ? {
  //             ...task,
  //             completed: !task.completed,
  //             completedAt: task.completed ? null : new Date().toISOString(),
  //           }
  //         : task
  //     );
  //     localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sync with localStorage
  //     return updatedTasks;
  //   });
  // };

  const handleEditTask = (task) => {
    // Set the selected task for editing
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  return (
    <div className="task-list">
      <h3 style={{ textAlign: "center" }}>All Tasks</h3>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => {
          if (task && task._id) {
            return (
              <TaskItem
                key={task._id}
                task={task}
                setTasks={setTasks}
                setSelectedTask={setSelectedTask}
                handleDeleteTask={handleDeleteTask}
                onMarkAsDone={onMarkAsDone}
                onEdit={handleEditTask}
                onUpdate={handleTaskUpdate}
              />
            );
          }
          return null;
        })
      ) : (
        <p>No tasks present</p>
      )}
    </div>
  );
};

export default TaskList;
