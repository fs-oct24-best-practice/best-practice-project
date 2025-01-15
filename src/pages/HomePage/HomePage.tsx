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

  const isDiscount = true;

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

  const newProducts = [...products].filter((product) => product.year >= 2022);

  const productsWithDiscount = [...products]
    .sort(
      (a, b) => b.fullPrice - (b.price || 0) - (a.fullPrice - (a.price || 0))
    )
    .filter((prod) => prod.fullPrice - (prod.price || 0) > 80);

  return (
    <div className='home-page'>
      <div className='home-page__container'>
        <div className='home-page__title'>
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>

        <Carousel />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <section className='new-models'>
              <Slider products={newProducts} title='Brand new models' />
            </section>

            <Categories products={products} title={'Shop by category'} />

            <section className='hot-prices'>
              <Slider
                products={productsWithDiscount}
                title='Hot Prices'
                discount={isDiscount}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};
