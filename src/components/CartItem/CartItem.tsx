import './CartItem.scss';

export const CartItem = () => {
	return (
		<div className='cart_item'>
			<a href='#' className='icon_close'>
				<img src='/img/icons&logo/Close-gray.png' alt='Close' />
			</a>
			<img
				src='./img/phones/apple-iphone-14-pro/spaceblack/00.webp'
				alt='product'
				className='item_image'
			/>
			<div className='item_description'>
				<p>Apple iPhone 14 Pro 128GB Silver (MQ023)</p>
			</div>
			<div className='item_actions'>
				<div className='item_counter'>
					<button className='button_minus'>
						<img src='/img/icons&logo/Minus.png' alt='' />
					</button>
					<span>1</span>
					<button className='button_union'>
						<img src='/img/icons&logo/Union.png' alt='' />
					</button>
				</div>
				<span className='item_price'>$999</span>
			</div>
		</div>
	);
};
