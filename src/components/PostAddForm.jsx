import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostAddForm = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [fields, setFields] = useState({
    comments: [],
    title: "",
    content: "",
    category: 0,
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
      [name]: name === "category" ? value || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      // console.log(token);
      const response = await fetch(
        `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/new/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(fields),
        }
      );
      if (response.ok) {
        toast.success("Post added successfully!");
        setTimeout(() => setShowSuccessMessage(false), 3000);
        navigate("/");
      } else {
        toast.error("Failed to add post");
        throw new Error("Failed to add post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    mounted && (
      <div>
        {showSuccessMessage && (
          <div className="alert success">
            <span
              className="closebtn"
              onClick={() => setShowSuccessMessage(false)}
            >
              &times;
            </span>
            Post added successfully!
          </div>
        )}
        {/* // <form action="/api/posts" method="POST"> */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center font-semibold mb-6">Add Post</h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="text-xl block text-gray-700 font-bold mb-2"
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
              className="block text-gray-700 font-bold mb-2 text-xl"
            >
              Content
            </label>
            <ReactQuill
              id="content"
              name="content"
              value={fields.content}
              onChange={(content) => setFields({ ...fields, content })}
              className="border rounded"
              placeholder="Enter post content"
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
              <option className="text-lg" value="">
                Select a category
              </option>
              {categories.map((category) => (
                <option
                  className="text-lg"
                  key={category.id}
                  value={category.id}
                >
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
              Add Post
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PostAddForm;
