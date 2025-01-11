import {NavLink} from 'react-router-dom';
import './CartItem.scss';

export const CartItem = () => {
	return (
		<div className='cart__item'>
			<a href='#' className='cart__item__icon__close'>
				<svg
					width='10'
					height='10'
					viewBox='0 0 10 10'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M9.47205 1.47138C9.7324 1.21103 9.7324 0.788925 9.47205 0.528575C9.21171 0.268226 8.7896 0.268226 8.52925 0.528575L5.00065 4.05717L1.47206 0.528575C1.21171 0.268226 0.789596 0.268226 0.529247 0.528575C0.268897 0.788925 0.268897 1.21103 0.529247 1.47138L4.05784 4.99998L0.529247 8.52857C0.268897 8.78892 0.268897 9.21103 0.529247 9.47138C0.789596 9.73173 1.21171 9.73173 1.47206 9.47138L5.00065 5.94279L8.52925 9.47138C8.7896 9.73173 9.21171 9.73173 9.47205 9.47138C9.7324 9.21103 9.7324 8.78892 9.47205 8.52857L5.94346 4.99998L9.47205 1.47138Z'
						fill='#B4BDC4'
					/>
				</svg>
			</a>
			<img
				src='./img/phones/apple-iphone-14-pro/spaceblack/00.webp'
				alt='product'
				className='cart__item__image'
			/>
			<div className='cart__item__description'>
				<NavLink to={`/phones/:productId`} className='cart__item__description__title'>
					Apple iPhone 14 Pro 128GB Silver (MQ023)
				</NavLink>
			</div>
			<div className='cart__item__actions'>
				<div className='cart__item__actions__counter'>
					<button className='cart__item__actions__counter__button'>
						<svg
							className='cart__item__actions__counter__button--minus'
							width='12'
							height='2'
							viewBox='0 0 12 2'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M0.666016 0.99998C0.666016 0.63179 0.964492 0.333313 1.33268 0.333313H10.666C11.0342 0.333313 11.3327 0.63179 11.3327 0.99998C11.3327 1.36817 11.0342 1.66665 10.666 1.66665H1.33268C0.964492 1.66665 0.666016 1.36817 0.666016 0.99998Z'
								fill='#B4BDC4'
							/>
						</svg>
					</button>
					<span>1</span>
					<button className='cart__item__actions__counter__button'>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M6.66602 1.33335C6.66602 0.965164 6.36754 0.666687 5.99935 0.666687C5.63116 0.666687 5.33268 0.965164 5.33268 1.33335V5.33335H1.33268C0.964492 5.33335 0.666016 5.63183 0.666016 6.00002C0.666016 6.36821 0.964492 6.66669 1.33268 6.66669H5.33268V10.6667C5.33268 11.0349 5.63116 11.3334 5.99935 11.3334C6.36754 11.3334 6.66602 11.0349 6.66602 10.6667V6.66669H10.666C11.0342 6.66669 11.3327 6.36821 11.3327 6.00002C11.3327 5.63183 11.0342 5.33335 10.666 5.33335H6.66602V1.33335Z'
								fill='#313237'
							/>
						</svg>
					</button>
				</div>
				<span className='cart__item__price'>$999</span>
			</div>
		</div>
	);
};
