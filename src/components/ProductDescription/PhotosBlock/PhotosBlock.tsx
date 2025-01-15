import { FC, useEffect, useState } from 'react';
import { PhotoSelector, PhotoPreview } from '..';
import { ProductSpec } from '../../../types/ProductSpec';

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
    <>
      <PhotoSelector
        images={currentProductSpec.images}
        setSelectedImage={setSelectedImage}
      />
      <PhotoPreview selectedImage={selectedImage} />
    </>
  );
};
