import { Categories } from './Categories';

export interface ProductInCart {
  id: number;
  category: Categories;
  itemId: string;
  name: string;
  fullPrice: number;
  price?: number;
  image: string;
  quantity: number;
}
