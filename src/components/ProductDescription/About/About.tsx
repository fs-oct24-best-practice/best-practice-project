import { FC } from 'react';
import styles from './About.module.scss';
import cn from 'classnames';

import { ProductSpec } from '../../../types/ProductSpec';
import { useAppSelector } from '../../../hooks/hooks';

type Props = {
  currentProductSpec: ProductSpec;
};

export const About: FC<Props> = (props) => {
  const {
    currentProductSpec: { description },
  } = props;

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <section className={cn(styles.section, styles[theme])}>
      <h3 className={styles.section__title}>About</h3>
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
