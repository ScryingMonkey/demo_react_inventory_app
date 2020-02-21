import React, { useState } from "react";
import "./ErrorPresenter.css";

export const ErrorPresenter: React.FC<{
  show: boolean;
  msg: string;
}> = props => {
  return (
    <div className="ErrorPresenter">
      <div className="msg" style={{ display: props.show ? "block" : "none" }}>
        {props.msg}
      </div>
    </div>
  );
};
