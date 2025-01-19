import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Navbar.module.scss';
import { Pages } from '../../../types';
import { SearchField } from '../../SearchField/SearchField';
import { useAppSelector } from '../../../hooks/hooks';

import { useDispatch } from 'react-redux';
import { switchTheme } from '../../../features/theme';
import { Theme } from '../../../types/Theme';

export const Navbar = () => {
  const dispatch = useDispatch();

  const theme = useAppSelector((state) => state.theme.theme);

  const favoritesLength = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  ).length;

  const cartLength = useAppSelector((state) =>
    state.cartProducts.cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const swichTheme = () => dispatch(switchTheme());

  const setNavClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.navbar__link]: true,
      [styles.navbar__link_active]: isActive,
    });
  };

  const onThemeSwitch = () => {
    swichTheme();
  };

  return (
    <nav className={`${styles.navbar} ${styles[theme]}`}>
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
          <div
            className={`${styles.navbar__chosen__block}`}
            onClick={onThemeSwitch}
          >
            <img
              src={`/img/icons/${theme === Theme.DARK ? 'SunWhite.svg' : 'Moon.svg'}`}
              alt='Favourites'
              className={styles.navbar__theme_toggle}
            />
          </div>
        </li>

        <li>
          <NavLink to='/favorite' className={setNavClasses}>
            <div className={styles.navbar__chosen__block}>
              <img
                src={`/img/icons/${theme === Theme.DARK ? 'FavoriteWhite.svg' : 'Favourite.svg'}`}
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
                src={`/img/icons/${theme === Theme.DARK ? 'CartWhite.svg' : 'Cart.svg'}`}
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
