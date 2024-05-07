import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { FaUserSecret } from "react-icons/fa";
import CommentAddBox from "./CommentAddBox";
import Comment from "./Comment";

const PostDetailView = ({ post, comments }) => {
  console.log(post.id);
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{post.category_name}</div>
          <h3 className="text-3xl font-bold mb-4">{post.title}</h3>
        </div>

        {/* Render formatted text */}
        <div className="mb-5 leading-relaxed">
          <ReactQuill
            value={post.content}
            readOnly={true}
            theme="snow"
            contentStyle={{ fontSize: "1.2rem" }}
            modules={{ toolbar: false }}
          />
        </div>

        <div className="border-b border-gray-200 mb-5"></div>

        <div className="flex items-center mb-4">
          <FaUserSecret className="text-orange-700 text-lg mr-2" />
          <div className="text-sm text-gray-600">{post.user}</div>
        </div>

        {/* Comment Section */}
        <CommentAddBox postId={post.id} />
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostDetailView;
