import { useDispatch } from 'react-redux';
import { CartItem } from '../../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clearCart } from '../../features/cartReducer';
import { Cart } from '../../types/Cart';
import styles from './CartPage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { ProductInCart } from '../../types/ProductInCart';

export const CartPage = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [modalMessage, setModalMessage] = useState<Cart>(Cart.DEFAULT);
  const cartItems = useAppSelector((state) => state.cartProducts.cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (sum: number, item: ProductInCart) =>
      sum + (item.price || item.fullPrice) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (count: number, item: ProductInCart) => count + item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setModalMessage(Cart.NO_PRODUCTS);
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setIsCheckout(true);
      dispatch(clearCart());

      setTimeout(() => {
        setIsCheckout(false);
        navigate('/');
      }, 3000);
    }
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      setModalMessage(Cart.EMPTY_CART);
      setIsEmpty(true);
    } else {
      dispatch(clearCart());
    }
  };

  const closeModal = () => {
    setIsEmpty(false);
  };

  return (
    <div className={styles.cart__page}>
      <div className={styles.cart__back}>
        <img src='/img/icons/Back.svg' alt='Back' />
        <a href='' className={styles.cart__back__button}>
          Back
        </a>
      </div>
      <h1 className={styles.cart__title}>Cart</h1>
      <div className={styles.cart__content}>
        <div className={styles.cart__items}>
          {cartItems.length > 0 ? (
            cartItems.map((item: ProductInCart) => (
              <CartItem key={item.id} item={item} />
            ))
          ) : (
            <div className={styles.cart__empty}>
              <p>Cart is empty</p>
              <img
                src='/img/empty.svg'
                width={350}
                height={350}
                alt='Empty Cart'
              />
            </div>
          )}
        </div>
        <div className={styles.cart__summary}>
          <div className={styles.summary__total}>
            <span className={styles.span}>${totalCost}</span>
            <p className={styles.summary__title}>
              Total for {totalItems} items:
            </p>
          </div>
          <button className={styles.checkout__button} onClick={handleCheckout}>
            Checkout
          </button>
          <button className={styles.checkout__button} onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
      {isCheckout && (
        <div className={styles.checkout__modal}>
          <div className={styles.checkout__modal__content}>
            <h2>The order has been placed successfully!</h2>
            <p>Thank you for your purchase!</p>
            <img src='/img/order.png' width={300} height={300} alt='Order' />
            <button
              className={styles.checkout__button + ' ' + styles.back__button}
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className={styles.checkout__modal}>
          <div className={styles.checkout__modal__content}>
            <h2>{modalMessage}</h2>
            <button
              className={styles.checkout__button + ' ' + styles.back__button}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
