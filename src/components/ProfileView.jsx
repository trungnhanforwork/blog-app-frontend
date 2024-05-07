import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { changeUserProfile } from "../services/UserApi";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { toast } from "react-toastify";
import { isAuthenticated, getToken } from "../utils/authUtils";
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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${
            userData.id
          }/post`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) {
      return;
    }
    const token = getToken();
    if (!isAuthenticated()) {
      toast.error("Fail to post blog!");
      throw new Error("Token not found");
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (res.ok) {
        // Remove the property from state
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        toast.success("Property deleted");
      } else {
        toast.error("Fail to deleted property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail to deleted property");
    }
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
    <>
      <section className="bg-blue-100">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-xl border m-4 md:m-0">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <img
                    className="h-32 w-32 rounded-full"
                    src="/profile.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>

                {!editMode ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <label className="text-gray-700 font-semibold mr-4 text-lg">
                        Username:
                      </label>
                      <p className="text-lg text-gray-900">
                        {userData.username}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="text-gray-700 font-semibold mr-4 text-lg">
                        Email:
                      </label>
                      <p className="text-lg text-gray-900">{userData.email}</p>
                    </div>
                    <div className="flex items-center">
                      <label className="text-gray-700 font-semibold mr-4 text-lg">
                        Full Name:
                      </label>
                      <p className="text-lg text-gray-900">
                        {userData.first_name} {userData.last_name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="text-gray-700 font-semibold mr-4 text-lg">
                        Date Joined:
                      </label>
                      <p className="text-lg text-gray-900">
                        {format(
                          new Date(userData.date_joined),
                          "MMMM do, yyyy"
                        )}
                      </p>
                    </div>
                    <button
                      className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4"
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
              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {posts.length === 0 && <p>You have no post listing</p>}
                {posts.map((post) => (
                  <div className="mb-12" key={post.id}>
                    <PostCard post={post} />
                    <div className="mt-2">
                      <Link
                        // href={`/properties/${post._id}/edit`}
                        className="bg-blue-800 text-white px-4 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileView;
