import { useAppSelector } from '../../hooks/hooks';
import { Catalog } from '../../components/Catalog/Catalog';
import styles from './FavoritePage.module.scss';

export const FavoritePage = () => {
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  const favoritesLength = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  ).length;

  return (
    <div className={styles.FavoritesPage}>
      <h1 className={styles.favoritesPage__title}>Fawotites Page</h1>
      <p
        className={styles.favoritesPage__quantity}
      >{`${favoritesLength} ${favoritesLength > 1 ? 'items' : 'item'}`}</p>
      <Catalog productList={favorites} isLoading={false} isError={false} />
    </div>
  );
};
