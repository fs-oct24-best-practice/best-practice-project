import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductSpec } from '../../../types/ProductSpec';
import styles from './Offer.module.scss';

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

  return (
    <div>
      <div>
        <p>Available colors</p>
        <div className={styles.colors}>
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
                className={styles.colors__selector}
                style={{
                  backgroundColor: browserSupportedColors[currentColor],
                }}
              ></NavLink>
            );
          })}
        </div>
        <div>
          <p>ID:</p>
          <p>{namespaceId}</p>
        </div>
      </div>

      <div>
        <p>Select capacity</p>
        <div className={styles.capacity}>
          {sortStrings(capacityAvailable).map((capacity) => {
            return (
              <NavLink
                to={`/${category}/${createNewItemId(
                  namespaceId,
                  capacity,
                  replaceSpaceWithDash(color).toLowerCase()
                )}`}
                className={styles.capacity__selector}
                key={capacity}
              >
                {capacity}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div>
        <p>{priceDiscount}</p>
      </div>

      <div>
        <p>{priceRegular}</p>
      </div>

      {/* <ActionButtons category={category} currentProductId={id} /> */}

      <div>
        <div>
          <p>Screen</p>
          <p>{screen}</p>
        </div>
        <div>
          <p>Resolution</p>
          <p>{resolution}</p>
        </div>
        <div>
          <p>Processor</p>
          <p>{processor}</p>
        </div>
        <div>
          <p>RAM</p>
          <p>{ram}</p>
        </div>
      </div>
    </div>
  );
};
