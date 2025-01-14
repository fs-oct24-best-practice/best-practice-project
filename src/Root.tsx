import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritePage } from './pages/FavoritePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='home' element={<Navigate to='/' replace />} />
          <Route index element={<HomePage />} />

          <Route path='phones' element={<CatalogPage category='phones' />} />
          <Route path='tablets' element={<CatalogPage category='tablets' />} />
          <Route
            path='accessories'
            element={<CatalogPage category='accessories' />}
          />
          <Route path='favorite' element={<FavoritePage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='Product' element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
