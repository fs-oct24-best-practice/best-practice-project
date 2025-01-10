import {FC, useLayoutEffect, useState} from 'react';
import {ProductSpec} from '../types/ProductSpec';
import {getCategoryList} from '../api/getProductByItemId';
import {ItemCard} from '../components/ItemCard';
import {Category} from '../types/Ccategories';

const currentProductID = 'apple-iphone-11-128gb-black';

export const ProductDetailsPage: FC = () => {
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [productSpecs, setProductSpecs] = useState<ProductSpec[]>([]);

	useLayoutEffect(() => {
		async function fetchProductSpecs(category: Category) {
			try {
				setIsError(false);
				setIsLoading(true);
				setProductSpecs(await getCategoryList(category));
			} catch (error) {
				console.log('error: ', error); // must removed befor PR
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		}

		fetchProductSpecs('phones'); // зараз захардкодив, потім буде братися з URL або передаватися пропсом
	}, []);

	const currentProductSpec = productSpecs.find((spec) => currentProductID === spec.id);
	console.log('currentProduct ProductDetailsPage: ', currentProductSpec);

	const componentForRender = () => {
		switch (true) {
			case isLoading:
				return <div>loading, please wait</div>;
			case isError:
				return <div>something wrong</div>;
			case !productSpecs.length:
				return <div>no list</div>;
			case !currentProductSpec:
				return <div>no specs</div>;
			default:
				return <ItemCard currentProductSpec={currentProductSpec} />;
		}
	};

	return (
		<>
			<div>* Bread crumbs ... *</div>
			<div>Back</div>
			{componentForRender()}
		</>
	);
};
