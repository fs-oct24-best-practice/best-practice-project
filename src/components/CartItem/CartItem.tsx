import React from 'react';
import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from '../../features/cartReducer';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { ProductInCart } from '../../types/ProductInCart';
import { useAppSelector } from '../../hooks/hooks';
import cn from 'classnames';
import { Theme } from '../../types/Theme';

type Props = {
  item: ProductInCart;
  isDisabled?: boolean;
};

export const CartItem: React.FC<Props> = ({ item, isDisabled = false }) => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const handleIncrease = () => {
    if (!isDisabled) dispatch(increaseQuantity(item));
  };

  const handleDecrease = () => {
    if (!isDisabled) dispatch(decreaseQuantity(item));
  };

  const handleRemove = () => {
    if (!isDisabled) dispatch(deleteCart(item));
  };

  return (
    <div className={cn(styles.cart__item, styles[theme])}>
      {!isDisabled && (
        <button
          className={styles.cart__item__icon__close}
          onClick={handleRemove}
        >
          <img src='/img/icons/Close2.svg' alt='Close' />
        </button>
      )}
      <img
        src={item.image}
        alt={`${item.name} Image`}
        className={styles.cart__item__image}
      />
      <div className={styles.cart__item__description}>
        <Link
          to={`/${item.category}/${item.itemId}`}
          className={styles.cart__item__description__title}
        >
          {item.name}
        </Link>
      </div>
      <div className={styles.cart__item__actions}>
        <div className={styles.cart__item__actions__counter}>
          <button
            className={cn(
              styles.cart__item__actions__counter__button,
              styles.cart__item__actions__counter__button_minus
            )}
            onClick={handleDecrease}
            disabled={isDisabled}
          >
            <img src='/img/icons/Minus.svg' alt='Decrease quantity' />
          </button>
          <span>{item.quantity}</span>
          <button
            className={cn(
              styles.cart__item__actions__counter__button,
              styles.cart__item__actions__counter__button_plus
            )}
            onClick={handleIncrease}
            disabled={isDisabled}
          >
            <img
              src={`/img/icons/${theme === Theme.DARK ? 'UnionWhite.svg' : 'Union.svg'}`}
              alt='Increase quantity'
            />
          </button>
        </div>
        <span className={styles.cart__item__price}>
          ${(item.price || item.fullPrice) * item.quantity}
        </span>
      </div>
    </div>
  );
};
