import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './Offer.module.scss';
import cn from 'classnames';

import {
  browserSupportedColors,
  replaceSpaceWithDash,
  sortStrings,
  createNewItemId,
} from '..';
// import { ActionButtons } from '../../ActionButtons/ActionButtons';

type Props = {
  currentProductSpec: ProductSpec;
};

export const Offer: FC<Props> = (props) => {
  const {
    currentProductSpec: {
      // id,
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
    },
  } = props;

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

      {/* <ActionButtons category={category} currentProductId={id} /> */}

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
