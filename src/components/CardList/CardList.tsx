import React from "react";
import "./CardList.css";
import { SedCardHeader, SedFunctions } from "../SedCardHeader/SedCardHeader";

export const CardList: React.FC<{
  className?: string;
  items: {
    id: string;
    label: string;
    clickFunc: (event: React.MouseEvent) => void;
  }[];
  sf?: SedFunctions;
  sedButtons?: boolean;
}> = ({ className, items, sedButtons, sf }) => {
  return (
    <div className={"CardList " + className}>
      {sedButtons
        ? items.map((item, i) => (
            <button key={i} id={item.id}>
              <div className="card">
                <SedCardHeader id={item.id} sedFuncs={sf} />
                <div
                  className="label"
                  id={item.id}
                  onClick={event => item.clickFunc(event)}
                >
                  {item.label}
                </div>
              </div>
            </button>
          ))
        : items.map((item, i) => (
            <button
              key={i}
              id={item.id}
              className="card"
              onClick={event => item.clickFunc(event)}
            >
              <div className="label">{item.label}</div>
            </button>
          ))}
    </div>
  );
};
