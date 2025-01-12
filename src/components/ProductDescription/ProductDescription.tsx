import { FC } from 'react';
import { Offer, About, PhotosBlock, TechSpecs } from '.';
import { ProductSpec } from '../../types';

type Props = { currentProductSpec: ProductSpec };

export const ProductDescription: FC<Props> = (props) => {
  const { currentProductSpec } = props;

  return (
    <>
      <h1>{currentProductSpec.name}</h1>
      <PhotosBlock currentProductSpec={currentProductSpec} />
      <Offer currentProductSpec={currentProductSpec} />
      <About currentProductSpec={currentProductSpec} />
      <TechSpecs currentProductSpec={currentProductSpec} />
    </>
  );
};
