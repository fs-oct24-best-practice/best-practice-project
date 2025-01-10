import React from 'react';
import {Catalog} from '../../components/catalog';
import {getTablets} from '../../components/api/apiE';

export const TabletsPage: React.FC = () => {
	return <Catalog fetchProducts={getTablets} title='Tablets' />;
};
