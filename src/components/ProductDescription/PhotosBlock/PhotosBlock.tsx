import { FC, useState } from 'react';
import { PhotoSelector, PhotoPreview } from '..';
import { ProductSpec } from '../../../types/ProductSpec';

type Props = { currentProductSpec: ProductSpec };

export const PhotosBlock: FC<Props> = (props) => {
  const { currentProductSpec } = props;
  // console.log('currentProductSpec PhotosBlock: ', currentProductSpec); // temporary for developing

  // const images = currentProductSpec.images; // temporary for developing
  // console.log('images: ', images); // temporary for developing
  const [selectedImage, setSelectedImage] = useState(
    currentProductSpec.images[0]
  );

  return (
    <>
      <PhotoSelector
        images={currentProductSpec.images}
        setSelectedImage={setSelectedImage}
      />
      <PhotoPreview selectedImage={selectedImage} />
    </>
  );
};
