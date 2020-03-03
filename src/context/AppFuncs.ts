import assert from 'assert';
import { AppState, MyDispatch } from './AppState';
import { AuthData } from '../types/_index';
import { Product } from '../types/Product';

const base =
  'https://dry-depths-65688.herokuapp.com/graphql';

export type AppFuncs = {
  login: (
    email: string,
    password: string
  ) => Promise<boolean>;
  getProducts: () => Promise<Product[]>;
  // getProduct: (productId: string) => Promise<Product>;
  setProduct: (p: Product) => Promise<string>;
  createProduct: (p: Product) => Promise<string>;
  deleteProduct: (productId: string) => Promise<string>;
  updateLocalProducts: () => void;
  setTopbarIcon: (
    topbarIcon: '' | 'back' | 'cancel' | 'plus',
    topBarClickHandler: () => void
  ) => void;
  [key: string]: (...args: any[]) => void;
};

// Api call pipeline
export const getAppFuncs = (
  context: AppState,
  setContext: MyDispatch
): AppFuncs => {
  const callApi = async (query: string) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    // if token is present, add to header
    if (context.authData.token) {
      headers['Authorization'] =
        'Bearer ' + context.authData.token;
    }
    const url = `${base}`;
    const requestBody = {
      query: query
    };
    // beginning of api call
    try {
      console.log(`Sending request to ${url}`);
      // console.log(headers);
      // console.log(JSON.stringify(requestBody));
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: headers
      });
      // throw error if response is not a 200
      assert(
        res.status === 200,
        `...received a ${res.status} response from ${res.url}.`
      );
      return await res.json();
    } catch (err) {
      console.error(`ApiError: ${err.message}`);
    }
  };

  const f = {
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
        console.error(
          `ApiResConversionError: ${err.message}`
        );
      }
    },
    getProducts: async () => {
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
    },
    setProduct: async (p: Product) => {
      // if product is not in list, create a new product
      if (
        context.products.filter(x => x._id === p._id)
          .length === 0
      ) {
        console.log('...not in list.  Creating new product.')
        return f.createProduct(p);
      }
      // else, set the fields on the existing product
      const query: string = `
        mutation {setProduct(data: { 
          _id:"${p._id}", 
          sku:"${p.sku}", 
          name:"${p.name}", 
          quantity:${parseInt(p.quantity)},
          imageUrl:"${p.imageUrl}", 
          costPrice:"${p.costPrice}"
        }   ) {_id, sku, name} }
      `;
      const json = await callApi(query);
      await f.updateLocalProducts();
      return json.data.setProduct as string;
    },
    createProduct: async (p: Product) => {
      // console.log('>createProduct()');
      const query: string = `
        mutation {createProduct(data: { 
          sku:"${p.sku}", 
          name:"${p.name}", 
          quantity:${parseInt(p.quantity)},
          imageUrl:"${p.imageUrl}", 
          costPrice:"${p.costPrice}"
        }   ) {_id, sku, name} }
      `;
      const json = await callApi(query);
      if ('errors' in json) {
        json.errors.forEach(e => {
          console.error(e.message);
          if (e.message.includes('duplicate key error')) {
            throw new Error(
              'SKU must be unique.  Please try a different SKU.'
            );
          }
          throw e;
        });
      }
      await f.updateLocalProducts();
      return json.data.createProduct as string;
    },
    deleteProduct: async productId => {
      const query: string = `
        mutation {deleteProduct(data: { 
          productId:"${productId}"
        })}
      `;
      const json = await callApi(query);
      await f.updateLocalProducts();
      return json.data.deleteProduct as string;
    },
    updateLocalProducts: async () => {
      const products = await f.getProducts();
      setContext({ ...context, products: products });
    },
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
  return f;
};
