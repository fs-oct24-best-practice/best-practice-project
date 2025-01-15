import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductSpec, Categories } from '../../types';
import { getSpecsList } from '../../api';
import { ProductDescription } from '../../components/ProductDescription';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';

const createNewItemId = (
  namespaceId: string,
  capacity: string,
  color: string
) => {
  return `${namespaceId}-${capacity}-${color}`.toLowerCase();
};

export const ProductDetailsPage: FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productSpecs, setProductSpecs] = useState<ProductSpec[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductSpec | null>(
    null
  );

  const navigate = useNavigate();
  const location = useLocation();

  const category = location.pathname.split('/')[1];
  const itemId = location.pathname.split('/')[2];

  useLayoutEffect(() => {
    const fetchProductSpecs = async (category: Categories) => {
      try {
        setIsError(false);
        setIsLoading(true);
        setProductSpecs(await getSpecsList(category));
      } catch (error) {
        setIsError(true);
        throw new Error(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductSpecs(category as Categories);
  }, [category]);

  useEffect(() => {
    if (productSpecs.length > 0) {
      const product = productSpecs.find((spec) => spec.id === itemId);
      setCurrentProduct(product || null);
      setIsError(!product);
    }
  }, [itemId, productSpecs]);

  const handleChangeColor = (color: string) => {
    if (currentProduct && color !== currentProduct.color) {
      const newPath = createNewItemId(
        currentProduct.namespaceId,
        currentProduct.capacity,
        color
      );
      navigate(`/${category}/${newPath}`);
    }
  };

  const handleChangeCapacity = (capacity: string) => {
    if (currentProduct && capacity !== currentProduct.capacity) {
      const newPath = createNewItemId(
        currentProduct.namespaceId,
        capacity,
        currentProduct.color
      );
      navigate(`/${category}/${newPath}`);
    }
  };

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <Loader />;
      case isError || !currentProduct:
        return (
          <h2>
            Something went wrong, try again or go back to the previous page
          </h2>
        );

      default:
        return (
          <ProductDescription
            currentProduct={currentProduct}
            handleChangeColor={handleChangeColor}
            handleChangeCapacity={handleChangeCapacity}
          />
        );
    }
  };

  return (
    <>
      <div>* Bread crumbs ... *</div>
      <div>Back</div>
      <h1 className={styles.visually_hidden}>Detailed product specification</h1>
      {renderContent()}
    </>
  );
};
