import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import './Categories.scss';

import phonesImg from '../../assets/categories/phones.png';
import tabletsImg from '../../assets/categories/tablets.png';
import accessoriesImg from '../../assets/categories/accessories.png';
import { CategorySkeleton } from '../skeletons';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type CategoriesCard = {
  title: string;
  image: string;
  type: string;
};

type CategoriesList = {
  phones: CategoriesCard;
  tablets: CategoriesCard;
  accessories: CategoriesCard;
};

type Props = {
  products: Product[];
  title: string;
  isLoading: boolean;
  themeColor: string;
};

export const Categories: React.FC<Props> = ({
  products,
  title,
  isLoading,
  themeColor,
}) => {
  const { t } = useTranslation();

  const allProducts = products;

  const productsCount = (productType: string) => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === productType
    );

    return filteredProducts.length;
  };

  const categoriesList: CategoriesList = {
    phones: {
      title: t('phones'),
      image: phonesImg,
      type: 'phones',
    },
    tablets: {
      title: t('tablets2'),
      image: tabletsImg,
      type: 'tablets',
    },
    accessories: {
      title: t('accessories2'),
      image: accessoriesImg,
      type: 'accessories',
    },
  };

  return (
    <section className='categories'>
      <div className='container'>
        <div className='categories__content'>
          <h2
            className={classNames('slider__title', {
              title_dark: themeColor !== 'light',
            })}
          >
            {title}
          </h2>
          <div className='categories__items'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div className='categories__item' key={index}>
                    <CategorySkeleton />
                  </div>
                ))
              : Object.values(categoriesList).map((category) => (
                  <div className='categories__item' key={category.title}>
                    <Link
                      to={`/${category.type}`}
                      className='categories__item_link'
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className='categories__item_link-img'
                      />
                    </Link>
                    <div className='categories__info'>
                      <h3
                        className={classNames('categories__info--title', {
                          title_dark: themeColor !== 'light',
                        })}
                      >
                        {category.title}
                      </h3>
                      <p className='categories__info--text'>
                        {`${productsCount(category.type)} ${t('models')}`}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};
