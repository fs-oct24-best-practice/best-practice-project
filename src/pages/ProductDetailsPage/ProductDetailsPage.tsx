import { FC, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductSpec, Categories } from '../../types';
import { getSpecList } from '../../api';
import { ProductDescription } from '../../components/ProductDescription';
import { Loader } from '../../components/Loader';

export const ProductDetailsPage: FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductSpec, setCurrentProductSpec] =
    useState<ProductSpec | null>(null);

  const location = useLocation();

  const category = location.pathname.split('/')[1];
  const itemId = location.pathname.split('/')[2];

  useLayoutEffect(() => {
    async function fetchAndFindProductSpec(
      category: Categories,
      itemId: string
    ) {
      try {
        setIsError(false);
        setIsLoading(true);

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
    }

    fetchAndFindProductSpec(category as Categories, itemId);
  }, [category, itemId]);

  return (
    <>
      <div>* Bread crumbs ... *</div>
      <div>Back</div>
      {isLoading && <Loader />}
      {isError && (
        <h2>Something went wrong, try again or go back to the previous page</h2>
      )}
      {!isError && !!currentProductSpec && (
        <ProductDescription currentProductSpec={currentProductSpec} />
      )}
    </>
  );
};
