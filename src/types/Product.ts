import { Categories } from './Categories';

export interface Product {
  id: number;
  name: string;
  itemId: string;
  price?: number;
  priceRegular: number;
  priceDiscount?: number;
  fullPrice: number;
  category: Categories;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string[];
  quantity: number;
}
