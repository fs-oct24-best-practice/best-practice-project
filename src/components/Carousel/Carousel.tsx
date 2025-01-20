import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

import bannerClip1 from '../../assets/banner-videos/banner-clip1.mp4';
import bannerClip2 from '../../assets/banner-videos/banner-clip2.mp4';
import bannerClip3 from '../../assets/banner-videos/banner-clip3.mp4';
import bannerClip4 from '../../assets/banner-videos/banner-clip4.mp4';
import bannerClip5 from '../../assets/banner-videos/banner-clip5.mp4';

import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowLeftLight from '../../assets/icons/arrow-left-light.svg';
import arrowRightLight from '../../assets/icons/arrow-right-light.svg';

const bannerSlides = [
  { src: bannerClip1 },
  { src: bannerClip2 },
  { src: bannerClip3 },
  { src: bannerClip4 },
  { src: bannerClip5 },
];

type Props = {
  themeColor: string;
};

export const Carousel: React.FC<Props> = ({ themeColor }) => {
  const firstSlideIndex = 0;
  const lastSlideIndex = bannerSlides.length - 1;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(firstSlideIndex);
  const [sliderWidth, setSliderWidth] = useState(0);

  const banner = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const transformValue = sliderWidth * currentSlideIndex;

  const handlePrevSlide = () => {
    const prevIndex =
      currentSlideIndex === firstSlideIndex
        ? lastSlideIndex
        : currentSlideIndex - 1;

    setCurrentSlideIndex(prevIndex);
  };

  const handleNextSlide = useCallback(() => {
    const nextIndex =
      currentSlideIndex === lastSlideIndex
        ? firstSlideIndex
        : currentSlideIndex + 1;

    setCurrentSlideIndex(nextIndex);
  }, [currentSlideIndex, lastSlideIndex]);

  const handleDotActive = (index: number) => {
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentSlideIndex];

    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play();

      const handleVideoEnd = () => {
        handleNextSlide();
      };

      currentVideo.addEventListener('ended', handleVideoEnd);

      return () => {
        currentVideo.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [currentSlideIndex, handleNextSlide]);

  return (
    <section className='Carousel'>
      <div className='Carousel__slider'>
        <button
          type='button'
          className='Carousel__slider-button'
          onClick={handlePrevSlide}
        >
          <img
            src={themeColor === 'light' ? arrowLeft : arrowLeftLight}
            alt='Arrow left'
          />
        </button>

        <div className='Carousel__slider-container' ref={banner}>
          <ul
            className='Carousel__slider-list'
            style={{
              transform: `translateX(-${transformValue}px)`,
            }}
          >
            {bannerSlides.map((slide, index) => (
              <li className='Carousel__slider-item' key={index}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className='Carousel__slider-video'
                  src={slide.src}
                  muted
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type='button'
          className='Carousel__slider-button'
          onClick={handleNextSlide}
        >
          <img
            src={themeColor === 'light' ? arrowRight : arrowRightLight}
            alt='Arrow right'
          />
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
