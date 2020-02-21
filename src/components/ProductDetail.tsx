import React, { useState, useContext, useEffect } from "react";
import { InputField } from "./InputField/InputField";
import { DisplayField } from "./DisplayField/DisplayField";
import { AppContext } from "./App";
import { Product } from "../types/Product";
import { useLocation, useHistory } from "react-router-dom";
import { SedCardHeader, SedFunctions } from "./SedCardHeader/SedCardHeader";

export const ProductDetail: React.FC<{}> = () => {
  const [status, setStatus] = useState<"display" | "editing" | "new">(
    "display"
  );
  const { products, f } = useContext(AppContext);
  const [product, setProduct] = useState(new Product());
  const history = useHistory();

  const changeHandler = (key: string, val: string) => {
    product[key] = val;
    setProduct(product);
  };
  let sf: SedFunctions = {
    saveHandler: () => {
      setStatus("display");
      f.setProduct(product);
    },
    editHandler: () => {
      history.push(`/products/${product._id}/edit`);
      setStatus("editing");
    },
    deleteHandler: () => {
      f.deleteProduct(product._id);
      history.push("/products");
    }
  };
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.split("/");
    console.log(`..path: ${path}`);
    let np = new Product();
    products.forEach(p => {
      if (p._id === path[2]) np = p;
    });
    setProduct(np);

    switch (path[3]) {
      case "edit":
        console.log("...case:edit");
        setStatus("editing");
        f.setTopbarIcon("cancel", () =>
          history.push(`/products/${np._id}/display`)
        );
        break;
      case "display":
        console.log("...case:display");
        setStatus("display");
        f.setTopbarIcon("back", () => history.push(`/products`));
        break;
      case "new":
        console.log("...case:new");
        setProduct(new Product());
        f.setTopbarIcon("back", () => history.push(`/products`));
        setStatus("new");
        break;
      default:
        console.log("...case:default");
        history.push(`/products/new`);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fields = Product.productFields;

  return (
    <div className="ProductDetail">
      <div className="container">
        <SedCardHeader id={product._id} name={product.name} sedFuncs={sf} />
        {Object.keys(fields).map((k: string, i: number) =>
          status === "display" ? (
            <DisplayField
              key={i}
              label={fields[k].label}
              type={fields[k].type}
              value={product[fields[k].valueKey] as string}
              valueKey={fields[k].valueKey}
            />
          ) : (
            <InputField
              key={i}
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
