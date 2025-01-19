import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from '../../features/cartReducer';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { ProductInCart } from '../../types/ProductInCart';

type Props = {
  item: ProductInCart;
  isDisabled?: boolean;
};

export const CartItem: React.FC<Props> = ({ item, isDisabled = false }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (!isDisabled) {
      dispatch(increaseQuantity(item));
    }
  };

  const handleDecrease = () => {
    if (!isDisabled) {
      dispatch(decreaseQuantity(item));
    }
  };

  const handleRemove = () => {
    if (!isDisabled) {
      dispatch(deleteCart(item));
    }
  };

  return (
    <div className={styles.cart__item}>
      <button
        className={styles.cart__item__close}
        onClick={handleRemove}
        disabled={isDisabled}
      >
        <img src='/img/icons/Close.svg' alt='Close' />
      </button>
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
            className={styles.cart__item__actions__counter__button}
            onClick={handleDecrease}
            disabled={isDisabled}
          >
            <img src='/img/icons/Minus.svg' alt='Decrease quantity' />
          </button>
          <span>{item.quantity}</span>
          <button
            className={styles.cart__item__actions__counter__button}
            onClick={handleIncrease}
            disabled={isDisabled}
          >
            <img src='/img/icons/Union.svg' alt='Increase quantity' />
          </button>
        </div>
        <span className={styles.cart__item__price}>
          ${(item.price || item.fullPrice) * item.quantity}
        </span>
      </div>
    </div>
  );
};
