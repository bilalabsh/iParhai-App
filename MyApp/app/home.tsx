import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/userApi";

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error.message);
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
