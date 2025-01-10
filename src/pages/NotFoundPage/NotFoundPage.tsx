import React from 'react';
import NotFound from '@best-practice/images/pages/page-not-found.png';
import '../../styles.scss';

export const NotFoundPage: React.FC = () => {
	return (
		<div className='page-not-found-container'>
			<h1 className='page-not-found-title'>Page not found</h1>
			<div className='not-found-page-img'>
				<img src={NotFound} className='not-found-page-img' alt='Page not found' />
			</div>
		</div>
	);
};
