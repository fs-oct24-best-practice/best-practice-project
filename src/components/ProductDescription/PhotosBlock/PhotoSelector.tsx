import { FC, Dispatch, SetStateAction } from 'react';

type Props = {
  images: string[];
  setSelectedImage: Dispatch<SetStateAction<string>>;
};

export const PhotoSelector: FC<Props> = (props) => {
  const { images, setSelectedImage } = props;
  return (
    <>
      {images.map((image) => {
        return (
          <img
            src={image}
            key={image}
            width='80px'
            height='80px'
            alt='preview'
            onClick={() => setSelectedImage(image)}
          />
        );
      })}
    </>
  );
};
