import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ProductSpec } from '../../../types/ProductSpec';
import styles from './Offer.module.scss';

type Props = {
  currentProductSpec: ProductSpec;
  handleChangeColor: (color: string) => void;
  handleChangeCapacity: (capacity: string) => void;
};

export const Offer: FC<Props> = (props) => {
  const {
    currentProductSpec: {
      colorsAvailable,
      namespaceId,
      capacityAvailable,
      priceDiscount,
      priceRegular,
      screen,
      resolution,
      processor,
      ram,
    },
    handleChangeColor,
    handleChangeCapacity,
  } = props;

  return (
    <>
      <div>
        <p>Available colors</p>
        <div className={styles.colors}>
          {colorsAvailable.map((color: string) => {
            return (
              <Link
                to='#' // ❗ тимчасово. подумати як підключити логику маршрутизації
                key={color}
                className={styles.colors__selector}
                style={{ backgroundColor: color }}
                onClick={(evt) => {
                  evt.preventDefault();
                  handleChangeColor(color);
                }}
              ></Link>
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
          {capacityAvailable.map((capacity) => {
            return (
              <Link
                to='#' // ❗ тимчасово. подумати як підключити логику маршрутизації
                className={styles.capacity__selector}
                key={capacity}
                onClick={(evt) => {
                  evt.preventDefault();
                  handleChangeCapacity(capacity);
                }}
              >
                {capacity}
              </Link>
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

      <div>
        <button>Add to cart</button>

        <button>Add to favourites</button>
      </div>

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
    </>
  );
};
