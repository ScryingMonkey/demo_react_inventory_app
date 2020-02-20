import React from "react";
import "./CardDetail.css";

export const CardDetail: React.FC<{
  className?: string;
  item: { pathname: string };
}> = ({ className, item }) => {
  return <div className={"CardDetail " + className}>{item.pathname}</div>;
};
