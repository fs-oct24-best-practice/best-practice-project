import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Navbar.module.scss';
import { Pages } from '../../../types';
import { selectCartQuantity } from '../../../reducers/cartReducer';

export const Navbar = () => {
  const cartQuantity = useSelector(selectCartQuantity);

  const setNavClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.navbar__link]: true,
      [styles.navbar__link_active]: isActive,
    });
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__pages}>
        {Object.entries(Pages).map((page) => {
          return (
            <li key={page[0]} className={styles.navbar__page}>
              <NavLink className={setNavClasses} to={`/${page[1]}`}>
                {page[0]}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <ul className={styles.navbar__chosen}>
        <li>
          <NavLink to='/favorite' className={setNavClasses}>
            <div className={styles.navbar__chosen__block}>
              <img
                src='/img/icons/Favourites.svg'
                alt='Favourites'
                className={styles.navbar__chosen__icon}
              />
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to='/cart' className={setNavClasses}>
            <div className={styles.navbar__chosen__block}>
              <img
                src='/img/icons/Cart.svg'
                alt='Cart'
                className={styles.navbar__chosen__icon}
              />
              {cartQuantity > 0 && (
                <span className={styles.navbar__notification_badge}>
                  {cartQuantity}
                </span>
              )}
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
