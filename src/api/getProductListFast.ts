import { Product } from '../types';

const API_URL = '/data/';

export async function getProductListFast(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}products.json`);
    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(String(error));
  }
}
