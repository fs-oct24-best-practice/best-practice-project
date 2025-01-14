import { ProductSpec } from '../../src/types/ProductSpec';
import { Product } from '../../src/types/Product';

const API_URL = '/public/api/';

function setWait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

type item = ProductSpec | Product;
type category = 'accessories' | 'phones' | 'products' | 'tablets';

export async function getProductList(category: category): Promise<item[]> {
  return setWait(1000)
    .then(() => fetch(API_URL + `${category}.json`))
    .then((response) => response.json());
}
