import './Categories.scss';
import phonesImg from '../../assets/categories/phones.png';
import tabletsImg from '../../assets/categories/tablets.png';
import accessoriesImg from '../../assets/categories/accessories.png';
import { Link } from 'react-router-dom';

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

export const Categories = ({ products, title }) => {
  const allProducts = products;

  const productsCount = (productType: string) => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === productType
    );

    return filteredProducts.length;
  };

  const categoriesList: CategoriesList = {
    phones: {
      title: 'phones',
      image: phonesImg,
      type: 'phones',
    },
    tablets: {
      title: 'tablets',
      image: tabletsImg,
      type: 'tablets',
    },
    accessories: {
      title: 'accessories',
      image: accessoriesImg,
      type: 'accessories',
    },
  };

  return (
    <section className='categories'>
      <div className='container'>
        <div className='categories__content'>
          <h2 className='categories__title'>{title}</h2>
          <div className='categories__items'>
            {Object.values(categoriesList).map((category) => (
              <div className='categories__item' key={category.title}>
                <Link to={`${category.type}`} className='categories__item_link'>
                  <img
                    src={category.image}
                    alt='Phones'
                    className='categories__item_link-img'
                  />
                </Link>

                <div className='categories__info'>
                  <h3 className='categories__info--title'>{category.title}</h3>
                  <p className='categories__info--text'>{`${productsCount(category.type)} models`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
