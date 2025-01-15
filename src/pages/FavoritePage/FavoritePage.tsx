import { useAppSelector } from '../../app/hooks';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../types';

export const FavoritePage = () => {
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  const fetchFavorites = async (): Promise<Product[]> => {
    // for testing
    return Promise.resolve(favorites);
  };

  return <Catalog fetchProducts={fetchFavorites} title='Favorite Page' />; // for testing
};
