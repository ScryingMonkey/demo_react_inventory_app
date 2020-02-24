import React, {
  createContext,
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import { appState, AppState } from '../context/AppState';
import { Loading, TopBar } from './_index';
import { ProductList } from './ProductList';
import { getAppFuncs, AppFuncs } from '../context/AppFuncs';
import { ProductDetail } from './ProductDetail';
import { LoginPage } from './LoginPage/LoginPage';

export const AppContext = createContext<AppState>(appState);

const App = () => {
  // global state that will be passed to presentational components
  const [context, setContext] = useState({ ...appState });
  const f: AppFuncs = getAppFuncs(context, setContext);

  useEffect(() => {
    console.log('App mounted...');
    // make initial api call to get product list and update context
    f.updateLocalProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // runs as a pseudo-contructor

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
                  path={'/login'}
                  component={LoginPage}
                  exact
                />
                <Route
                  path={'/products'}
                  component={ProductList}
                  exact={true}
                />
                <Route
                  path={'/products/:productId'}
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
