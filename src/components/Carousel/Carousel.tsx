import './Carousel.scss';
import bannerVideo from '../../assets/banner-images/nice-gadjets-promo-Clipchamp.mp4';
import bannerAccessories from '../../assets/banner-images/banner-accessories.png';
import bannerPhones from '../../assets/banner-images/banner-phones.png';
import bannerTablets from '../../assets/banner-images/banner-tablets.png';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const bannerSlides = [
  { type: 'video', src: bannerVideo },
  { type: 'image', src: bannerAccessories },
  { type: 'image', src: bannerPhones },
  { type: 'image', src: bannerTablets },
];

export const Carousel = () => {
  const firstSlideIndex = 0;
  const lastSlideIndex = bannerSlides.length - 1;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(firstSlideIndex);
  const [sliderWidth, setSliderWidth] = useState(0);

  const banner = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const transformValue = sliderWidth * currentSlideIndex;

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handlePrevSlide = () => {
    clearExistingTimeout();

    if (currentSlideIndex !== firstSlideIndex) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(lastSlideIndex);
    }
  };

  const handleNextSlide = useCallback(() => {
    clearExistingTimeout();

    if (currentSlideIndex !== lastSlideIndex) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(firstSlideIndex);
    }
  }, [currentSlideIndex, lastSlideIndex]);

  const handleDotActive = (index: number) => {
    clearExistingTimeout();

    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const currentSlide = bannerSlides[currentSlideIndex];
    clearExistingTimeout();

    if (currentSlide.type === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;

      video.play();

      const onVideoEnd = () => {
        handleNextSlide();
      };

      video.addEventListener('ended', onVideoEnd);

      return () => {
        video.removeEventListener('ended', onVideoEnd);
      };
    } else {
      timeoutRef.current = window.setTimeout(() => {
        handleNextSlide();
      }, 5000);
    }

    return () => clearExistingTimeout();
  }, [currentSlideIndex, handleNextSlide]);

  return (
    <section className='Carousel'>
      <div className='Carousel__slider'>
        <button
          type='button'
          className='Carousel__slider-button'
          onClick={() => handlePrevSlide()}
        >
          <img src={arrowLeft} alt='Arrow left' className='icon--left' />
        </button>

        <div className='Carousel__slider-container' ref={banner}>
          <ul
            className='Carousel__slider-list'
            style={{
              transform: `translateX(-${transformValue}px)`,
            }}
          >
            {bannerSlides.map((slide, index) =>
              slide.type === 'video' ? (
                <li className='Carousel__slider-item' key={index}>
                  <div className='Carousel__video-container'>
                    <video
                      ref={videoRef}
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                      }}
                      className='Carousel__slider-video'
                      src={slide.src}
                      muted
                    />
                  </div>
                </li>
              ) : (
                <li className='Carousel__slider-item' key={index}>
                  <img
                    className='Carousel__slider-image'
                    src={slide.src}
                    alt={`Slide ${index + 1}`}
                  />
                </li>
              )
            )}
          </ul>
        </div>

        <button
          type='button'
          className='Carousel__slider-button'
          onClick={() => handleNextSlide()}
        >
          <img src={arrowRight} alt='Arrow left' className='icon--right' />
        </button>
      </div>

      <div className='Carousel__dots'>
        {bannerSlides.map((_, i) => (
          <label className='Carousel__dots-container' key={i}>
            <button
              type='button'
              className={classNames('Carousel__dots-item', {
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
