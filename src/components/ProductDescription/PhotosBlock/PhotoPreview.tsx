import { FC } from 'react';

type Props = { selectedImage: string };

export const PhotoPreview: FC<Props> = (props) => {
  const { selectedImage } = props;
  return (
    <img
      src={selectedImage}
      key={selectedImage}
      width='464px'
      height='464px'
      alt='preview'
    />
  );
};
