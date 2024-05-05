import { FaUserSecret } from "react-icons/fa";

const PostDetailView = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{post.category_name}</div>
          <h3 className="text-xl font-bold">{post.title}</h3>
        </div>

        <div className="mb-5">{post.content}</div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaUserSecret className="inline text-lg mb-1 mr-1" />
            {post.user}
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-5">
          <h4 className="text-lg font-bold mb-3">Comments:</h4>
          {post.comments.map((comment, index) => (
            <div key={index} className="border border-gray-200 p-3 mb-3 rounded-md">
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailView;
