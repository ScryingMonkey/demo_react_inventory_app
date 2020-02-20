import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { appState, AppState } from "../context/AppState";
import { Loading, TopBar } from "./_index";
import { ProductList } from "./ProductList";
import { getAppFuncs, AppFuncs } from "../context/AppFuncs";
import { ProductDetail } from "./ProductDetail";

export const AppContext = createContext<AppState>(appState);

const App = () => {
  // global state that will be passed to presentational components
  const [context, setContext] = useState({ ...appState });

  // cf (context functions) is a list of functions that change the global context.
  // Keeping then here, and distributing them through the global context
  // allows me to keep presentational components small and dumb.
  // cf shouldn't be in this file, but I need the setContext function.
  // In a bigger project I would move these to a factory function that
  // took the setContext function as an input and returned this object.

  const f: AppFuncs = getAppFuncs(context, setContext);

  useEffect(() => {
    console.log("App mounted...");
    // make initial api call to get product list and update context
    f.updateLocalProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // runs as a pseudo-contructor

  useEffect(() => {
    console.log("...products updated");
    console.log(context.products);
  }, [context.products]);

  return (
    <AppContext.Provider
      value={{
        ...context,
        f: f
      }}
    >
      <BrowserRouter>
        <div className="App">
          <TopBar />
          {Object.keys(context.products).length < 1 ? (
            <Loading text="Loading..." />
          ) : (
            <div>
              <Switch>
                <Redirect from="/" to="/products" exact />
                <Route
                  path={"/products"}
                  component={ProductList}
                  exact={true}
                />
                <Route
                  path={"/products/:productId"}
                  component={ProductDetail}
                  exact={false}
                />
                <Redirect from="*" to="/products" />
              </Switch>
            </div>
          )}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
