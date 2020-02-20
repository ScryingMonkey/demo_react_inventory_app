import React from "react";
import "./SearchBar.css";

export const SearchBar: React.FC<{
  value: string;
  changeFunc: (e: React.ChangeEvent) => void;
}> = ({ value, changeFunc }) => {
  return (
    <div className="SearchBar">
      <input type="text" value={value} onChange={changeFunc} />
    </div>
  );
};
