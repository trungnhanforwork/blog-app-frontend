import React from "react";
import { isTokenExpired } from "../utils/authUtils";

const TokenCheckPage = () => {
  const token = localStorage.getItem("token");

  const handleCheckToken = () => {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      console.log("Token has expired.");
    } else {
      console.log("Token is still valid.");
    }
  };

  return (
    <div>
      <h1>Token Check Page</h1>
      <button onClick={handleCheckToken}>Check Token</button>
    </div>
  );
};

export default TokenCheckPage;
