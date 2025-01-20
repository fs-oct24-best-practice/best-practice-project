import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { Pages } from '../../../types';
import { useAppSelector } from '../../../hooks/hooks';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
  const setNavClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.menu__link]: true,
      [styles.menu__link_active]: isActive,
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const favoritesLength = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  ).length;

  const cartLength = useAppSelector((state) =>
    state.cartProducts.cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(styles.menu, styles[theme], { [styles.menu_open]: isOpen })}
    >
      <ul className={styles.menu__pages}>
        {Object.entries(Pages).map(([name, path]) => (
          <li key={name} className={styles.menu__page}>
            <NavLink
              className={setNavClasses}
              to={`/${path}`}
              onClick={toggleMenu}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className={styles.menu__chosen}>
        <li>
          <NavLink
            to='/favorite'
            className={setNavClasses}
            onClick={toggleMenu}
          >
            <div className={styles.menu__chosen__block}>
              <img
                src='/img/icons/Favourite.svg'
                alt='Favourites'
                className={styles.menu__chosen__icon}
              />
              <div
                className={cn([styles.menu__notification_badge], {
                  [styles.menu__hidden]: !favoritesLength,
                })}
              >
                {favoritesLength}
              </div>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to='/cart' className={setNavClasses} onClick={toggleMenu}>
            <div className={styles.menu__chosen__block}>
              <img
                src='/img/icons/Cart.svg'
                alt='Cart'
                className={styles.menu__chosen__icon}
              />
              {cartLength > 0 && (
                <span className={styles.menu__notification_badge}>
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
