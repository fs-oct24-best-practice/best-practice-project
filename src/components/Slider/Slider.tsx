import React, { useRef } from 'react';
import { Product } from '../../types';
import { Card } from '../Card';

import { Navigation, FreeMode } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import prevArrow from '../../assets/icons/arrow-left.svg';
import nextArrow from '../../assets/icons/arrow-right.svg';

import './Slider.scss';

type Props = {
  products: Product[];
  discount?: boolean;
  title: string;
};

export const Slider: React.FC<Props> = ({ products, title }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const handlePrevClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <div className='slider'>
      <div className='slider__container'>
        <div className='slider__header'>
          <h2 className='slider__title'>{title}</h2>
          <div className='slider__buttons'>
            <img
              className='slider__arrow'
              src={prevArrow}
              alt='arrow-left'
              onClick={handlePrevClick}
            />
            <img
              className='slider__arrow'
              src={nextArrow}
              alt='arrow-rigth'
              onClick={handleNextClick}
            />
          </div>
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Navigation, FreeMode]}
          slidesPerView={'auto'}
          spaceBetween={16}
          navigation={false}
          loop={true}
          grabCursor={true}
          freeMode={true}
          className='swiper'
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={product.id}
              virtualIndex={index}
              className='swiper-slide'
            >
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// const swiperRef = useRef<SwiperRef | null>(null);

//   const handlePrevClick = () => {
//     swiperRef.current?.swiper.slidePrev();
//   };

//   const handleNextClick = () => {
//     swiperRef.current?.swiper.slideNext();
//   };

//   return (
//     <div className={styles.sliderWrapper}>
//       <div className={styles.header}>
//         <h2 className={styles.title}>{title}</h2>
//         <div className={styles.buttonsContainer}>
//           <img src={prevIcon} alt="arrow-left" onClick={handlePrevClick} />
//           <img src={nextIcon} alt="arrow-rigth" onClick={handleNextClick} />
//         </div>
//       </div>

//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination, FreeMode]}
//         slidesPerView={'auto'}
//         spaceBetween={16}
//         navigation={false}
//         loop={true}
//         grabCursor={true}
//         freeMode={true}
//       >
//         {products.map(product => (
//               <SwiperSlide className={styles.swiper_slide} key={product.id}>
//                 <Card
//                   product={product}
//                 />
//               </SwiperSlide>
//             ))}
//       </Swiper>
//     </div>
//   );
