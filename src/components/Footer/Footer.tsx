import styles from './Footer.module.scss';
import logo from '/img/footer/Logo.svg';
import back_to_top_icon from '/img/footer/back-to-top-icon.svg';

export const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.footer_wrapper}>
				<a className={styles.footer_item} href='https://example.com'>
					<img src={logo} alt='logo' />
				</a>
				<div className={`${styles.footer_item} ${styles.footer_navbar}`}>
					<a href='https://example.com'>Github</a>
					<a href='https://example.com'>Contacts</a>
					<a href='https://example.com'>rights</a>
				</div>

				<div className={`${styles.footer_item} ${styles.back_to_top}`}>
					<span>Back to top</span>
					<button onClick={scrollToTop} className={styles.back_to_top_button}>
						<img src={back_to_top_icon} alt='back to top icon' />
					</button>
				</div>
			</div>
		</footer>
	);
};
