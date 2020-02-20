import React from "react";
import "./CardList.css";

export const CardList: React.FC<{
  className?: string;
  items: {
    label: string;
    clickFunc: (event: React.MouseEvent) => void;
  }[];
}> = ({ className, items }) => {
  return (
    <div className={"CardList " + className}>
      {items.map((item, i) => (
        <button
          key={i}
          className="card"
          onClick={event => item.clickFunc(event)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
