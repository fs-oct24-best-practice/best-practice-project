import {Product} from '../../types/Product';
// import { ProductSpec } from "../../types/ProductSpec";

const API_URL = '/api/';

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

export const getProducts = () => get<Product[]>('/products');
export const getPhones = () => get<Product[]>('/phones');
export const getTablets = () => get<Product[]>('/tablets');
export const getAccessories = () => get<Product[]>('accessories');
