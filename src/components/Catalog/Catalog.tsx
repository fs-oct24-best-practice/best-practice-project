import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { Card } from '../Card/Card';

import styles from './Catalog.module.scss';
import { CardSkeleton } from '../skeletons';

type CatalogProps = {
  fetchProducts: () => Promise<Product[]>;
  title: string;
};

export const Catalog: React.FC<CatalogProps> = ({ fetchProducts, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOption = searchParams.get('sort') || 'model';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = searchParams.get('perPage') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), sort: value });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      perPage: value === 'all' ? '' : value,
    });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'alphabet') {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === 'price') {
      return a.priceRegular - b.priceRegular;
    }

    if (sortOption === 'model') {
      const extractModelNumber = (name: string): number => {
        const parts = name.split(' ');
        const modelPart = parts.find((part) => {
          if (part.includes('X')) return true;
          return !isNaN(parseInt(part, 10));
        });

        if (modelPart?.includes('X')) {
          return 10;
        }

        const number = modelPart ? parseInt(modelPart, 10) : 0;
        return number;
      };

      return extractModelNumber(b.name) - extractModelNumber(a.name);
    }

    return 0;
  });

  const itemsPerPage =
    perPage === 'all' ? products.length : parseInt(perPage, 10);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className={styles.catalog__container}>
        <ul className={styles.catalog__grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className={styles.catalog__card}>
              <CardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.catalog__container}>
        <p className={styles.catalog__error}>
          Something went wrong. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className={styles.catalog__reload}
        >
          Reload
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className={styles.catalog__message}>No products available.</p>;
  }

  return (
    <div className={styles.catalog__container}>
      <h1 className={styles.catalog__title}>{title}</h1>

      <div className={styles.catalog__filters}>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className={styles.catalog__select}
        >
          <option value='model'>Newest</option>
          <option value='alphabet'>Alphabetically</option>
          <option value='price'>Cheapest</option>
        </select>

        <select
          value={perPage}
          onChange={handlePerPageChange}
          className={styles.catalog__select}
        >
          <option value='4'>4</option>
          <option value='8'>8</option>
          <option value='16'>16</option>
          <option value='all'>All</option>
        </select>
      </div>

      <ul className={styles.catalog__grid}>
        {paginatedProducts.map((product) => (
          <li key={product.id} className={styles.catalog__card}>
            <Card product={product} />
          </li>
        ))}
      </ul>

      <div className={styles.catalog__pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            disabled={page === index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={cn(styles.catalog__button, {
              [styles['catalog__button--active']]: page === index + 1,
            })}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
