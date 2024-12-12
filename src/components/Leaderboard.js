import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api/api";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getLeaderboard = async () => {
      const data = await fetchLeaderboard();
      setUsers(data);
    };
    getLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {users && users.length > 0
          ? users.map((user, index) => (
              <li key={user._id}>
                {index + 1}. {user.name} - {user.points} points
              </li>
            ))
          : "No users!"}
      </ul>
    </div>
  );
};

export default Leaderboard;
