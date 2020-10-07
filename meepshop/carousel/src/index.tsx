// typescript import
import { CarouselProps } from 'antd/lib/carousel';

// import
import React, { useEffect, useState } from 'react';
import { Carousel, Icon } from 'antd';

import Image from '@meepshop/image';

import { DEFAULT_IMAGES } from './constants';
import styles from './styles/index.less';

// graphql typescript
import {
  carouselFragment,
  carouselFragment_images as carouselFragmentImages,
} from './fragments/__generated__/carouselFragment';
import { JustifyContent } from '../../../__generated__/meepshop';

// definition
export interface PropsType
  extends carouselFragment,
    Omit<CarouselProps, 'asNavFor'> {
  carouselRef?: React.Ref<Carousel>;
  asNavFor?: React.RefObject<Carousel>;
}

// FIXME: react-slick bug : unknown props `currentSlide`, `slideCount`
// https://github.com/akiran/react-slick/pull/1453
const CustomArrow = ({
  currentSlide, // eslint-disable-line @typescript-eslint/no-unused-vars
  slideCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  type,
  ...props
}: {
  currentSlide?: string;
  slideCount?: string;
  type: string;
}): React.ReactElement => (
  <span {...props}>
    <Icon type={type} />
  </span>
);

export default React.memo(
  ({
    images,
    width,
    autoPlay,
    hoverPause,
    showIndicator,
    showController,
    alt,
    carouselRef,
    asNavFor,
    ...props
  }: PropsType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sliderRef, setSliderRef] = useState<any>();

    useEffect(() => {
      if (asNavFor?.current) setSliderRef(asNavFor.current);
    }, [asNavFor]);

    const displayedImages = !images?.length
      ? (DEFAULT_IMAGES as carouselFragmentImages[])
      : images;

    return (
      <div className={styles.root} style={{ width: `${width}%` }}>
        <Carousel
          {...props}
          ref={carouselRef || null}
          asNavFor={sliderRef}
          autoplay={autoPlay}
          pauseOnHover={hoverPause}
          dots={showIndicator}
          arrows={showController}
          nextArrow={<CustomArrow type="right" />}
          prevArrow={<CustomArrow type="left" />}
          adaptiveHeight
        >
          {displayedImages.map(({ image, link }) => (
            <Image
              key={image?.id || 'null-id'}
              id={image?.id || 'null-id'}
              image={image}
              link={link}
              width={100}
              justifyContent={'CENTER' as JustifyContent}
              alt={alt}
              __typename="ImageModule"
            />
          ))}
        </Carousel>
      </div>
    );
  },
);
