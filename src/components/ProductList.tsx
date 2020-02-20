import React, { useContext, useEffect } from "react";
import { CardList } from "./CardList/CardList";
import { AppContext } from "./App";
import { useHistory } from "react-router-dom";

export const ProductList = () => {
  const { products, f } = useContext(AppContext);
  const history = useHistory();

  const productCards = products.map((p, i) => {
    const click = (e: React.MouseEvent) => {
      history.push(`/products/${e.currentTarget.textContent}`);
    };
    return { product: p, label: p.name, clickFunc: click };
  });

  const newProduct = () => {
    history.push("/products/new");
  };

  useEffect(() => {
    f.setState("plus", newProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Style product tiles
  return (
    <div className="ProductList">
      {productCards.length < 1 ? (
        <div className="prompt">No breed matches found.</div>
      ) : (
        <CardList items={productCards} className="container" />
      )}
    </div>
  );
};

// const SaveCancelButtonBar: React.FC<{
//   cancel: () => void;
//   save: () => void;
// }> = ({ cancel, save }) => {
//   return (
//     <div className="cb-list-item cb-list-button-bar-2">
//       <HalfWidthButton
//         label="Cancel"
//         type={ButtonType.cancel}
//         clickHandler={cancel}
//       />
//       <HalfWidthButton
//         label="Save"
//         type={ButtonType.save}
//         clickHandler={save}
//       />
//     </div>
//   );
// };
