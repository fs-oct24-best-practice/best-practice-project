import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Navbar } from './Navbar/Navbar';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { useAppSelector } from '../../hooks/hooks';
import { Theme } from '../../types/Theme';
import { SearchField } from '../SearchField/SearchField';
import { switchTheme } from '../../features/theme';
import { useDispatch } from 'react-redux';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);

  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onThemeSwitch = () => {
    swichTheme();
  };

  const swichTheme = () => dispatch(switchTheme());

  const menu_icon = theme === Theme.DARK ? 'MenuWhite.svg' : 'Menu.svg';
  const clode_icon = theme === Theme.DARK ? 'CloseWhite.svg' : 'Close.svg';

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <NavLink to='/' className={styles.header__logo_wrap}>
        <img
          src={
            theme === Theme.DARK ? '/icons/logo-white.svg' : '/icons/logo.svg'
          }
          alt='Nice Gadgets Logo'
          className={styles.header__logo}
        />
      </NavLink>

      {isDesktop ? (
        <Navbar />
      ) : (
        <>
          <div className={styles.search}>
            <SearchField />
          </div>
          <div
            className={`${styles.header__chosen__block}`}
            onClick={onThemeSwitch}
          >
            <img
              src={`/img/icons/${theme === Theme.DARK ? 'SunWhite.svg' : 'Moon.svg'}`}
              alt='Switch Theme'
              className={
                theme === Theme.DARK
                  ? styles.header__theme_toggle_icon_dark
                  : styles.header__theme_toggle_icon_light
              }
            />
          </div>
          <button className={styles.burger} onClick={toggleMenu}>
            <img
              src={`/img/icons/${isOpen ? clode_icon : menu_icon}`}
              alt={isOpen ? 'Close menu' : 'Open menu'}
            />
          </button>
        </>
      )}

      {isOpen && !isDesktop && (
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </header>
  );
};
