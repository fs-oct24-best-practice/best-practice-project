import {useState} from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	//const { pathname, key } = useLocation();
	// console.log(location);

	const toggleMenu = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<header className='header'>
			<div className='header__nav'>
				<Link to='/' onClick={toggleMenu}>
					<img className='img' src='/img/icons&logo/Logo.png' alt='Nice Gadgets Logo' />
				</Link>
				<nav className={`nav ${isOpen ? 'open' : ''}`}>
					<ul className='nav__list'>
						<li className='nav__item'>
							<Link className='nav__link' to='/' onClick={toggleMenu}>
								Home
							</Link>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' to='/phones' onClick={toggleMenu}>
								Phones
							</Link>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' to='/tablets' onClick={toggleMenu}>
								Tablets
							</Link>
						</li>
						<li className='nav__item'>
							<Link className='nav__link' to='/accessories' onClick={toggleMenu}>
								Accessories
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className='header__icons'>
				<Link to='/favorite' className='icon icon-favourites'>
					<img src='/img/icons&logo/Favourites.png' alt='Favourites' />
				</Link>
				<Link to='/cart' className='icon icon-cart'>
					<img src='/img/icons&logo/Cart.png' alt='Shopping bag' />
				</Link>
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
							<Link to='/favorite'>
								<img
									src='/img/icons&logo/Favourites.png'
									alt='Favourites'
									onClick={toggleMenu}
								/>
							</Link>
						</button>
						<button className='icon-menu'>
							<Link to='/cart'>
								<img
									src='/img/icons&logo/Cart.png'
									alt='Shopping-cart'
									onClick={toggleMenu}
								/>
							</Link>
						</button>
					</div>
				</div>
			)}
		</header>
	);
};
