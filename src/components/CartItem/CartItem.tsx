import {Link} from 'react-router-dom';
import './CartItem.scss';

export const CartItem = () => {
	return (
		<div className='cart__item'>
			<a href='#' className='cart__item__icon__close'>
				<img src='/img/icons/Close.svg' />
			</a>
			<img
				src='./img/phones/apple-iphone-14-pro/spaceblack/00.webp'
				alt='product'
				className='cart__item__image'
			/>
			<div className='cart__item__description'>
				<Link to={`/phones/:productId`} className='cart__item__description__title'>
					Apple iPhone 14 Pro 128GB Silver (MQ023)
				</Link>
			</div>
			<div className='cart__item__actions'>
				<div className='cart__item__actions__counter'>
					<button className='cart__item__actions__counter__button'>
						<img
							src='/img/icons/Minus.svg'
							className='cart__item__actions__counter__button--minus'
						/>
					</button>
					<span>1</span>
					<button className='cart__item__actions__counter__button'>
						<img src='/img/icons/Union.svg' />
					</button>
				</div>
				<span className='cart__item__price'>$999</span>
			</div>
		</div>
	);
};
