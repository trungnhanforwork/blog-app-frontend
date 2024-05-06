import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail";

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // Fetch post data from API with id
    fetch(`${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    fetch(
      `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${id}/comments`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments data");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-4xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          {loading ? (
            <p>Loading...</p>
          ) : post ? (
            <PostDetail post={post} comments={comments} />
          ) : (
            <p>Failed to fetch post data</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostDetailPage;
