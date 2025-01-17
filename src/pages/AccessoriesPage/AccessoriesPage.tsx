/* eslint-disable */
import { useEffect, useState } from 'react';
import { getProductList } from '../../api/getProductList';
import { useLocation } from 'react-router-dom';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../types';

export const AccessoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<Product[]>([]);
  // console.log('productList: ', productList);

  const location = useLocation();

  const category = location.pathname.split('/')[1];
  console.log('category: ', category);

  useEffect(() => {
    getProductList()
      .then((data) =>
        setProductList(data.filter((product) => product.category === category))
      )

      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <>
      <h1>Accessories</h1>
      <Catalog products={productList} />
    </>
  );
};
