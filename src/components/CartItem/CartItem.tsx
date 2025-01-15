import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from '../../reducers/cartReducer';
import './CartItem.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

type Props = {
  item: Product;
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
    <div className='cart__item'>
      <button className='cart__item__icon__close' onClick={handleRemove}>
        <img src='/img/icons/Close.svg' alt='Close' />
      </button>
      <img
        src={item.images[0]}
        alt={`${item.name} Image`}
        className='cart__item__image'
      />
      <div className='cart__item__description'>
        <Link
          to={`/phones/${item.id}`}
          className='cart__item__description__title'
        >
          {item.name}
        </Link>
      </div>
      <div className='cart__item__actions'>
        <div className='cart__item__actions__counter'>
          <button
            className='cart__item__actions__counter__button'
            onClick={handleDecrease}
          >
            <img src='/img/icons/Minus.svg' alt='Decrease quantity' />
          </button>
          <span>{item.quantity}</span>
          <button
            className='cart__item__actions__counter__button'
            onClick={handleIncrease}
          >
            <img src='/img/icons/Union.svg' alt='Increase quantity' />
          </button>
        </div>
        <span className='cart__item__price'>
          ${(item.price || item.fullPrice) * item.quantity}
        </span>
      </div>
    </div>
  );
};
