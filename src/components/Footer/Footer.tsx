import { useAppSelector } from '../../hooks/hooks';
import { Theme } from '../../types/Theme';
import styles from './Footer.module.scss';
import logo from '/icons/logo.svg';
import logo_white from '/icons/logo-white.svg';
import back_to_top_icon from '/img/icons/Top.svg';
import white_back_to_top_icon from '/img/icons/TopWhite.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.footer__wrapper}>
        <a className={styles.footer__item} href='#'>
          <img src={theme === Theme.DARK ? logo_white : logo} alt='logo' />
        </a>
        <div className={`${styles.footer__item} ${styles.footer__navbar}`}>
          <a
            className={styles.footer__links}
            href='https://github.com/fs-oct24-best-practice/best-practice-project'
          >
            {t('github')}
          </a>
          <Link className={styles.footer__links} to='/contacts'>
            {t('contacts')}
          </Link>
          <Link className={styles.footer__links} to='/rules'>
            {t('rules')}
          </Link>
        </div>

        <div className={`${styles.footer__item} ${styles.footer__back_to_top}`}>
          <span>{t('back_to_top')}</span>
          <button
            onClick={scrollToTop}
            className={styles.footer__back_to_top_button}
          >
            <img
              src={
                theme === Theme.DARK ? white_back_to_top_icon : back_to_top_icon
              }
              alt={t('back_to_top_icon')}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
