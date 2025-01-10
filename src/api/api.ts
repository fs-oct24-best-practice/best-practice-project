import {ProductSpec} from '../types/ProductSpec';

const API_URL = '../../public/api/';

function wait(delay: number) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function getProductSpecs(category: string): Promise<ProductSpec[]> {
	return wait(1000)
		.then(() => fetch(API_URL + `${category}.json`))
		.then((response) => response.json());
}
