import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductSpec, Categories, Product } from '../../types';
import { getSpecList, getProductListFast } from '../../api';
import { ProductDescription } from '../../components/ProductDescription';
import styles from './ProductDetailsPage.module.scss';
import { filterFactory, shuffleArray } from '../../utils';
import { Slider } from '../../components/Slider';

export const ProductDetailsPage: FC = () => {
  const [isError, setIsError] = useState(false);
  const [currentProductSpec, setCurrentProductSpec] =
    useState<ProductSpec | null>(null);
  const [currentProduct, setCurrentProduct] = useState<
    Product | null | undefined
  >(null);
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [recommendetList, setRecommendetList] = useState<Product[] | null>(
    null
  );

  const location = useLocation();

  const category = location.pathname.split('/')[1];
  const itemId = location.pathname.split('/')[2];

  useLayoutEffect(() => {
    const fetchAndFindProductSpec = async (
      category: Categories,
      itemId: string
    ) => {
      setIsError(false);

      try {
        const specsList = await getSpecList(category);

        const currentProductSpec = specsList.find((spec) => spec.id === itemId);

        if (currentProductSpec) {
          setCurrentProductSpec(currentProductSpec);
        } else {
          throw Error;
        }
      } catch {
        setIsError(true);
      }
    };

    fetchAndFindProductSpec(category as Categories, itemId);
  }, [category, itemId]);

  useEffect(() => {
    const findProduct = async () => {
      const data = await getProductListFast();
      if (data) {
        setProductList(await getProductListFast());
      }
      setCurrentProduct(data.find((product) => product.itemId === itemId));
    };

    findProduct();
  }, [itemId]);

  useEffect(() => {
    if (productList && currentProduct) {
      const recommendedList = productList.filter(
        filterFactory(
          (product) => product.category === currentProductSpec?.category,
          (product) =>
            currentProductSpec?.capacityAvailable.includes(product.capacity) ??
            false,
          (product) => product.ram === currentProductSpec?.ram
        )
      );
      setRecommendetList(shuffleArray(recommendedList));
    }
  }, [currentProduct, currentProductSpec, productList]);

  return (
    <div className={styles.container}>
      <h1 className={styles.visually_hidden}>Detailed product specification</h1>
      {/* <div>* Bread crumbs ... *</div>
      <div>Back</div> */}
      {isError && (
        <h2>Something went wrong, try again or go back to the previous page</h2>
      )}
      {!isError && !!currentProductSpec && !!currentProduct && (
        <ProductDescription
          currentProductSpec={currentProductSpec}
          currentProduct={currentProduct}
        />
      )}
      {recommendetList && (
        <section className={styles.hotPrices}>
          <Slider
            products={recommendetList}
            title='You may also like'
            isLoading={false}
          />
        </section>
      )}
    </div>
  );
};
