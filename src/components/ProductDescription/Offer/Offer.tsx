import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './Offer.module.scss';
import cn from 'classnames';
import { Product } from '../../../types/Product';

import {
  browserSupportedColors,
  replaceSpaceWithDash,
  sortStrings,
  createNewItemId,
} from '../../../utils';
import { Actions } from '../../Actions';
import { useAppSelector } from '../../../hooks/hooks';

type Props = {
  currentProductSpec: ProductSpec;
  product: Product;
};

export const Offer: FC<Props> = ({ currentProductSpec, product }) => {
  const { t } = useTranslation();

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

  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const theme = useAppSelector((state) => state.theme.theme);

  const setColorsClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.colors__selector__color]: true,
      [styles.colors__selector__color_isactive]: isActive,
    });
  };

  const setCapacityClasses = ({ isActive }: { isActive: boolean }) => {
    return cn({
      [styles.capacity__selector__item]: true,
      [styles.capacity__selector__item_isactive]: !isActive,
    });
  };

  const techProperties = {
    [t('screen')]: screen,
    [t('resolution')]: resolution,
    [t('processor')]: processor,
    [t('ram')]: ram,
  };

  return (
    <section className={cn(styles.section, styles[theme])}>
      <div className={styles.colors}>
        <p className={styles.section__subtitle}>{t('available_colors')}</p>
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
                aria-label={t('color', { color })}
              ></NavLink>
            );
          })}
        </div>
      </div>

      <div className={styles.capacity}>
        <p className={styles.section__subtitle}>{t('select_capacity')}</p>
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
                aria-label={t('capacity', { capacity })}
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

      <Actions product={product}></Actions>

      <div className={styles.properties}>
        <ul className={styles.properties__list}>
          {Object.entries(techProperties).map(([key, value]) => {
            return (
              <li key={key} className={styles.property}>
                <p className={styles.property__title}>{key}</p>
                <p className={styles.property__value}>{value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
