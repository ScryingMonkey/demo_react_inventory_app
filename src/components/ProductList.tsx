import React, { useContext, useEffect } from "react";
import { CardList } from "./CardList/CardList";
import { AppContext } from "./App";
import { useHistory } from "react-router-dom";

export const ProductList = () => {
  const { products, f } = useContext(AppContext);
  const history = useHistory();

  const sedFunctions = {
    editHandler: (id: string) => {
      console.log("> ProductList.editHandler()");
      history.push(`/products/${id}/edit`);
    },
    deleteHandler: (id: string) => {
      f.deleteProduct(id);
    }
  };

  const productCards = products.map((p, i) => {
    const click = (e: React.MouseEvent) => {
      console.log(`>ProductList.productCards.click(${e})`);
      console.log(e.currentTarget);
      history.push(`/products/${e.currentTarget.id}/display`);
    };
    return { product: p, id: p._id, label: p.name, clickFunc: click };
  });

  const newProduct = () => {
    history.push("/products/new");
  };

  useEffect(() => {
    f.setTopbarIcon("plus", newProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Style product tiles
  return (
    <div className="ProductList">
      {productCards.length < 1 ? (
        <div className="prompt">No product matches found.</div>
      ) : (
        <CardList
          items={productCards}
          className="container"
          sedButtons={true}
          sf={sedFunctions}
        />
      )}
    </div>
  );
};
