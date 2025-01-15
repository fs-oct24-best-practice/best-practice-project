import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Navbar.module.scss';
import { Pages } from '../../../types';
//diana
import { selectCartQuantity } from '../../../reducers/cartReducer';

export const Navbar = () => {
  const cartQuantity = useSelector(selectCartQuantity);
//vitalii
import { useAppSelector } from '../../../app/hooks';

export const Navbar = () => {
  const favoritesLength = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  ).length;
//>>>>>>> develop

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
