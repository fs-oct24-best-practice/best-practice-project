import React from 'react';
import { Product } from '../../types';
import { Card } from '../Card';

import { Virtual, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import './Slider.scss';

type Props = {
  products: Product[];
  discount?: boolean;
  title: string;
};

export const Slider: React.FC<Props> = ({ products, title }) => {
  return (
    <div className='slider'>
      <div className='slider__container'>
        <h2 className='slider__title'>{title}</h2>
        <Swiper
          modules={[Virtual, Navigation]}
          grabCursor={true}
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            '@0.50': {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            '@0.75': {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            '@1.00': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className='mySwiper'
          navigation={true}
          virtual
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id} virtualIndex={index}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
