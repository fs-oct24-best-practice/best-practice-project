import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import './Slider.scss';
import React from 'react';
import { Product } from '../../types';
import { Card } from '../Card';

type Props = {
  products: Product[];
  discount?: boolean;
  title: string;
  slash?: boolean | undefined;
};

export const Slider: React.FC<Props> = ({ products, title }) => {
  return (
    <>
      <h2 className='slider__title'>{title}</h2>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        virtual
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id} virtualIndex={index}>
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
