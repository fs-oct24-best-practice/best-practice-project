import React from 'react';
import {Catalog} from '../../components/catalog';
import {getPhones} from '../../components/api/apiE';

export const PhonesPage: React.FC = () => {
	return <Catalog fetchProducts={getPhones} title='Phones' />;
};
