import phonesData from './phones.json';
import {ProductSpec} from '../../src/types/ProductSpec';

function wait(delay: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

export const getPhones = async (): Promise<ProductSpec[]> => {
	await wait(300);
	return phonesData;
};
