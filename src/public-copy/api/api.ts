// import { ProductSpec } from '../../types/ProductSpec';
import { Product } from '../../types/Product';

const API_URL = '/api/';

function setWait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

type item = Product;
type category = 'accessories' | 'phones' | 'products' | 'tablets';

export async function getProductList(category: category): Promise<item[]> {
  return setWait(100)
    .then(() => fetch(API_URL + `${category}.json`))
    .then((response) => response.json());
}
