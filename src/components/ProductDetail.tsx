import React, { useState, useContext, useEffect } from "react";
import { InputField } from "./InputField/InputField";
import { DisplayField } from "./DisplayField/DisplayField";
import { AppContext } from "./App";
import { Product } from "../types/Product";
import { useLocation, useHistory } from "react-router-dom";
// import Edit from "@material-ui/icons/Edit";
// import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
// import Save from "@material-ui/icons/Save";

export const ProductDetail: React.FC<{}> = () => {
  const [status, setStatus] = useState<"display" | "editing" | "new">(
    "display"
  );
  const { products, f } = useContext(AppContext);
  const [product, setProduct] = useState(new Product());
  const history = useHistory();

  const changeHandler = (key: string, val: string) => {};
  const save = () => {
    setStatus("display");
    f.setProduct(product).then(res => f.updateLocalProducts());
  };
  const edit = () => {
    setStatus("editing");
  };

  const deleteProduct = () => {
    f.deleteProduct(product._id);

    history.push("/products");
  };
  const location = useLocation();
  useEffect(() => {
    const productId = location.pathname.split("/")[2];
    if (productId === "new") {
      setProduct(new Product());
      setStatus("new");
    } else {
      setProduct(products.filter(p => (p._id = productId))[0]);
      setStatus("display");
    }
    f.setState("back", history.goBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fields = Product.productFields;
  // TODO: Style product input fields
  return (
    <div className="ProductDetail">
      <div className="container">
        <ProductDetailHeader
          name={product.name}
          editHandler={edit}
          deleteHandler={deleteProduct}
          saveHandler={save}
        />
        {Object.keys(fields).map((k: string, i: number) =>
          status === "display" ? (
            <DisplayField
              label={fields[k].label}
              type={fields[k].type}
              value={product[fields[k].valueKey] as string}
              valueKey={fields[k].valueKey}
            />
          ) : (
            <InputField
              key={k}
              name={fields[k].valueKey}
              label={fields[k].label}
              value={product[fields[k].valueKey] as string}
              valueKey={fields[k].valueKey}
              type={fields[k].type}
              min={fields[k].min ? fields[k].min : "none"}
              step={fields[k].step ? fields[k].step : "none"}
              changeHandler={changeHandler}
            />
          )
        )}
      </div>
    </div>
  );
};

const ProductDetailHeader: React.FC<{
  name: string;
  deleteHandler: () => void;
  editHandler: () => void;
  saveHandler: () => void;
}> = props => {
  // TODO: Fix Material Icon buttons
  return (
    <div className="header">
      <h1>{props.name}</h1>
      <div className="pointer">
        {/* <DeleteOutlined onClick={() => props.deleteHandler()} color="action" />
        <Edit onClick={() => props.editHandler()} color="action" />
        <Save onClick={() => props.saveHandler()} color="action" /> */}
      </div>
    </div>
  );
};
