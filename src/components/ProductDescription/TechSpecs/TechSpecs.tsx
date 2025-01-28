import { FC } from 'react';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './TechSpecs.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../../hooks/hooks';
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

  const theme = useAppSelector((state) => state.theme.theme);

  const techProperties = {
    [t('screen')]: screen,
    [t('Resolution')]: resolution,
    [t('Processor')]: processor,
    [t('ram')]: ram,
    [t('Built-in-memory')]: capacity,
    [t('Camera')]: camera,
    [t('Zoom')]: zoom,
    [t('Cell')]: cell?.join(', '),
  };

  return (
    <section className={cn(styles.section, styles[theme])}>
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
