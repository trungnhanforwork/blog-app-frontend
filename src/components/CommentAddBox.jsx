import React, { useState } from "react";
import { isAuthenticated, getToken } from "../utils/authUtils";
import { toast } from "react-toastify";

const CommentAddBox = ({ postId }) => {
  console.log(postId);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated()) {
        // Redirect the user to the login page or show an error message
        toast.error("You need to login first!");
        throw new Error("Unauthorized");
      }
      const token = getToken();

      const response = await fetch(
        `${
          import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN
        }/blog/${postId}/comments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ description: description }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to post comment");
        throw new Error("Failed to post comment");
      }

      // Reset comment input after successful submission
      setDescription("");

      // Reload the page to fetch updated comments
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (e) => {
    setDescription(e.target.value);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
          Discussion
        </h2>
      </div>
      <form className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="description" className="sr-only">
            Your comment
          </label>
          <textarea
            id="description"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
            onChange={handleComment}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          onClick={handleSubmit}
        >
          Post comment
        </button>
      </form>
    </>
  );
};

export default CommentAddBox;
