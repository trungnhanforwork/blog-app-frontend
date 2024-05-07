import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/UserApi";

const ChangePasswordView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { old_password, password, password2 } = formData;

    if (password !== password2) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      // Call API to change password
      await changePassword({ old_password, password, password2 });
      setSuccessMessage("Password changed successfully!");
      logout();
    } catch (error) {
      setError("Failed to change password. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    // Điều hướng người dùng đến trang đăng nhập
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Change Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Current Password:
          </label>
          <input
            type="password"
            name="old_password"
            value={formData.old_password}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 mb-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 mb-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 mb-2"
            required
          />
        </div>
        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-200 text-green-800 px-4 py-2 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        <button
          className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordView;
