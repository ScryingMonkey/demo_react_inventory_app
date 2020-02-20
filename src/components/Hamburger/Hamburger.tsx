import React from "react";
import "./Hamburger.css";

export const Hamburger: React.FC<{
  icon: "" | "back" | "cancel" | "plus";
  click: () => void;
}> = ({ icon, click }) => {
  return (
    <div className="Hamburger">
      <i className={`container ${icon}`} onClick={() => click()}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </i>
    </div>
  );
};
