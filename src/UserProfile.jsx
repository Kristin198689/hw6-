import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "/src/UserProfile.module.css";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://randomuser.me/api/");
      setUser(response.data.results[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userProfile}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
          />
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>

          <button onClick={fetchUser}>Download user</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
