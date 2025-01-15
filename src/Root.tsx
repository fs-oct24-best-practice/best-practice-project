import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritePage } from './pages/FavoritePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';

export const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='home' element={<Navigate to='/' replace />} />
              <Route index element={<HomePage />} />
              <Route
                path='phones'
                element={<CatalogPage category='phones' />}
              />
              <Route
                path='phones/:itemId'
                element={<ProductDetailsPage />}
              ></Route>
              <Route
                path='tablets'
                element={<CatalogPage category='tablets' />}
              />
              <Route
                path='tablets/:itemId'
                element={<ProductDetailsPage />}
              ></Route>
              <Route
                path='accessories'
                element={<CatalogPage category='accessories' />}
              />
              <Route
                path='accessories/:itemId'
                element={<ProductDetailsPage />}
              ></Route>
              <Route path='favorite' element={<FavoritePage />} />
              <Route path='cart' element={<CartPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};
