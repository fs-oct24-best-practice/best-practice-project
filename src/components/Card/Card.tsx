import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Card.module.scss';
import favourites_icon from '/img/icons/Favourites.svg';
import favourites_filled_icon from '/img/icons/FavouritesFilled.svg';
import { ButtonText } from '../../types/ButtonText';
import { Product } from '../../types/Product';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { actions as favoritesActions } from '../../features/favoritesProducts';
import { increaseQuantity } from '../../features/cartReducer';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  product: Product;
};

function isProductInList(products: Product[], product: Product) {
  return products.some((item) => item.id === product.id);
}

export const Card: React.FC<Props> = ({ product }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;
  const dispatch = useDispatch();
  const favorites = useAppSelector(
    (state) => state.favoritesProducts.favoritesProducts
  );

  const addFavorite = (product: Product) =>
    dispatch(favoritesActions.add(product));
  const removeFavorite = (product: Product) =>
    dispatch(favoritesActions.remove(product));

  const added = useAppSelector((state) => state.cartProducts.cartProducts);

  const addToCart = (product: Product) => dispatch(increaseQuantity(product));

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
    if (!isProductInList(added, product)) {
      addToCart(product);
      toast('Added in cart!', {
        icon: '🛒',
      });
    } else {
      toast('Already in the cart!', {
        icon: '🔔',
      });
    }
  };

  return (
    <div className={styles.product_card}>
      <img
        className={styles.product_card__image}
        src={image}
        alt={`${name} Image`}
      />
      <Link to={`/${category}/${itemId}`} className={styles.product_card__name}>
        {name}
      </Link>
      <div className={styles.product_card__price}>
        {price ? (
          <>
            <span className={styles.product_card__price_discount}>
              ${price}
            </span>
            <span className={styles.product_card__full_price}>
              ${fullPrice}
            </span>
          </>
        ) : (
          <span className={styles.product_card__price}>${fullPrice}</span>
        )}
      </div>
      <div className={styles.product_card__separator}></div>
      <div className={styles.product_card__features}>
        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>Screen:</div>
          <div className={styles.product_card__feature_value}>{screen}</div>
        </div>

        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>Capacity:</div>
          <div className={styles.product_card__feature_value}>{capacity}</div>
        </div>

        <div className={styles.product_card__feature}>
          <div className={styles.product_card__feature_label}>RAM:</div>
          <div className={styles.product_card__feature_value}>{ram}</div>
        </div>
      </div>
      <div className={styles.product_card__actions}>
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
    </div>
  );
};
