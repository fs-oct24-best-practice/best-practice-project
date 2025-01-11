import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import clsx from 'clsx';
import {Loader} from '../components/Loader';
import {Product} from '../types/Product';

type CatalogProps = {
	fetchProducts: () => Promise<Product[]>;
	title: string;
};

export const Catalog: React.FC<CatalogProps> = ({fetchProducts, title}) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const sortOption = searchParams.get('sort') || 'model';
	const page = parseInt(searchParams.get('page') || '1', 10);
	const perPage = searchParams.get('perPage') || 'all';

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(false);

			try {
				const data = await fetchProducts();
				setProducts(data);
			} catch {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [fetchProducts]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSearchParams({...Object.fromEntries(searchParams), sort: value});
	};

	const handlePageChange = (newPage: number) => {
		setSearchParams({...Object.fromEntries(searchParams), page: newPage.toString()});
	};

	const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSearchParams({
			...Object.fromEntries(searchParams),
			perPage: value === 'all' ? '' : value,
		});
	};

	const sortedProducts = [...products].sort((a, b) => {
		if (sortOption === 'alphabet') {
			return a.name.localeCompare(b.name);
		} else if (sortOption === 'price') {
			return a.priceRegular - b.priceRegular;
		} else if (sortOption === 'model') {
			const extractModelNumber = (name: string): number => {
				const parts = name.split(' ');
				const modelPart = parts.find((part) => {
					if (part.includes('X')) return true;
					return !isNaN(parseInt(part, 10));
				});

				if (modelPart?.includes('X')) {
					return 10;
				}

				const number = modelPart ? parseInt(modelPart, 10) : 0;
				return number;
			};

			const aModelNumber = extractModelNumber(a.name);
			const bModelNumber = extractModelNumber(b.name);
			return bModelNumber - aModelNumber;
		}
		return 0;
	});

	const itemsPerPage = perPage === 'all' ? products.length : parseInt(perPage, 10);
	const paginatedProducts = sortedProducts.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);
	const totalPages = Math.ceil(products.length / itemsPerPage);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center h-screen text-center'>
				<p className='text-red-600 text-lg mb-4'>
					Something went wrong. Please try again.
				</p>
				<button
					onClick={() => window.location.reload()}
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
				>
					Reload
				</button>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<p className='text-gray-500 text-lg text-center mt-8'>No products available.</p>
		);
	}

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-6'>{title}</h1>

			<div className='flex flex-wrap items-center gap-4 mb-6'>
				<select
					value={sortOption}
					onChange={handleSortChange}
					className='border border-gray-300 rounded px-3 py-2'
				>
					<option value='model'>Newest</option>
					<option value='alphabet'>Alphabetically</option>
					<option value='price'>Cheapest</option>
				</select>

				<select
					value={perPage}
					onChange={handlePerPageChange}
					className='border border-gray-300 rounded px-3 py-2'
				>
					<option value='4'>4</option>
					<option value='8'>8</option>
					<option value='16'>16</option>
					<option value='all'>All</option>
				</select>
			</div>

			<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{paginatedProducts.map((product) => (
					<li
						key={product.id}
						className='border rounded-lg p-4 shadow hover:shadow-lg transition-shadow bg-white hover:bg-gray-50'
					>
						<img
							src={product.image[0]}
							alt={product.name}
							className='w-full h-40 object-contain rounded mb-4'
						/>
						<p className='text-lg font-medium'>{product.name}</p>
						<p className='text-gray-600'>Price: ${product.priceRegular}</p>
					</li>
				))}
			</ul>

			<div className='flex justify-center items-center mt-6 gap-2'>
				{[...Array(totalPages)].map((_, index) => (
					<button
						key={index}
						disabled={page === index + 1}
						onClick={() => handlePageChange(index + 1)}
						className={clsx(
							'px-3 py-1 border rounded',
							page === index + 1
								? 'bg-blue-500 text-white cursor-not-allowed'
								: 'bg-white text-gray-700 hover:bg-gray-100'
						)}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};
