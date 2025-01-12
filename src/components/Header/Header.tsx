import {useState} from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className='header'>
			<div className='header__nav'>
				<Link to='/' onClick={toggleMenu}>
					<img src='/img/icons/Logo.svg' />
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
					<img src='/img/icons/Favourites.svg' />
				</Link>
				<Link to='/cart' className='icon icon-cart'>
					<img src='/img/icons/Cart.svg' />
				</Link>
				{isOpen ? (
					<a href='#' className='icon icon-burger' onClick={toggleMenu}>
						<img src='/img/icons/Close.svg' />
					</a>
				) : (
					<a href='#' className='icon icon-burger' onClick={toggleMenu}>
						<img src='/img/icons/Menu.svg' />
					</a>
				)}
			</div>
			{isOpen && (
				<div className='bottom__menu'>
					<div className='bottom__wrap'>
						<button className='icon-menu'>
							<Link to='/favorite' onClick={toggleMenu}>
								<img src='/img/icons/Favourites.svg' />
							</Link>
						</button>
						<button className='icon-menu'>
							<Link to='/cart' onClick={toggleMenu}>
								<img src='/img/icons/Cart.svg' />
							</Link>
						</button>
					</div>
				</div>
			)}
		</header>
	);
};
