import React, { useState, useEffect } from "react";

const ActivityLog = ({ taskId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch(`/api/tasks/${taskId}/activities`);
      const data = await response.json();
      setActivities(data);
    };
    fetchActivities();
  }, [taskId]);

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity._id}>
          {activity.user} {activity.action} on{" "}
          {new Date(activity.timestamp).toLocaleString()}
        </li>
      ))}
      
    </ul>
  );
};

export default ActivityLog;
