import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductSpec, Categories, Product } from '../../types';
import { getSpecList, getProductListFast } from '../../api';
import { ProductDescription } from '../../components/ProductDescription';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductSpec, setCurrentProductSpec] =
    useState<ProductSpec | null>(null);
  const [currentProduct, setCurrentProduct] = useState<
    Product | null | undefined
  >(null);

  const location = useLocation();

  const category = location.pathname.split('/')[1];
  const itemId = location.pathname.split('/')[2];

  useEffect(() => {
    const findProduct = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getProductListFast();
        setCurrentProduct(data.find((product) => product.itemId === itemId));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    findProduct();
  }, [itemId]);

  useEffect(() => {
    const fetchAndFindProductSpec = async (
      category: Categories,
      itemId: string
    ) => {
      setIsError(false);
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFindProductSpec(category as Categories, itemId);
  }, [category, itemId, currentProduct]);

  return (
    <div className={styles.container}>
      <h1 className={styles.visually_hidden}>Detailed product specification</h1>
      {/* <div>* Bread crumbs ... *</div>
      <div>Back</div> */}
      {isLoading && <Loader />}
      {isError && (
        <h2>Something went wrong, try again or go back to the previous page</h2>
      )}
      {!isError && !!currentProductSpec && !!currentProduct && (
        <ProductDescription
          currentProductSpec={currentProductSpec}
          currentProduct={currentProduct}
        />
      )}
    </div>
  );
};
