import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Navbar.module.scss';
import { Pages } from '../../../types';
import { SearchField } from '../../SearchField/SearchField';
import { useAppSelector } from '../../../hooks/hooks';

export const Navbar = () => {
  const favoritesLength = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  ).length;

  const cartLength = useAppSelector((state) =>
    state.cartProducts.cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

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

      <div className={styles.navbar__search}>
        <SearchField />
      </div>

      <ul className={styles.navbar__chosen}>
        <li>
          <NavLink to='/favorite' className={setNavClasses}>
            <div className={styles.navbar__chosen__block}>
              <img
                src='/img/icons/Favourites.svg'
                alt='Favourites'
                className={styles.navbar__chosen__icon}
              />
              <div
                className={cn([styles.navbar__notification_badge], {
                  [styles.navbar__hidden]: !favoritesLength,
                })}
              >
                {favoritesLength}
              </div>
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
              {cartLength > 0 && (
                <span className={styles.navbar__notification_badge}>
                  {cartLength}
                </span>
              )}
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};