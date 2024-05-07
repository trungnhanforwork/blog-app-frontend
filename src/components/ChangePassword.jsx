import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "../services/UserApi";

const ChangePasswordView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password2: "",
  });

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
      toast.error("Retype password does not match");
      return;
    }

    try {
      // Call API to change password
      await changePassword({ old_password, password, password2 });
      toast("Change password successfully");
      logout();
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.log(error);
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
