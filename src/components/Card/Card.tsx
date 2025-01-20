import { Link } from 'react-router-dom';
import styles from './Card.module.scss';
import { Product } from '../../types/Product';
import { useAppSelector } from '../../hooks/hooks';
import { Actions } from '../Actions';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={`${styles.product_card} ${styles[theme]}`}>
      <Link to={`/${category}/${itemId}`} className={styles.product_card__link}>
        <div className={styles.product_card__link_content}>
          <img
            className={styles.product_card__image}
            src={image}
            alt={`${name} Image`}
          />

          <div className={styles.product_card__name}>{name}</div>
        </div>
      </Link>
      <div className={styles.product_card__price}>
        {price ? (
          <>
            <span className={styles.product_card__price_discount}>
              ${price}
            </span>
            <span className={styles.product_card__full_price}>
              ${fullPrice}
            </span>
          </>
        ) : (
          <span className={styles.product_card__full_price}>${fullPrice}</span>
        )}
      </div>
      <div className={styles.product_card__separator}></div>
      <div className={styles.product_card__features}>
        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>Screen:</div>
          <div className={styles.product_card__feature_value}>{screen}</div>
        </div>

        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>Capacity:</div>
          <div className={styles.product_card__feature_value}>{capacity}</div>
        </div>

        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>RAM:</div>
          <div className={styles.product_card__feature_value}>{ram}</div>
        </div>
      </div>

      <Actions product={product} />
    </div>
  );
};
