import './Haeder.scss'
export const Header = () => {
  //animation button
  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    button.classList.toggle('opened')
    const isOpened = button.classList.contains('opened')
    button.setAttribute('aria-expanded', isOpened.toString())
  }

  return (
    <header className="header">
      <div className="header__nav">
        <a href="#">
          <img className="img" src="/img/icons&logo/Logo.png" alt="Nice Gadgets Logo" />
        </a>
        <nav className="nav">
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
        <a href="#" className="icon icon-bag">
          <img src="/img/icons&logo/Cart.png" alt="Shopping bag" />
        </a>
        <button
          className="icon-burger"
          onClick={toggleMenu}
          aria-label="Main Menu"
          style={{
            width: '24px',
            height: '24px',
            padding: 0,
            border: 'none',
            background: 'none',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
