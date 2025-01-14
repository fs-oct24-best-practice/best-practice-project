import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import './Slider.scss';

export const Slider = ({ products, title }) => {
  // Create array with 500 slides

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
            <img src={product.image} alt={product.itemId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
