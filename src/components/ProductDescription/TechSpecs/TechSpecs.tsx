import { FC } from 'react';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './TechSpecs.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../../hooks/hooks';

type Props = { currentProductSpec: ProductSpec };

export const TechSpecs: FC<Props> = (props) => {
  const {
    currentProductSpec: {
      screen,
      resolution,
      processor,
      ram,
      camera,
      zoom,
      cell,
      capacity,
    },
  } = props;

  const theme = useAppSelector((state) => state.theme.theme);

  const techProperties = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    RAM: ram,
    'Built in memory': capacity,
    Camera: camera,
    Zoom: zoom,
    Cell: cell?.join(', '),
  };

  return (
    <section className={cn(styles.section, styles[theme])}>
      <h3 className={styles.section__title}>Tech specs</h3>
      <ul className={styles.section__list}>
        {Object.entries(techProperties).map((property) => {
          return (
            <li key={property[0]} className={styles.property}>
              <p className={styles.property__title}>{property[0]}</p>
              <p className={styles.property__value}>{property[1]}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
