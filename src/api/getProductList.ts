import { Product } from '../types';
import { setDelay } from '../utils';

const API_URL = '/data/';

export async function getProductList(): Promise<Product[]> {
  try {
    await setDelay(300);
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
