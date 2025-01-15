import { FC } from 'react';
import { Offer, About, PhotosBlock, TechSpecs } from '.';
import { ProductSpec } from '../../types';

type Props = {
  currentProduct: ProductSpec;
  handleChangeColor: (color: string) => void;
  handleChangeCapacity: (capacity: string) => void;
};

export const ProductDescription: FC<Props> = ({
  currentProduct,
  handleChangeColor,
  handleChangeCapacity,
}) => {
  return (
    <>
      <h2>{currentProduct.name}</h2>
      <PhotosBlock currentProductSpec={currentProduct} />
      <Offer
        currentProductSpec={currentProduct}
        handleChangeColor={handleChangeColor}
        handleChangeCapacity={handleChangeCapacity}
      />
      <About currentProductSpec={currentProduct} />
      <TechSpecs currentProductSpec={currentProduct} />
    </>
  );
};
