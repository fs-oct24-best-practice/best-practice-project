import { ProductSpec, Categories } from '../types';

const API_URL = '/api/';

export async function getSpecList(
  category: Categories
): Promise<ProductSpec[]> {
  try {
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
