import { FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const description = post.content.substring(0, 240) + "...";

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{post.category_name}</div>
          <h3 className="text-xl font-bold">{post.title}</h3>
        </div>

        {/* Render HTML content using dangerouslySetInnerHTML */}
        <div
          className="mb-5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaUserSecret className="inline text-lg mb-1 mr-1" />
            {post.user}
          </div>
          <Link
            to={`/post/${post.id}`}
            className="h-[36px] bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
