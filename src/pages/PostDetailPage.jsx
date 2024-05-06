import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostDetailView from "../components/PostDetailView";

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch post data from API with id
    fetch(`${process.env.DJANGO_PUBLIC_API_DOMAIN}/blog/${id}`)
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
  }, [id]);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          {loading ? (
            <p>Loading...</p>
          ) : post ? (
            <PostDetailView post={post} />
          ) : (
            <p>Failed to fetch post data</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostDetailPage;
