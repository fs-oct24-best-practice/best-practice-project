import cn from 'classnames';
import styles from './Actions.module.scss';
import favourites_icon from '/img/icons/Favourite.svg';
import favourites_icon_white from '/img/icons/FavoriteWhite.svg';
import favourites_icon_filled from '/img/icons/FavouritesFilled.svg';
import { ButtonText } from '../../types/ButtonText';
import { Product } from '../../types/Product';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { actions as favoritesActions } from '../../features/favoritesProducts';
import { increaseQuantity } from '../../features/cartReducer';
import { useAppSelector } from '../../hooks/hooks';
import { Theme } from '../../types/Theme';
import { ProductInCart } from '../../types/ProductInCart';

type Props = {
  product: Product;
};

function isProductInList<T extends { id: string | number }>(
  products: T[],
  product: T
): boolean {
  return products.some((item) => item.id === product.id);
}

export const Actions: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  const addFavorite = (product: Product) =>
    dispatch(favoritesActions.add(product));
  const removeFavorite = (product: Product) =>
    dispatch(favoritesActions.remove(product));

  const added = useAppSelector((state) => state.cartProducts.cartProducts);

  const addToCart = (product: ProductInCart) =>
    dispatch(increaseQuantity(product as ProductInCart));

  const addToFavorite = () => {
    if (isProductInList(favorites, product)) {
      removeFavorite(product);
      toast('Removed from favorites!', {
        icon: '💔',
      });
    } else {
      addFavorite(product);
      toast('Added to favorites!', {
        icon: '❤️',
      });
    }
  };

  const onAddToCart = () => {
    if (!isProductInList(added, product as ProductInCart)) {
      addToCart(product as ProductInCart);
      toast('Added to cart!', {
        icon: '🛒',
      });
    } else {
      toast('Already in the cart!', {
        icon: '🔔',
      });
    }
  };

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={`${styles.actions} ${styles[theme]}`}>
      <button
        onClick={onAddToCart}
        className={cn(styles.actions__buy, {
          [styles.actions__added_to_cart]: isProductInList(
            added,
            product as ProductInCart
          ),
        })}
      >
        {isProductInList(added, product as ProductInCart)
          ? ButtonText.ADDED
          : ButtonText.ADD_TO_CART}
      </button>

      <button
        onClick={addToFavorite}
        className={cn(styles.actions__favourite_button, {
          [styles.actions__added_to_favourite]: isProductInList(
            favorites,
            product
          ),
        })}
      >
        <img
          src={
            isProductInList(favorites, product)
              ? favourites_icon_filled
              : theme === Theme.DARK
                ? favourites_icon_white
                : favourites_icon
          }
          alt='favourite icon'
        />
      </button>
    </div>
  );
};
