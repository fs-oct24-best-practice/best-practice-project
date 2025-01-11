import { ProductSpec, Categories } from '../types';
import { setDelay } from '../utils';

const API_URL = '/public/api/';

export async function getCategoryList(
  category: Categories
): Promise<ProductSpec[]> {
  return setDelay(1000)
    .then(() => fetch(API_URL + `${category}.json`))
    .then((response) => response.json());
}
