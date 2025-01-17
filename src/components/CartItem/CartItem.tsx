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
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(item));
  };

  const handleRemove = () => {
    dispatch(deleteCart(item));
  };

  return (
    <div className={styles.cart__item}>
      <button className={styles.cart__item__icon__close} onClick={handleRemove}>
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
          >
            <img src='/img/icons/Minus.svg' alt='Decrease quantity' />
          </button>
          <span>{item.quantity}</span>
          <button
            className={styles.cart__item__actions__counter__button}
            onClick={handleIncrease}
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
