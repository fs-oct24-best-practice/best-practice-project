import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Navbar } from './Navbar/Navbar';
import { MobileMenu } from './MobileMenu/MobileMenu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);

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

  return (
    <header className={styles.header}>
      <NavLink to='/' className={styles.header__logo_wrap}>
        <img
          src='/icons/logo.svg'
          alt='Nice Gadgets Logo'
          className={styles.header__logo}
        />
      </NavLink>

      {isDesktop ? (
        <Navbar />
      ) : (
        <button className={styles.burger} onClick={toggleMenu}>
          <img
            src={`/img/icons/${isOpen ? 'Close.svg' : 'Menu.svg'}`}
            alt={isOpen ? 'Close menu' : 'Open menu'}
          />
        </button>
      )}

      {isOpen && !isDesktop && (
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </header>
  );
};
