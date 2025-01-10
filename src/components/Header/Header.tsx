import { NavLink } from 'react-router'
import './Header.scss'

export const Header = () => {
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
