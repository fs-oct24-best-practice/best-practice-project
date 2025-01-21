import { useAppSelector } from '../../hooks/hooks';
import { Cards } from '../../components/Cards/Cards';
import styles from './FavoritePage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';

export const FavoritePage = () => {
  const { t } = useTranslation();
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  const favoritesLength = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  ).length;

  return (
    <div className={styles.FavoritesPage}>
      <Breadcrumbs />
      <h1 className={styles.favoritesPage__title}>
        {t('favorites_page.title')}
      </h1>
      <p
        className={styles.favoritesPage__quantity}
      >{`${favoritesLength} ${favoritesLength > 1 ? 'items' : 'item'}`}</p>
      <Cards products={favorites} />{' '}
    </div>
  );
};
