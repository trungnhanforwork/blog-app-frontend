import React, { useState, useEffect } from "react";
import { getToken } from "../utils/authUtils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { FaUserSecret, FaThumbsUp } from "react-icons/fa";
import CommentAddBox from "./CommentAddBox";
import Comment from "./Comment";
import VoteStatus from "./VoteStatus";

const PostDetail = ({ post, comments }) => {
  const [voteCount, setVoteCount] = useState(post.vote);
  const userHasVotedInit = VoteStatus(post.id);
  const [userHasVoted, setUserHasVoted] = useState(userHasVotedInit);
  const [voteIcon, setVoteIcon] = useState(userHasVoted);

  useEffect(() => {
    const pollingInterval = 5000;
    const pollInterval = setInterval(fetchVoteCount, pollingInterval);
    return () => clearInterval(pollInterval);
  }, []);

  const fetchVoteCount = () => {
    const url = `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${
      post.id
    }/vote-count/`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch vote count");
        }
      })
      .then((data) => {
        setVoteCount(data.vote_count);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleVote = () => {
    const url = `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${post.id}/vote/`;
    const token = getToken();
    let method;
  
    if (userHasVoted) {
      method = "DELETE";
    } else {
      method = "POST";
    }
  
    // Update userHasVoted state immediately
    setUserHasVoted(!userHasVoted);
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setVoteCount((prevCount) => (userHasVoted ? prevCount - 1 : prevCount + 1));
          setVoteIcon(!userHasVoted);
        } else {
          console.error("Error:", response.statusText);
          // Revert userHasVoted state if there's an error
          setUserHasVoted(userHasVoted);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Revert userHasVoted state if there's an error
        setUserHasVoted(userHasVoted);
      });
  };
  

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{post.category_name}</div>
          <h3 className="text-3xl font-bold mb-4">{post.title}</h3>
        </div>

        {/* Render formatted text */}
        <div
          className="mb-5 leading-relaxed"
          style={{ border: "none !important" }}
        >
          <ReactQuill
            value={post.content}
            readOnly={true}
            theme="snow"
            contentStyle={{ fontSize: "1.2rem", border: "none !important" }}
            modules={{ toolbar: false }}
          />
        </div>

        <div className="border-b border-gray-200 mb-5"></div>

        <div className="flex items-center mb-4">
          <FaUserSecret className="text-orange-700 text-lg mr-2" />
          <div className="text-sm text-gray-600">{post.user}</div>
        </div>

        <div className="flex items-center mb-4">
          <FaThumbsUp
            className={`text-lg mr-2 cursor-pointer ${
              voteIcon ? "text-black" : "text-gray-400"
            }`}
            onClick={handleVote}
          />

          <span>{voteCount}</span>
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

export default PostDetail;
