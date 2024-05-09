import React, { useState, useEffect } from "react";
import { useLocation  } from "react-router-dom";
import PostCard from "../components/PostCard";

const SearchResultsPage = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      fetch(`${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/search/?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedPosts = data.map((post) => ({
            id: post.id.toString(),
            title: post.title,
            category: post.category_name,
            content: post.content,
            user: post.user,
          }));
          setPosts(formattedPosts);
        })
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [location.search]);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Search Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <p>No search results found found!</p>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
