import assert from "assert";
import { AppState, MyDispatch } from "./AppState";
import { AuthData } from "../types/_index";
import { Product } from "../types/Product";
import { ProductList } from "../components/ProductList";

const base = "https://dry-depths-65688.herokuapp.com/graphql";

export type AppFuncs = {
  login: (email: string, password: string) => Promise<boolean>;
  getProducts: () => Promise<Product[]>;
  // getProduct: (productId: string) => Promise<Product>;
  setProduct: (p: Product) => Promise<string>;
  createProduct: (p: Product) => Promise<string>;
  deleteProduct: (productId: string) => Promise<string>;
  updateLocalProducts: () => void;
  setTopbarIcon: (
    topbarIcon: "" | "back" | "cancel" | "plus",
    topBarClickHandler: () => void
  ) => void;
  [key: string]: (...args: any[]) => void;
};

export const getAppFuncs = (
  context: AppState,
  setContext: MyDispatch
): AppFuncs => {
  const callApi = async (query: string) => {
    const headers = {
      "Content-Type": "application/json"
    };
    if (context.authData.token) {
      headers["Authorization"] = "Bearer " + context.authData.token;
    }
    const url = `${base}/${query}`;
    const requestBody = {
      query: query
    };
    try {
      console.log(`Sending request to ${url}`);
      console.log(headers);
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: headers
      });

      console.log(res);
      assert(
        res.status === 200,
        `...received a ${res.status} response from ${res.url}.`
      );
      console.log(res);
      return await res.json();
    } catch (err) {
      console.error(`ApiError: ${err.message}`);
    }
  };

  const getProducts = async () => {
    const query = `
      query {
        products {_id,sku, name,quantity,imageUrl,costPrice,lastUpdated}
      }
    `;
    const json = await callApi(query);
    return json.data.products.map(p => {
      const np = new Product();
      np.setConfig(p);
      return np;
    }) as Product[];
  };

  const updateLocalProducts = async () => {
    const products = await getProducts();
    setContext({ ...context, products: products });
  };

  const createProduct = async (p: Product) => {
    console.log(">createProduct()");
    console.log(p);
    const query: string = `
      mutation {createProduct(data: { 
        sku:"${p.sku}", 
        name:"${p.name}", 
        imageUrl:"${p.imageUrl}", 
        costPrice:"${p.costPrice}"
      }   ) {sku, name} }
    `;
    const json = await callApi(query);
    if ("errors" in json) {
      json.errors.forEach(e => console.error(e.message));
      return null;
    }
    await updateLocalProducts();
    return json.data.createProduct.sku as string;
  };

  return {
    login: async (email, password) => {
      const query: string = `
        query { 
          login ( email:"${email}",password:"${password}" ) {userId, token, tokenExpiration}
        }
      `;
      try {
        const json = await callApi(query);
        const authData: AuthData = await json.data.login;
        setContext({
          ...context,
          authData: authData
        });
        return authData.tokenExpiration > 0;
      } catch (err) {
        console.error(`ApiResConversionError: ${err.message}`);
      }
    },
    getProducts: getProducts,
    setProduct: async (p: Product) => {
      // if product is not in list, create a new product
      if (context.products.filter(x => x._id === p._id).length === 0) {
        return createProduct(p);
      }
      // else, set the fields on the existing product
      const query: string = `
        mutation {setProduct(data: { 
          _id:"${p._id}", 
          sku:"${p.sku}", 
          name:"${p.name}", 
          imageUrl:"${p.imageUrl}", 
          costPrice:"${p.costPrice}"
        }   ) {sku, name} }
      `;
      const json = await callApi(query);
      await updateLocalProducts();
      return json.data.setProduct._id as string;
    },
    createProduct: createProduct,
    deleteProduct: async productId => {
      const query: string = "";
      const json = await callApi(query);
      await updateLocalProducts();
      return json.data.deleteProduct as string;
    },
    updateLocalProducts: updateLocalProducts,
    setTopbarIcon: (topbarIcon, topBarClickHandler) => {
      setContext({
        ...context,
        state: {
          ...context.state,
          topbarIcon: topbarIcon,
          topBarClickHandler: topBarClickHandler
        }
      });
    }
  };
};
