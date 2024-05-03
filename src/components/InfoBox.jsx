import React from "react";
import { Link } from "react-router-dom";

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md text-center`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} text-large mt-2 mb-4`}>{children}</p>
      <Link
        to={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white text-md rounded-xl px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
