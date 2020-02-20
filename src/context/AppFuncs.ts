import assert from "assert";
import { AppState, MyDispatch } from "./AppState";
import { AuthData } from "../types/_index";
import { Product } from "../types/Product";
import { ProductList } from "../components/ProductList";

const base = "https://dry-depths-65688.herokuapp.com/graphql";

const callApi = async (query: string) => {
  const url = `${base}/${query}`;
  const requestBody = {
    query: query
  };

  try {
    console.log(`Sending request to ${url}`);
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
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

export type AppFuncs = {
  login: (email: string, password: string) => Promise<AuthData>;
  getProducts: () => Promise<Product[]>;
  // getProduct: (productId: string) => Promise<Product>;
  setProduct: (p: Product) => Promise<string>;
  createProduct: (p: Product) => Promise<string>;
  deleteProduct: (productId: string) => Promise<string>;
  updateLocalProducts: () => void;
  setState: (
    topbarIcon: "" | "back" | "cancel" | "plus",
    topBarClickHandler: () => void
  ) => void;
  [key: string]: (...args: any[]) => void;
};

export const getAppFuncs = (
  context: AppState,
  setContext: MyDispatch
): AppFuncs => {
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
    const query: string = `
  {"query": "mutation {
    createProduct(
      data:{
        sku:\"${p.sku}\", name:\"${p.name}\", imageUrl:\"${p.imageUrl}\", costPrice:\"${p.costPrice}\"
      }) {_id} }"
  }
  `;
    const json = await callApi(query);
    return json.data.createProduct.sku as string;
  };

  return {
    login: async (email, password) => {
      const query: string = `
    {"query": "query {
        login(email:\"test@test.com\",password:\"password\") 
        {userId,token,tokenExpiration} 
    }"}
    `;
      const json = await callApi(query);
      return json.data.login as AuthData;
    },
    getProducts: getProducts,
    setProduct: async (p: Product) => {
      // if product is not in list, create a new product
      if (context.products.filter(x => x._id === p._id).length === 0) {
        return createProduct(p);
      }
      // else, set the fields on the existing product
      const query: string = `
    {"query": "mutation {
      setProduct(data:{_id:\"${p._id}\", quantity:${p.quantity}}) 
      {_id} }"
    }
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
    setState: (topbarIcon, topBarClickHandler) => {
      setContext({
        ...context,
        state: {
          topbarIcon: topbarIcon,
          topBarClickHandler: topBarClickHandler
        }
      });
    }
  };
};
