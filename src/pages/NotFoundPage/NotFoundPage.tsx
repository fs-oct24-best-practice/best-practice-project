import React from 'react';
import '../../styles.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className='page-not-found-container'>
      <div className='not-found-page-img'>
        <img src='/img/NotFound.svg' alt='Page not found' />
      </div>
    </div>
  );
};
