import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

import styles from './HomePage.module.scss';
import { Slider } from '../../components/Slider';
import { Categories } from '../../components/Categories';
import { getProductList } from '../../api/getProductList';
import { Carousel } from '../../components/Carousel';
import { useAppSelector } from '../../hooks/hooks';
import classNames from 'classnames';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    getProductList()
      .then((data) => setProductList(data))
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const newProducts = [...productList].filter(
    (product) => product.year >= 2022
  );

  const productsWithDiscount = [...productList]
    .sort(
      (a, b) => b.fullPrice - (b.price || 0) - (a.fullPrice - (a.price || 0))
    )
    .filter((prod) => prod.fullPrice - (prod.price || 0) > 80);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__title}>
        <h1
          className={classNames(styles.title__text, {
            [styles.title_dark]: theme !== 'light', // Використовуємо styles для модульних класів
          })}
        >
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <section className={styles.carousel}>
        <Carousel themeColor={theme} />
      </section>

      <section className={styles.newMmodels}>
        <Slider
          products={newProducts}
          title='Brand new models'
          isLoading={isLoading}
          themeColor={theme}
        />
      </section>

      <section className={styles.categories}>
        <Categories
          products={productList}
          title={'Shop by category'}
          isLoading={isLoading}
          themeColor={theme}
        />
      </section>

      <section className={styles.hotPrices}>
        <Slider
          products={productsWithDiscount}
          title='Hot Prices'
          isLoading={isLoading}
          themeColor={theme}
        />
      </section>
    </div>
  );
};
