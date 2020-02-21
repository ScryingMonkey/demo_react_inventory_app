import React from "react";
import Edit from "@material-ui/icons/Edit";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Save from "@material-ui/icons/Save";
import "./SedCardHeader.css";

export type SedFunctions = {
  deleteHandler?: (id: string) => void;
  editHandler?: (id: string) => void;
  saveHandler?: (id: string) => void;
};

export const SedCardHeader: React.FC<{
  id: string;
  name?: string;
  sedFuncs: SedFunctions;
}> = ({ id, name, sedFuncs }) => {
  return (
    <div className="SedCardHeader">
      <h1>{name}</h1>
      <div className="pointer">
        {"deleteHandler" in sedFuncs ? (
          <DeleteOutlined
            onClick={() => sedFuncs.deleteHandler(id)}
            color="action"
            fontSize="large"
          />
        ) : null}
        {"editHandler" in sedFuncs ? (
          <Edit
            onClick={() => sedFuncs.editHandler(id)}
            color="action"
            fontSize="large"
          />
        ) : null}

        {"saveHandler" in sedFuncs ? (
          <Save
            onClick={() => sedFuncs.saveHandler(id)}
            color="action"
            fontSize="large"
          />
        ) : null}
      </div>
    </div>
  );
};
