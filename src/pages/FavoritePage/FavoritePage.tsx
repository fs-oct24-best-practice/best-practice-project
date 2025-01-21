import { useAppSelector } from '../../hooks/hooks';
import { Catalog } from '../../components/Catalog/Catalog';
import { useTranslation } from 'react-i18next';

export const FavoritePage = () => {
  const { t } = useTranslation();
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  return (
    <>
      <h1>{t('favorites')}</h1>
      <Catalog productList={favorites} isLoading={false} isError={false} />
    </>
  );
};
