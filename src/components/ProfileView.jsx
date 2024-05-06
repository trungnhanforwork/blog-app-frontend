import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { changeUserProfile } from "../services/UserApi";

const ProfileView = ({ userData }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editedUserData, setEditedUserData] = useState({
    username: userData.username,
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = await changeUserProfile(editedUserData);
      await changeUserProfile(editedUserData);
      console.log("Profile updated successfully!");
      setEditMode(false);
      setSuccessMessage("Profile updated successfully!");
      setEditedUserData(updatedUserData);
      navigate("/");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleChangePassword = () => {
    navigate("/profile/changepassword");
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          User Profile
        </h2>
        <div className="bg-white shadow-md rounded-md p-6">
          {!editMode ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <label className="text-gray-700 font-semibold mr-4">
                  Username:
                </label>
                <p className="text-lg text-gray-900">{userData.username}</p>
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 font-semibold mr-4">
                  Email:
                </label>
                <p className="text-lg text-gray-900">{userData.email}</p>
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 font-semibold mr-4">
                  Full Name:
                </label>
                <p className="text-lg text-gray-900">
                  {userData.first_name} {userData.last_name}
                </p>
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 font-semibold mr-4">
                  Date Joined:
                </label>
                <p className="text-lg text-gray-900">
                  {format(new Date(userData.date_joined), "MMMM do, yyyy")}
                </p>
              </div>
              <button
                className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  First Name:
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={editedUserData.first_name}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={editedUserData.last_name}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                />
              </div>
              <button
                className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Changes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
        {successMessage && (
          <div className="bg-green-200 text-green-800 px-4 py-2 rounded-md my-4">
            {successMessage}
          </div>
        )}
      </div>
  );
};

export default ProfileView;
