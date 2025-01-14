import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../components/api/apiE';
import { Loader } from '../../components/Loader';
import { Carousel } from '../../components/Carousel';

import './HomePage.scss';
import { Slider } from '../../components/Slider';
import { Categories } from '../../components/Categories';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
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

  return isLoading ? (
    <Loader />
  ) : (
    <div className='home-page'>
      <div className='home-page__container'>
        <div className='home-page__title'>
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>

        <Carousel />

        <section className='new-models'>
          <Slider products={products} title='Brand new models' />
        </section>

        <Categories products={products} title={'Shop by category'} />

        <section className='hot-prices'>
          <Slider products={products} title='Hot Prices' />
        </section>
      </div>
    </div>
  );
};
