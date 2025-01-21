import { FC } from 'react';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './TechSpecs.module.scss';
import { useTranslation } from 'react-i18next';

type Props = { currentProductSpec: ProductSpec };

export const TechSpecs: FC<Props> = (props) => {
  const { t } = useTranslation();
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
    <section className={styles.section}>
      <h3 className={styles.section__title}>{t('tech_specs')}</h3>
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
