import { Link, To } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import styles from './BackLink.module.scss';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowLeftLight from '../../assets/icons/arrow-left-light.svg';
import { Theme } from '../../types/Theme';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  to: To;
  children: ReactNode;
};

export const BackLink: FC<Props> = ({ to, children }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <Link to={to} className={styles.link}>
      <img
        src={theme === Theme.DARK ? arrowLeftLight : arrowLeft}
        className={styles.link__arrow}
        alt='back'
      />
      <p className={styles.link__content}>{children}</p>
    </Link>
  );
};
