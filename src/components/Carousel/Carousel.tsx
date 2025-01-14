import './Carousel.scss';

import bannerAccessories from '../../assets/banner-images/banner-accessories.png';
import bannerPhones from '../../assets/banner-images/banner-phones.png';
import bannerTablets from '../../assets/banner-images/banner-tablets.png';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const bannerImages = [bannerAccessories, bannerPhones, bannerTablets];

export const Carousel = () => {
  const firstSlideIndex = 0;
  const lastSlideIndex = bannerImages.length - 1;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(firstSlideIndex);
  const [sliderWidth, setSliderWidth] = useState(0);

  const banner = useRef<HTMLDivElement>(null);

  const transformValue = sliderWidth * currentSlideIndex;

  const handlePrevSlide = () => {
    if (currentSlideIndex !== firstSlideIndex) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(lastSlideIndex);
    }
  };

  const handleNextSlide = useCallback(() => {
    if (currentSlideIndex !== lastSlideIndex) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(firstSlideIndex);
    }
  }, [currentSlideIndex, lastSlideIndex]);

  const handleDotActive = (index: number) => {
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const timerID = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timerID);
  }, [currentSlideIndex, handleNextSlide]);

  return (
    <section className='carousel'>
      <div className='carousel__slider'>
        <button
          type='button'
          className='carousel__slider-button'
          onClick={() => handlePrevSlide()}
        >
          <img src={arrowLeft} alt='Arrow left' className='icon--left' />
        </button>

        <div className='carousel__slider-container' ref={banner}>
          <ul
            className='carousel__slider-list'
            style={{
              transform: `translateX(-${transformValue}px)`,
            }}
          >
            {bannerImages.map((img) => (
              <li className='carousel__slider-item' key={img}>
                <img
                  className='carousel__slider-image'
                  src={img}
                  alt='Banner image'
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type='button'
          className='carousel__slider-button'
          onClick={() => handleNextSlide()}
        >
          <img src={arrowRight} alt='Arrow left' className='icon--right' />
        </button>
      </div>

      <div className='carousel__dots'>
        {bannerImages.map((img, i) => (
          <label className='carousel__dots-container' key={img}>
            <button
              type='button'
              className={classNames('carousel__dots-item', {
                'banner-active': currentSlideIndex === i,
              })}
              onClick={() => handleDotActive(i)}
            ></button>
          </label>
        ))}
      </div>
    </section>
  );
};
