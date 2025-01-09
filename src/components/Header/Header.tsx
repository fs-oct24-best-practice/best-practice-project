import {Link} from 'react-router';
import './Header.scss';

export const Header = () => {
	//const { pathname, key } = useLocation();

	console.log(location);

	return (
		<div className='Header'>
			<nav className='Header__nav'>
				<Link to='/'>Home</Link>
				<Link to='/phones'>Phones</Link>
				<Link to='/tablets'>Tablets</Link>
				<Link to='/accessories'>Accessories</Link>
				<Link to='/favorite'>Favorite</Link>
				<Link to='/cart'>Cart</Link>
			</nav>
		</div>
	);
};
