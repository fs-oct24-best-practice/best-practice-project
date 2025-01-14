import {ProductType} from '../../types/Product';
import {ProductSpec} from '../../types/ProductSpec';

const API_URL = '/public/api';

function wait(delay: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

function get<T>(url: string): Promise<T> {
	const fullURL = API_URL + url + '.json';

	return wait(300)
		.then(() => fetch(fullURL))
		.then((res) => res.json());
}

export const getProducts = () => get<ProductType[]>('/products');
export const getPhones = () => get<ProductSpec[]>('/phones');
export const getTablets = () => get<ProductSpec[]>('/tablets');
export const getAccessories = () => get<ProductSpec[]>('/accessories');
