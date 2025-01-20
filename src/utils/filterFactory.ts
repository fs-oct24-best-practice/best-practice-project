import { Product } from '../types';

export const filterFactory = (
  ...conditions: Array<(product: Product) => boolean>
): ((product: Product) => boolean) => {
  return (product: Product) =>
    conditions.every((condition) => condition(product));
};
