import { FC } from 'react';
import { Offer, About, PhotosBlock, TechSpecs } from '.';
import { ProductSpec } from '../../types';
import styles from './ProductDescription.module.scss';

type Props = {
  currentProductSpec: ProductSpec;
};

export const ProductDescription: FC<Props> = (props) => {
  const { currentProductSpec } = props;
  return (
    <article className={styles.description}>
      <h2 className={styles.description__title}>{currentProductSpec.name}</h2>
      <div className={styles.top_wrap}>
        <PhotosBlock currentProductSpec={currentProductSpec} />
        <Offer currentProductSpec={currentProductSpec} />
      </div>
      <div className={styles.bottom_wrap}>
        <About currentProductSpec={currentProductSpec} />
        <TechSpecs currentProductSpec={currentProductSpec} />
      </div>
    </article>
  );
};
