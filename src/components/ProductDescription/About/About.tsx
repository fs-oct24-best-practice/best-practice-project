import { FC } from 'react';
import styles from './About.module.scss';
import { useTranslation } from 'react-i18next';
import { ProductSpec } from '../../../types/ProductSpec';

type Props = {
  currentProductSpec: ProductSpec;
};

export const About: FC<Props> = (props) => {
  const { t } = useTranslation();

  const {
    currentProductSpec: { description },
  } = props;

  return (
    <section className={styles.section}>
      <h3 className={styles.section__title}>{t('about')}</h3>
      {description.map((declaration, idx) => {
        return (
          <div key={idx} className={styles.declaration}>
            <h4 className={styles.declaration__title}>{declaration.title}</h4>
            {declaration.text.map((paragraph, idx) => {
              return (
                <p key={idx} className={styles.declaration__text}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};
