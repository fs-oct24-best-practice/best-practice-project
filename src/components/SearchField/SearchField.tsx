import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SearchField.module.scss';
import { Product } from '../../types/Product';
import { getProductList } from '../../api/getProductList';
import { Link, useParams } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { ProductCategories } from '../../utils/ProductCategories';
import { debounce } from '../../utils/debounce';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';

export const SearchField: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  const toggleSearch = () => {
    setIsVisible(!isVisible);

    if (isVisible) {
      inputRef.current?.blur();
      setIsShown(false);
      setSearchTerm('');
      setProducts([]);
    } else {
      inputRef.current?.focus();
      setIsShown(true);
    }
  };

  const fetchProducts = (query: string) => {
    const preparedQuery = query.trim().toLowerCase();

    getProductList(ProductCategories.PHONES).then(
      (productsFromServer: Product[]) => {
        const filteredProducts = productsFromServer.filter(
          (product: Product) =>
            preparedQuery !== '' &&
            product.name.toLowerCase().includes(preparedQuery)
        );
        setProducts(filteredProducts);
      }
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProductsWithDelay = useCallback(debounce(fetchProducts, 500), [
    fetchProducts,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetchProductsWithDelay(event.target.value);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (window.innerWidth > 1200) {
        setIsShown(false);
      }
    }, 150);
  };

  const handleSearchClose = () => {
    setSearchTerm('');
    setIsVisible(false);
    setProducts([]);
  };

  useEffect(() => {
    if (Object.entries(params).length !== 0) {
      setIsShown(false);
      setSearchTerm('');
      setIsVisible(false);
      setProducts([]);
    }
  }, [params]);

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const product = products[index];
    const route =
      product.category === ProductCategories.PHONES
        ? RoutesPathes.PHONES
        : product.category === ProductCategories.TABLETS
          ? RoutesPathes.TABLETS
          : RoutesPathes.ACCESSORIES;

    return (
      <Link
        to={`${route}/${product.itemId}`}
        key={product.id}
        style={style}
        className={classNames(styles.searchOption, styles.link)}
      >
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div>
          <div className={styles.text}>{product.name}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.searchContainer}>
      <div className={classNames(styles.icon)} onClick={toggleSearch}></div>
      <div
        className={`${styles.searchInput} ${isVisible ? styles.slideDown : styles.slideUp}`}
      >
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          ref={inputRef}
          onFocus={() => setIsShown(true)}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
        <span className={styles.searchClose} onClick={handleSearchClose}>
          &#x2716;
        </span>
      </div>
      {isShown && products.length !== 0 && (
        <div className={styles.optionsContainer}>
          <List
            height={400}
            itemCount={products.length}
            itemSize={100}
            width='100%'
          >
            {renderRow}
          </List>
        </div>
      )}
    </div>
  );
};
