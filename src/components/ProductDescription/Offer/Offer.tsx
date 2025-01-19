import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './Offer.module.scss';
import cn from 'classnames';

import buttonstyles from '../../Card/Card.module.scss';
import favourites_icon from '/img/icons/Favourite.svg';
import favourites_icon_white from '/img/icons/FavoriteWhite.svg';
import favourites_icon_filled from '/img/icons/FavouritesFilled.svg';
import { ButtonText } from '../../../types/ButtonText';
import { Product } from '../../../types/Product';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { actions as favoritesActions } from '../../../features/favoritesProducts';
import { increaseQuantity } from '../../../features/cartReducer';
import { useAppSelector } from '../../../hooks/hooks';
import { Theme } from '../../../types/Theme';
import { ProductInCart } from '../../../types/ProductInCart';

import {
  browserSupportedColors,
  replaceSpaceWithDash,
  sortStrings,
  createNewItemId,
} from '..';

function isProductInList<T extends { id: string | number }>(
  products: T[],
  product: T
): boolean {
  return products.some((item) => item.id === product.id);
}

type Props = {
  currentProductSpec: ProductSpec;
  product: Product;
};

export const Offer: FC<Props> = ({ currentProductSpec, product }) => {
  const {
    colorsAvailable,
    namespaceId,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    color,
  } = currentProductSpec;

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

  const location = useLocation();

  const category = location.pathname.split('/')[1];

  const setColorsClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.colors__selector__color]: true,
      [styles.colors__selector__color_active]: isActive,
    });
  };

  const setCapacityClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.capacity__selector__item]: true,
      [styles.capacity__selector__item_active]: isActive,
    });
  };

  const techProperties = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    RAM: ram,
  };

  return (
    <section className={styles.section}>
      <div className={styles.colors}>
        <p className={styles.section__subtitle}>Available colors</p>
        <div className={styles.colors__selector}>
          {sortStrings(colorsAvailable).map((color: string) => {
            const currentColor: string =
              replaceSpaceWithDash(color).toLowerCase();
            return (
              <NavLink
                to={`/${category}/${createNewItemId(
                  namespaceId,
                  capacity,
                  currentColor
                )}`}
                key={currentColor}
                className={setColorsClasses}
                style={{
                  backgroundColor: browserSupportedColors[currentColor],
                }}
              ></NavLink>
            );
          })}
        </div>
      </div>

      <div className={styles.capacity}>
        <p className={styles.section__subtitle}>Select capacity</p>
        <div className={styles.capacity__selector}>
          {sortStrings(capacityAvailable).map((capacity) => {
            return (
              <NavLink
                to={`/${category}/${createNewItemId(
                  namespaceId,
                  capacity,
                  replaceSpaceWithDash(color).toLowerCase()
                )}`}
                className={setCapacityClasses}
                key={capacity}
              >
                {capacity}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className={styles.prices}>
        <p className={styles.prices__discount}>${priceDiscount}</p>
        <p className={styles.prices__regular}>${priceRegular}</p>
      </div>

      <div className={buttonstyles.product_card__actions}>
        <button
          onClick={onAddToCart}
          className={cn(buttonstyles.product_card__buy, {
            [buttonstyles.product_card__added_to_cart]: isProductInList(
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
          className={cn(buttonstyles.product_card__favourite_button, {
            [buttonstyles.product_card__added_to_favourite]: isProductInList(
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

      <div className={styles.properties}>
        <ul className={styles.properties__list}>
          {Object.entries(techProperties).map((property) => {
            return (
              <li key={property[0]} className={styles.property}>
                <p className={styles.property__title}>{property[0]}</p>
                <p className={styles.property__value}>{property[1]}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
