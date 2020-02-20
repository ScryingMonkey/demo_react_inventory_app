import React from "react";
import "./Loading.css";

export const Loading: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <div className="Loading">
      <div className="loader">{text}</div>
    </div>
  );
};
