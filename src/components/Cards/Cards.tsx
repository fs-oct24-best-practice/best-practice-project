import { FC } from 'react';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Product } from '../../types';
import styles from './Cards.module.scss';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  products: Product[];
};

export const Cards: FC<Props> = ({ products }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={cn(styles.catalog__container, styles[theme])}>
      <ul className={styles.catalog__grid}>
        {products.map((product) => (
          <li key={product.id} className={styles.catalog__card}>
            <Card product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
