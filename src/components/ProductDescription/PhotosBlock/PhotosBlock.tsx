import { FC, useEffect, useState } from 'react';
import { PhotoSelector, PhotoPreview } from '..';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './PhotosBlock.module.scss';

type Props = { currentProductSpec: ProductSpec };

export const PhotosBlock: FC<Props> = (props) => {
  const { currentProductSpec } = props;
  const [selectedImage, setSelectedImage] = useState(
    currentProductSpec.images[0]
  );

  useEffect(() => {
    setSelectedImage(currentProductSpec.images[0]);
  }, [currentProductSpec]);

  return (
    <section className={styles.section}>
      <PhotoSelector
        images={currentProductSpec.images}
        setSelectedImage={setSelectedImage}
      />
      <PhotoPreview selectedImage={selectedImage} />
    </section>
  );
};
