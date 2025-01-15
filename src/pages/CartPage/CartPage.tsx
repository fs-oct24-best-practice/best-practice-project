import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../components/CartItem';
import './CartPage.scss';
import { RootState } from '../../store';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clearCart } from '../../reducers/cartReducer';
import { Cart } from '../../types/Cart';

export const CartPage = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [modalMessage, setModalMessage] = useState<Cart>(Cart.DEFAULT);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (sum: number, item: Product) =>
      sum + (item.price || item.fullPrice) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (count: number, item: Product) => count + item.quantity,
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
    <div className='cart__page'>
      <div className='cart__back'>
        <img src='/img/icons/Back.svg' alt='Back' />
        <a href='' className='cart__back__button'>
          Back
        </a>
      </div>
      <h1 className='cart__title'>Cart</h1>
      <div className='cart__content'>
        <div className='cart__items'>
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className='cart__empty'>
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
        <div className='cart__summary'>
          <div className='summary__total'>
            <span className='span'>${totalCost}</span>
            <p className='summary__title'>Total for {totalItems} items:</p>
          </div>
          <button className='checkout__button' onClick={handleCheckout}>
            Checkout
          </button>
          <button className='checkout__button' onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
      {isCheckout && (
        <div className='checkout__modal'>
          <div className='checkout__modal__content'>
            <h2>The order has been placed successfully!</h2>
            <p>Thank you for your purchase!</p>
            <img src='/img/order.png' width={300} height={300} alt='Order' />
            <button
              className='checkout__button back__button'
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className='checkout__modal'>
          <div className='checkout__modal__content'>
            <h2>{modalMessage}</h2>
            <button
              className='checkout__button back__button'
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
