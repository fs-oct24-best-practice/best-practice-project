import { NavLink } from 'react-router'
import './Header.scss'

export const Header = () => {
  //const { pathname, key } = useLocation();

  console.log(location)

  return (
    <div className="Header">
      <nav className="Header__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/phones">Phones</NavLink>
        <NavLink to="/tablets">Tablets</NavLink>
        <NavLink to="/accessories">Accessories</NavLink>
        <NavLink to="/favorite">Favorite</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </div>
  )
}
