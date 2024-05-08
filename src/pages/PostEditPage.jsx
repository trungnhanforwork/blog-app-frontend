import React from "react";
import PostEditForm from "../components/PostEditForm";
import { useParams } from "react-router-dom";

const PostEditPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-5xl py-24">
        <div className="bg-white px-8 py-8 mb-4 shadow-md rounded-lg border m-4 md:m-0">
          <PostEditForm postId={id} />
        </div>
      </div>
    </section>
  );
};

export default PostEditPage;
