import styles from './Footer.module.scss';
import logo from '/img/icons/Logo.svg';
import back_to_top_icon from '/img/icons/Top.svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <a className={styles.footer__item} href='https://example.com'>
          <img src={logo} alt='logo' />
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
            <img src={back_to_top_icon} alt='back to top icon' />
          </button>
        </div>
      </div>
    </footer>
  );
};
