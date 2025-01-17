/* eslint-disable */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import favourites_icon from '/img/icons/Favourites.svg';
import { useDispatch } from 'react-redux';
import { ButtonText } from '../../types/ButtonText';
import favourites_filled_icon from '/img/icons/FavouritesFilled.svg';
import { Product } from '../../types';
import { actions as favoritesActions } from '../../features/favoritesProducts';
import { increaseQuantity } from '../../features/cartReducer';
import { useAppSelector } from '../../app/hooks';
import { getProductList } from '../../public-copy/api/api';
import styles from '../Card/Card.module.scss';

function isProductInList(products: Product[], product: Product) {
  return products.some((item) => item.id === product.id);
}

export const ActionButtons = ({ category, currentProductId }) => {
  const [product, setProduct] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  const fetchProducts = async (): Promise<Product[]> => {
    const items = await getProductList(category);

    return items.map((item) => ({
      ...item,
      itemId: item.id,
      fullPrice: item.priceRegular,
      year: item.year ?? 2025,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();

        setProduct(data.find((item) => item.id === currentProductId));
      } catch {}
    };

    fetchData();
  }, []);

  const addFavorite = (product: Product) =>
    dispatch(favoritesActions.add(product));

  const removeFavorite = (product: Product) =>
    dispatch(favoritesActions.remove(product));

  const added = useAppSelector((state) => state.cartProducts.cartProducts);

  const addToCart = (product: Product) => dispatch(increaseQuantity(product));

  const addToFavorite = () => {
    if (isProductInList(favorites, product)) {
      removeFavorite(product);
    } else {
      addFavorite(product);
    }
  };

  const onAddToCart = () => {
    if (!isProductInList(added, product)) {
      console.log(added, product);
      addToCart(product);
    }
  };

  return (
    <div>
      <button
        onClick={onAddToCart}
        className={cn(styles.product_card__buy, {
          [styles.product_card__added]: isProductInList(added, product),
        })}
      >
        {isProductInList(added, product)
          ? ButtonText.ADDED
          : ButtonText.ADD_TO_CART}
      </button>
      <button
        onClick={addToFavorite}
        className={styles.product_card__favourite_button}
      >
        <img
          src={
            isProductInList(favorites, product)
              ? favourites_filled_icon
              : favourites_icon
          }
          alt='favourite icon'
        />
      </button>
    </div>
  );
};
