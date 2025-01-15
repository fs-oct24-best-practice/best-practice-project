import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProductList } from '../../public-copy/api/api';
import { Product } from '../../types/Product';

type CategoryProps = {
  category: 'phones' | 'tablets' | 'accessories';
};

export const CatalogPage: React.FC<CategoryProps> = ({ category }) => {
  const fetchProducts = async (): Promise<Product[]> => {
    const items = await getProductList(category);

    return items.map((item) => ({
      ...item,
      itemId: item.id,
      fullPrice: item.priceRegular,
      year: item.year ?? 2025,
    }));
  };

  return (
    <Catalog
      fetchProducts={fetchProducts}
      title={category.charAt(0).toUpperCase() + category.slice(1)}
    />
  );
};
