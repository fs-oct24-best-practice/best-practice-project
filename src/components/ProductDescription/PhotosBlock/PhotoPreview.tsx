import { FC } from 'react';
import styles from './PhotosBlock.module.scss';

type Props = { selectedImage: string };

export const PhotoPreview: FC<Props> = (props) => {
  const { selectedImage } = props;

  return (
    <img
      className={styles.image}
      src={selectedImage}
      key={selectedImage}
      alt='preview'
    />
  );
};
