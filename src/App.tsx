import {Outlet} from 'react-router';
import './App.scss';
import {Footer} from './components/Footer';
import {Header} from './components/Header';

export const App = () => {
	return (
		<div className='App'>
			<Header />

			<main className='main'>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};
