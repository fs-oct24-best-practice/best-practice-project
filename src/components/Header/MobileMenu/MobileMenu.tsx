import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { Pages } from '../../../types';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu: FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;

  const setNavClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.menu__link]: true,
      [styles.menu__link_active]: isActive,
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__pages}>
        {Object.entries(Pages).map((page) => {
          return (
            <li key={page[0]} className={styles.menu__page}>
              <NavLink
                className={setNavClasses}
                to={`/${page[1]}`}
                onClick={toggleMenu}
              >
                {page[0]}
              </NavLink>
            </li>
          );
        })}
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
                src='/img/icons/Favourites.svg'
                alt='Favourites'
                className={styles.menu__chosen__icon}
              />
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
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
