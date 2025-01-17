import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

// import { getProducts } from '../../components/api/apiE';
import { Carousel } from '../../components/Carousel';

import './HomePage.scss';
import { Slider } from '../../components/Slider';
import { Categories } from '../../components/Categories';
import { getProductList } from '../../public-copy/api/api';
import { ProductCategories } from '../../utils/ProductCategories';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const isDiscount = true;

  console.log(products);

  useEffect(() => {
    getProductList(ProductCategories.PRODUCTS)
      .then((data) => setProducts(data))
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

  const newProducts = [...products].filter((product) => product.year >= 2022);

  const productsWithDiscount = [...products]
    .sort(
      (a, b) => b.fullPrice - (b.price || 0) - (a.fullPrice - (a.price || 0))
    )
    .filter((prod) => prod.fullPrice - (prod.price || 0) > 80);

  return (
    <div className='home-page'>
      <div className='home-page__title'>
        <h1 className='home-page__title--text'>
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <section className='carousel'>
        <Carousel />
      </section>

      <section className='new-models'>
        <Slider
          products={newProducts}
          title='Brand new models'
          isLoading={isLoading}
        />
      </section>

      <section className='categories'>
        <Categories
          products={products}
          title={'Shop by category'}
          isLoading={isLoading}
        />
      </section>

      <section className='hot-prices'>
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
