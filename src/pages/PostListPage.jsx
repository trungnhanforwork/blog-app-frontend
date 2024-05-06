import React from "react";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetching data from posts.json (Assuming it's in the public folder)
    // fetch("./src/post.json")
    fetch(`${process.env.DJANGO_PUBLIC_API_DOMAIN}/blog/list/`)
      .then((response) => response.json())
      .then((data) => {
        const formattedPosts = data.map((post) => ({
          id: post.id.toString(),
          title: post.title,
          category: post.category_name,
          content: post.content,
          user: post.user,
        }));
        setPosts({ posts: formattedPosts });
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Browse Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <p>No post found!</p>
            ) : (
              posts.posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostPage;
