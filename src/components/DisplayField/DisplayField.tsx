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
      className={`DisplayField${type === " longtext" ? " textfield" : ""}`}
    >
      <div className="label"> {label} </div>
      <div className="value"> {value ? value : noVal} </div>
    </div>
  );
};
