import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import HomeIcon from '../../assets/icons/home.svg';
import HomeIconWhite from '../../assets/icons/home-white.svg';
import ArrowRight from '../../assets/icons/arrow-right-grey.svg';
import cn from 'classnames';
import { makeStringCapitalize } from '../../utils';
import { useEffect, useState } from 'react';
import { getProductListFast, getSpecList } from '../../api';
import { Categories, Product, ProductSpec } from '../../types';
import { Theme } from '../../types/Theme';
import { useAppSelector } from '../../hooks/hooks';

export const Breadcrumbs = () => {
  const [productTitle, setProductTitle] = useState<string | null>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const itemId = location.pathname.split('/')[2];

  useEffect(() => {
    if (itemId) {
      const receiveProductTitle = async () => {
        const data: Product[] = await getProductListFast();
        const currentProduct = !data
          ? null
          : data.find((product) => product.itemId === itemId);

        const productSpecList: ProductSpec[] | null = !currentProduct
          ? null
          : await getSpecList(category as Categories);

        const currentProductSpec = !productSpecList
          ? null
          : productSpecList?.find((spec) => spec.id === itemId);

        if (currentProductSpec) {
          setProductTitle(currentProductSpec.name);
        }
      };

      receiveProductTitle();
    }
  }, [category, itemId]);

  const setCrumbsClass = ({ itemId }: { itemId: string }) => {
    return cn({
      [styles.bread_crumbs__link]: true,
      [styles.bread_crumbs__link__has_product]: itemId,
    });
  };

  return (
    <div className={styles.bread_crumbs}>
      <Link to='/'>
        <img
          src={theme === Theme.DARK ? HomeIconWhite : HomeIcon}
          className={styles.bread_crumbs__icon}
          alt='yankee go home!'
        />
      </Link>
      <img src={ArrowRight} className={styles.bread_crumbs__icon} />

      <Link to={`/${category}`} className={setCrumbsClass({ itemId })}>
        {makeStringCapitalize(category)}
      </Link>
      {itemId && (
        <>
          <img src={ArrowRight} />
          <p className={styles.bread_crumbs__text}>{productTitle}</p>
        </>
      )}
    </div>
  );
};
