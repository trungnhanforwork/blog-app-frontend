import { useState, useEffect } from "react";
import { getToken } from "../utils/authUtils";

const VoteStatus = (postId) => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchVotingStatus = async () => {
      const token = getToken();
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DJANGO_PUBLIC_API_DOMAIN}/blog/${postId}/voting-status/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHasVoted(data.hasVoted);
        } else {
          console.error("Failed to fetch voting status:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching voting status:", error);
      }
    };

    fetchVotingStatus();
  }, [postId]);

  return hasVoted;
};

export default VoteStatus;