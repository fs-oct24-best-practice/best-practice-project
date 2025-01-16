// import { ProductSpec } from '../../types/ProductSpec';
import { Product } from '../../types/Product';

const API_URL = '/api/';

function setWait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function processScreenInfo(screen: string): string {
  const parts = screen.split('(');
  return parts[0];
}

type item = Product;
type category = 'accessories' | 'phones' | 'products' | 'tablets';

export async function getProductList(category: category): Promise<item[]> {
  return setWait(100)
    .then(() => fetch(API_URL + `${category}.json`))
    .then((response) => response.json())
    .then((products) => {
      return products.map((product: Product) => {
        if (product.screen) {
          product.screen = processScreenInfo(product.screen);
        }
        return product;
      });
    });
}
