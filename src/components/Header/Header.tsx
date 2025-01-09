import { useState } from 'react'
import './Haeder.scss'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  //if the menu is open, we close it, and if the menu is closed, we open it.
  const toggleMenu = () => {
    setIsOpen(isOpen ? false : true)
  }

  return (
    <header className="header">
      <div className="header__nav">
        <a href="#">
          <img className="img" src="/img/icons&logo/Logo.png" alt="Nice Gadgets Logo" />
        </a>
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <a className="nav__link" href="#">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">
                Accessories
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__icons">
        <a href="#" className="icon icon-favourites">
          <img src="/img/icons&logo/Favourites.png" alt="Favourites" />
        </a>
        <a href="#" className="icon icon-cart">
          <img src="/img/icons&logo/Cart.png" alt="Shopping bag" />
        </a>
        {isOpen ? (
          <a href="#" className="icon icon-burger" onClick={toggleMenu}>
            <img src="/img/icons&logo/Close.png" alt="Shopping bag" />
          </a>
        ) : (
          <a href="#" className="icon icon-burger" onClick={toggleMenu}>
            <img src="/img/icons&logo/Menu.png" alt="Shopping bag" />
          </a>
        )}
      </div>
      {isOpen && (
        <div className="bottom_menu">
          <div className="bottom_wrap">
            <button className="icon-menu">
              <a href="#">
                <img src="/img/icons&logo/Favourites.png" alt="Favourites" />
              </a>
            </button>
            <button className="icon-menu">
              <a href="#">
                <img src="/img/icons&logo/Cart.png" alt="Shopping-cart" />
              </a>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
