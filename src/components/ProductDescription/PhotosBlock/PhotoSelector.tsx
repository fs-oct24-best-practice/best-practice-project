import { FC, Dispatch, SetStateAction } from 'react';
import styles from './PhotosBlock.module.scss';

type Props = {
  images: string[];
  setSelectedImage: Dispatch<SetStateAction<string>>;
};

export const PhotoSelector: FC<Props> = (props) => {
  const { images, setSelectedImage } = props;
  return (
    <div className={styles.preview}>
      {images.map((image) => {
        return (
          <img
            className={styles.preview__select}
            src={image}
            key={image}
            alt='preview'
            onClick={() => setSelectedImage(image)}
          />
        );
      })}
    </div>
  );
};
