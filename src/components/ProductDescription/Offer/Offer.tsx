import { FC } from 'react';

import { ProductSpec } from '../../../types/ProductSpec';
import css from './Offer.module.scss';

type Props = {
  currentProductSpec: ProductSpec;
};

export const Offer: FC<Props> = (props) => {
  const { currentProductSpec } = props;

  return (
    <>
      <div>
        <p>Available colors</p>
        <div>
          {currentProductSpec.colorsAvailable.map((color: string) => {
            return (
              <div
                key={color}
                className={css.div}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
        </div>
        <div>
          <p>ID:</p>
          <p>{currentProductSpec.namespaceId}</p>
        </div>
      </div>

      <div>
        <p>Select capacity</p>
        <div>
          {currentProductSpec.capacityAvailable.map((capacity) => {
            return (
              <div className='flex' key={capacity}>
                {capacity}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p>{currentProductSpec.priceDiscount}</p>
      </div>

      <div>
        <p>{currentProductSpec.priceRegular}</p>
      </div>

      <div>
        <button>Add to cart</button>

        <button>Add to favourites</button>
      </div>

      <table>
        <tbody>
          <tr>
            <td>Screen</td>
            <td>{currentProductSpec.screen}</td>
          </tr>
          <tr>
            <td>Resolution</td>
            <td>{currentProductSpec.resolution}</td>
          </tr>
          <tr>
            <td>Processor</td>
            <td>{currentProductSpec.processor}</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>{currentProductSpec.ram}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
