import { FC } from 'react';
import { ProductSpec } from '../../../types/ProductSpec';

type Props = { currentProductSpec: ProductSpec };

export const TechSpecs: FC<Props> = (props) => {
  const {
    currentProductSpec: {
      screen,
      resolution,
      processor,
      ram,
      camera,
      zoom,
      cell,
      capacity,
    },
  } = props;
  return (
    <>
      <h3>Tech specs</h3>

      <div>
        <div>
          <p>Screen</p>
          <p className='text-smtext-red-600 text-lg'>{screen}</p>
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

        <div>
          <p>Built in memory</p>
          <p>{capacity}</p>
        </div>

        <div>
          <p>Camera</p>
          <p>{camera}</p>
        </div>

        <div>
          <p>Zoom</p>
          <p>{zoom}</p>
        </div>

        <div>
          <p>Cell</p>
          <p>{cell?.join(', ')}</p>
        </div>
      </div>
    </>
  );
};
