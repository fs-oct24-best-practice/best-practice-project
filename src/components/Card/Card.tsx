import { useState } from 'react';
import styles from './Card.module.scss';
import favourites_icon from '/img/card/favourites-icon.svg';
import favourites_filled_icon from '/img/card/favourites-filled-icon.svg';
import cN from 'classnames';

export const Card = () => {
  const [favouriteIcon, setFavouriteIcon] = useState<string>(favourites_icon);
  const [buttonText, setButtonText] = useState('Add to cart');

  function toggleFavourite() {
    setFavouriteIcon(
      favouriteIcon === favourites_icon
        ? favourites_filled_icon
        : favourites_icon
    );
  }

  function onAddToCart() {
    setButtonText(buttonText === 'Add to cart' ? 'Added' : 'Add to cart');
  }

  const product = {
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-7-32gb-black',
    name: 'Apple iPhone 7 32GB Black',
    fullPrice: 400,
    price: 375,
    screen: "4.7' IPS",
    capacity: '32GB',
    color: 'black',
    ram: '2GB',
    year: 2016,
    image: 'img/phones/apple-iphone-7/black/00.webp',
  };

  return (
    <div className={styles.product_card}>
      <img
        className={styles.product_card__image}
        src='/img/card/test.webp'
        alt={`${product.name} Image`}
      />

      <a className={styles.product_card__name} href='#'>
        {product.name}
      </a>

      <a className={styles.product_card__price} href='#'>
        {`$${product.price} `}
        <span
          className={styles.product_card__fullPrice}
        >{`$${product.fullPrice}`}</span>
      </a>

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
          className={cN(styles.product_card__buy, {
            [styles.product_card__added]: buttonText === 'Added',
          })}
        >
          {buttonText}
        </button>

        <button
          onClick={toggleFavourite}
          className={styles.product_card__favourite_button}
        >
          <img src={favouriteIcon} alt='back to top icon' />
        </button>
      </div>
    </div>
  );
};
