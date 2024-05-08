import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { isAuthenticated, getToken } from "../utils/authUtils";

const PostEditForm = ({ postId }) => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    comments: [],
    title: "",
    content: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    async function fetchPostData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${postId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const postData = await response.json();
        setFields({
          title: postData.title,
          content: postData.content,
          category: postData.category,
          comments: postData.comments,
        });
        console.log(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }
    fetchPostData();
  }, [postId]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/category/list/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      // console.log(fields);
      if (!token || !isAuthenticated()) {
        toast.error("Fail to edit blog post!");
        throw new Error("Token not found");
      }
      const response = await fetch(
        `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${postId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(fields),
        }
      );
      if (response.ok) {
        toast.success("Post updated successfully!");
        navigate(`/post/${postId}`);
      } else {
        toast.error("Failed to update post");
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    mounted && (
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center font-semibold mb-6">Edit Post</h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="text-xl block text-gray-700 font-bold mb-3"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border rounded w-full py-2 px-3 mb-2 text-lg"
              placeholder="Enter post title"
              required
              value={fields.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-3 text-xl"
            >
              Content
            </label>
            <ReactQuill
              value={fields.content}
              onChange={(content) => setFields({ ...fields, content })}
              className="border rounded"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
              ]}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2 text-xl"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="border rounded w-full py-2 px-3"
              value={fields.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PostEditForm;
