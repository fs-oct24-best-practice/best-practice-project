import styles from './Footer.module.scss';
import logo from './Logo.svg';
import back_to_top_icon from './back-to-top-icon.svg';

export const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	};

	return (
		<>
			<div className={styles.container_for_testing}>
				{' '}
				{/* Для тестування*/}
				block for testing
			</div>

			<footer className={styles.footer}>
				<div className={styles.footer_wrapper}>
					<a className={styles.wrapper_item} href='https://example.com'>
						<img src={logo} alt='logo' />
					</a>
					<div className={`${styles.wrapper_item} ${styles.navbar}`}>
						<a href='https://example.com'>Github</a>
						<a href='https://example.com'>Contacts</a>
						<a href='https://example.com'>rights</a>
					</div>

					<div className={`${styles.wrapper_item} ${styles.third_item}`}>
						<span>Back to top</span>
						<button onClick={scrollToTop} className={styles.back_to_top_button}>
							<img src={back_to_top_icon} alt='back to top icon' />
						</button>
					</div>
				</div>
			</footer>
		</>
	);
};
