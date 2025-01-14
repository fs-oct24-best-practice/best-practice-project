import { ProductSpec, Categories } from '../types';
import { setDelay } from '../utils';

const API_URL = '/api/';

export async function getSpecsList(
  category: Categories
): Promise<ProductSpec[]> {
  try {
    await setDelay(1000);
    const response = await fetch(`${API_URL}${category}.json`);
    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    const data: ProductSpec[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(String(error));
  }
}
