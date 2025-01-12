import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritePage } from './pages/FavoritePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='home' element={<Navigate to='/' replace />} />
          <Route index element={<HomePage />} />

          <Route path='phones'>
            <Route index element={<PhonesPage />} />
            <Route path=':productId' element={<ProductDetailsPage />} />
          </Route>

          <Route path='tablets'>
            <Route index element={<TabletsPage />} />
            <Route path=':productId' element={<ProductDetailsPage />} />
          </Route>

          <Route path='accessories'>
            <Route index element={<AccessoriesPage />} />
            <Route path=':productId' element={<ProductDetailsPage />} />
          </Route>

          <Route path='favorite' element={<FavoritePage />} />
          <Route path='cart' element={<CartPage />} />

          <Route path='*' element={<NotFoundPage />} />

          {/* temporary path to navigate to the page*/}
          <Route path='Product' element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
