import React, { useState, useEffect } from "react";
import ProfileView from "../components/ProfileView";
import { getUserProfile } from "../services/UserApi";

const ProfileDetailPage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await getUserProfile();
      setUserProfile(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      {userProfile && <ProfileView userData={userProfile} />}
    </section>
  );
};

export default ProfileDetailPage;
