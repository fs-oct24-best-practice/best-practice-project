
import {useState} from 'react';
import './Header.scss';
import {NavLink} from 'react-router-dom';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	//const { pathname, key } = useLocation();
	
	const toggleMenu = () => {
		setIsOpen(isOpen ? false : true);
	};

	return (
		<header className='header'>
			<div className='header__nav'>
				<NavLink to='/'>
					<img className='img' src='/img/icons&logo/Logo.png' alt='Nice Gadgets Logo' />
				</NavLink>
				<nav className={`nav ${isOpen ? 'open' : ''}`}>
					<ul className='nav__list'>
						<li className='nav__item'>
							<NavLink className='nav__link' to='/'>
								Home
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink className='nav__link' to='/phones'>
								Phones
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink className='nav__link' to='/tablets'>
								Tablets
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink className='nav__link' to='/accessories'>
								Accessories
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<div className='header__icons'>
				<NavLink to='/favorite' className='icon icon-favourites'>
					<img src='/img/icons&logo/Favourites.png' alt='Favourites' />
				</NavLink>
				<NavLink to='/cart' className='icon icon-cart'>
					<img src='/img/icons&logo/Cart.png' alt='Shopping bag' />
				</NavLink>
				{isOpen ? (
					<a href='#' className='icon icon-burger' onClick={toggleMenu}>
						<img src='/img/icons&logo/Close.png' alt='Close' />
					</a>
				) : (
					<a href='#' className='icon icon-burger' onClick={toggleMenu}>
						<img src='/img/icons&logo/Menu.png' alt='Menu' />
					</a>
				)}
			</div>
			{isOpen && (
				<div className='bottom_menu'>
					<div className='bottom_wrap'>
						<button className='icon-menu'>
							<NavLink to='/favorite'>
								<img src='/img/icons&logo/Favourites.png' alt='Favourites' />
							</NavLink>
						</button>
						<button className='icon-menu'>
							<NavLink to='/cart'>
								<img src='/img/icons&logo/Cart.png' alt='Shopping-cart' />
							</NavLink>
						</button>
					</div>
				</div>
			)}
		</header>
	);
};
