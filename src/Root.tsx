import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritePage } from './pages/FavoritePage';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

export const Root = () => {
  const isAuthenticated = (): boolean => {
    const user = localStorage.getItem('user');
    return !!user;
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='home' element={<Navigate to='/' replace />} />
              <Route index element={<HomePage />} />
              <Route path='phones'>
                <Route index element={<PhonesPage />} />
                <Route path=':itemId' element={<ProductDetailsPage />} />
              </Route>
              <Route path='tablets'>
                <Route index element={<TabletsPage />} />
                <Route path=':itemId' element={<ProductDetailsPage />} />
              </Route>
              <Route path='accessories'>
                <Route index element={<AccessoriesPage />} />
                <Route path=':itemId' element={<ProductDetailsPage />} />
              </Route>
              <Route path='favorite' element={<FavoritePage />} />
              <Route path='cart' element={<CartPage />} />
              <Route path='auth' element={<AuthPage />} />
              <Route
                path='dashboard'
                element={
                  isAuthenticated() ? (
                    <DashboardPage />
                  ) : (
                    <Navigate to='/auth' replace />
                  )
                }
              />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};
