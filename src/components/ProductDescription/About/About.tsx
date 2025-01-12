import { FC, Fragment } from 'react';
import css from './About.module.scss';

import { ProductSpec } from '../../../types/ProductSpec';

type Props = {
  currentProductSpec: ProductSpec;
};

export const About: FC<Props> = (props) => {
  const {
    currentProductSpec: { description },
  } = props;
  return (
    <>
      <h3 className={css.title}>About</h3>
      {description.map((declaration, idx) => {
        return (
          <Fragment key={idx}>
            <h4>{declaration.title}</h4>
            <div>
              {declaration.text.map((paragraph, idx) => {
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
