import React from "react";
import PostAddForm from "../components/PostAddForm";

const PostAddPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-5xl py-24">
        <div className="bg-white px-8 py-8 mb-4 shadow-md rounded-lg border m-4 md:m-0">
          <PostAddForm />
        </div>
      </div>
    </section>
  );
};

export default PostAddPage;
