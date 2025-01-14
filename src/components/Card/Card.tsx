import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Card.module.scss';
import favourites_icon from '/img/card/favourites-icon.svg';
import favourites_filled_icon from '/img/card/favourites-filled-icon.svg';
import { ButtonText } from '../../types/ButtonText';
import { Product } from '../../types/Product';

type CardItemProps = {
  product: Product;
};

export const Card: React.FC<CardItemProps> = ({ product }) => {
  const [favouriteIcon, setFavouriteIcon] = useState(favourites_icon);
  const [buttonText, setButtonText] = useState(ButtonText.ADD_TO_CART);

  const toggleFavourite = () => {
    setFavouriteIcon(
      favouriteIcon === favourites_icon
        ? favourites_filled_icon
        : favourites_icon
    );
  };

  const onAddToCart = () => {
    setButtonText(
      buttonText === ButtonText.ADD_TO_CART
        ? ButtonText.ADDED
        : ButtonText.ADD_TO_CART
    );
  };

  return (
    <div className={styles.product_card}>
      <img
        className={styles.product_card__image}
        src={product.image}
        alt={`${product.name} Image`}
      />

      <Link
        to={`/${product.category}/${product.id}`}
        className={styles.product_card__name}
      >
        {product.name}
      </Link>

      <div className={styles.product_card__price}>
        {product.priceDiscount ? (
          <>
            <span className={styles.product_card__price_discount}>
              ${product.priceDiscount}
            </span>
            <span className={styles.product_card__fullPrice}>
              ${product.priceRegular}
            </span>
          </>
        ) : (
          <span className={styles.product_card__price}>
            ${product.priceRegular}
          </span>
        )}
      </div>

      <div className={styles.product_card__separator}></div>

      <div className={styles.product_card__features}>
        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>Screen:</div>
          <div className={styles.product_card__feature_value}>
            {product.screen}
          </div>
        </div>

        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>Capacity:</div>
          <div className={styles.product_card__feature_value}>
            {product.capacity}
          </div>
        </div>

        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>RAM:</div>
          <div className={styles.product_card__feature_value}>
            {product.ram}
          </div>
        </div>
      </div>

      <div className={styles.product_card__actions}>
        <button
          onClick={onAddToCart}
          className={cn(styles.product_card__buy, {
            [styles.product_card__added]: buttonText === ButtonText.ADDED,
          })}
        >
          {buttonText}
        </button>

        <button
          onClick={toggleFavourite}
          className={styles.product_card__favourite_button}
        >
          <img src={favouriteIcon} alt='favourite icon' />
        </button>
      </div>
    </div>
  );
};
