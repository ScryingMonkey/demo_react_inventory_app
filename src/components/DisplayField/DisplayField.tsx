import React from "react";
import "./DisplayField.css";

export const DisplayField: React.FC<{
  type?: string;
  label: string;
  value: string;
  valueKey?: string;
}> = ({ type, label, value, valueKey }) => {
  const noVal = "No Value";
  return (
    <div
      id={valueKey}
      className={
        type === "longtext" ? "display-field-textfield" : "display-field"
      }
    >
      <span className="label"> {label} </span>
      <span className="value"> {value ? value : noVal} </span>
    </div>
  );
};
