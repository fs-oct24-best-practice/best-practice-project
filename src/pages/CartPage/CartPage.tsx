import {CartItem} from '../../components/CartItem';
import './CartPage.scss';
export const CartPage = () => {
	return (
		<div className='cart__page'>
			<div className='cart__back'>
				<img src='/img/icons/Back.svg' />

				<a href='' className='cart__back__button'>
					Back
				</a>
			</div>
			<h1 className='cart__title'>Cart</h1>
			<div className='cart__content'>
				<div className='cart__items'>
					<CartItem />
					<CartItem />
				</div>
				<div className='cart__summary'>
					<div className='summary__total'>
						<span>$2657</span>
						<p className='summary__title'>Total for 3 items:</p>
					</div>
					<div className='checkout__wrap'>
						<button className='checkout__button'>Checkout</button>
					</div>
				</div>
			</div>
		</div>
	);
};
