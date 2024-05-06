import React from "react";
import { useState, useEffect } from "react";
// import { posts } from "src/post.json";
import PostCard from "./PostCard";
const HomePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/list/`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  const recentPosts = posts
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts === 0 ? (
              <p>No post found!</p>
            ) : (
              recentPosts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePosts;
