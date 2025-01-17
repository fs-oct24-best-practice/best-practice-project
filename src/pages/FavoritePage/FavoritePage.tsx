import { useAppSelector } from '../../hooks/hooks';
import { Catalog } from '../../components/Catalog/Catalog';

export const FavoritePage = () => {
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  return (
    <>
      <h1>Fawotites Page</h1>
      <Catalog productList={favorites} isLoading={false} isError={false} />
    </>
  );
};
