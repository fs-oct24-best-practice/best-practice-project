import { useEffect, useLayoutEffect, useState } from 'react';
import { Product } from '../../types/Product';

import { Carousel } from '../../components/Carousel';

import styles from './HomePage.module.scss';
import { Slider } from '../../components/Slider';
import { Categories } from '../../components/Categories';
import { getProductList } from '../../api/getProductList';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);
  const isDiscount = true;

  useLayoutEffect(() => {
    getProductList()
      .then((data) => setProductList(data))
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  useEffect(() => {}, []);

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
        <h1 className={styles.title__text}>Welcome to Nice Gadgets store!</h1>
      </div>

      <section className={styles.carousel}>
        <Carousel />
      </section>

      <section className={styles.newMmodels}>
        <Slider
          products={newProducts}
          title='Brand new models'
          isLoading={isLoading}
        />
      </section>

      <section className={styles.categories}>
        <Categories
          products={productList}
          title={'Shop by category'}
          isLoading={isLoading}
        />
      </section>

      <section className={styles.hotPrices}>
        <Slider
          products={productsWithDiscount}
          title='Hot Prices'
          discount={isDiscount}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};
