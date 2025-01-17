import { useLayoutEffect, useState } from 'react';
import { getProductList } from '../../api/getProductList';
import { useLocation } from 'react-router-dom';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../types';

export const AccessoriesPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);

  const location = useLocation();

  const category = location.pathname.split('/')[1];

  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getProductList();
        setProductList(data.filter((product) => product.category === category));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <h1>Accessories</h1>
      <Catalog
        productList={productList}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};
