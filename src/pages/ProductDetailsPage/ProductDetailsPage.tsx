import { FC, useLayoutEffect, useState } from 'react';
import { ProductSpec, Categories } from '../../types';
import { getCategoryList } from '../../api';
import { ProductDescription } from '../../components/ProductDescription';

const currentProductID = 'apple-iphone-11-128gb-black';

export const ProductDetailsPage: FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productSpecs, setProductSpecs] = useState<ProductSpec[]>([]);

  useLayoutEffect(() => {
    async function fetchProductSpecs(category: Categories) {
      try {
        setIsError(false);
        setIsLoading(true);
        setProductSpecs(await getCategoryList(category));
      } catch (error) {
        setIsError(true);
        throw new Error(String(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductSpecs('phones'); // зараз захардкодив, потім буде братися з URL або передаватися пропсом
  }, []);

  const currentProductSpec = productSpecs.find(
    (spec) => currentProductID === spec.id
  );
  console.log('currentProduct ProductDetailsPage: ', currentProductSpec);

  const componentForRender = () => {
    switch (true) {
      case isLoading:
        return <div>loading, please wait</div>;
      case isError:
        return <div>something wrong</div>;
      case !productSpecs.length:
        return <div>no list</div>;
      case !currentProductSpec:
        return <div>no specs</div>;
      default:
        return <ProductDescription currentProductSpec={currentProductSpec} />;
    }
  };

  return (
    <>
      <div>* Bread crumbs ... *</div>
      <div>Back</div>
      {componentForRender()}
    </>
  );
};
