import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className='header'>
			<div className='header__nav'>
				<NavLink to='/' className='header__logo' onClick={toggleMenu}>
					<img src='/img/icons/Logo.svg' alt='Nice Gadgets Logo' />
				</NavLink>
				<nav className={`nav ${isOpen ? 'nav--open' : ''}`}>
					<ul className='nav__list'>
						<li className='nav__item'>
							<NavLink
								className='nav__link'
								to='/'
								onClick={toggleMenu}
							>
								Home
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink
								className='nav__link'
								to='/phones'
								onClick={toggleMenu}
							>
								Phones
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink
								className='nav__link'
								to='/tablets'
								onClick={toggleMenu}
							>
								Tablets
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink
								className='nav__link'
								to='/accessories'
								onClick={toggleMenu}
							>
								Accessories
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>

			<div className='header__icons'>
				<NavLink to='/favorite' className='icon icon--favourites'>
					<img src='/img/icons/Favourites.svg' alt='Favourites' />
				</NavLink>
				<NavLink to='/cart' className='icon icon--cart'>
					<img src='/img/icons/Cart.svg' alt='Cart' />
				</NavLink>
				<a
					href='#'
					className='icon icon--burger'
					onClick={toggleMenu}
				>
					<img
						src={`/img/icons/${isOpen ? 'Close.svg' : 'Menu.svg'}`}
						alt={isOpen ? 'Close menu' : 'Open menu'}
					/>
				</a>
			</div>

			{isOpen && (
				<div className='header__bottom-menu'>
					<div className='header__bottom-wrap'>
						<NavLink to='/favorite' className='icon-menu' onClick={toggleMenu}>
							<img src='/img/icons/Favourites.svg' alt='Favourites' />
						</NavLink>
						<NavLink to='/cart' className='icon-menu' onClick={toggleMenu}>
							<img src='/img/icons/Cart.svg' alt='Cart' />
						</NavLink>
					</div>
				</div>
			)}
		</header>
	);
};
