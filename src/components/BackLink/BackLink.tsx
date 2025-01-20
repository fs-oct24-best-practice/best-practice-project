import { Link, To } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import styles from './BackLink.module.scss';
import arrowLeft from '../../assets/icons/arrow-left.svg';

type Props = {
  to: To;
  children: ReactNode;
};

export const BackLink: FC<Props> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      <img src={arrowLeft} className={styles.link__arrow} alt='back' />
      <p className={styles.link__content}>{children}</p>
    </Link>
  );
};
