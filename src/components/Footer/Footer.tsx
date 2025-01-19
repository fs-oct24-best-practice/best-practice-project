import { useAppSelector } from '../../hooks/hooks';
import { Theme } from '../../types/Theme';
import styles from './Footer.module.scss';
import logo from '/icons/logo.svg';
import logo_white from '/icons/logo-white.svg';
import back_to_top_icon from '/img/icons/Top.svg';
import white_back_to_top_icon from '/img/icons/TopWhite.svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.footer__wrapper}>
        <a className={styles.footer__item} href='https://example.com'>
          <img src={theme === Theme.DARK ? logo_white : logo} alt='logo' />
        </a>
        <div className={`${styles.footer__item} ${styles.footer__navbar}`}>
          <a className={styles.footer__links} href='https://example.com'>
            Github
          </a>
          <a className={styles.footer__links} href='https://example.com'>
            Contacts
          </a>
          <a className={styles.footer__links} href='https://example.com'>
            rights
          </a>
        </div>

        <div className={`${styles.footer__item} ${styles.footer__back_to_top}`}>
          <span>Back to top</span>
          <button
            onClick={scrollToTop}
            className={styles.footer__back_to_top_button}
          >
            <img
              src={
                theme === Theme.DARK ? white_back_to_top_icon : back_to_top_icon
              }
              alt='back to top icon'
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
