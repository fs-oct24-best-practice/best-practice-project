import { useAppSelector } from '../../app/hooks';
import { Catalog } from '../../components/Catalog/Catalog';

export const FavoritePage = () => {
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  return (
    <>
      <h1>Fawotites Page</h1>
      <Catalog products={favorites} />
    </>
  );
};
