import React, { useState } from "react";
import { addComment } from "../api/api";

const CommentsSection = ({ taskId, comments = [], setTasks }) => {
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    const updatedTask = await addComment(taskId, "USER_ID", comment);
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setComment("");
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul>
        {comments && comments.length > 0
          ? comments.map((c, index) => <li key={index}>{c.comment}</li>)
          : "no comments at the moment"}
      </ul>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add</button>
    </div>
  );
};

export default CommentsSection;
