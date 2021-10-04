// typescript import
import IconType from '@ant-design/icons/lib/components/Icon';
import { CarouselProps, CarouselRef } from 'antd/lib/carousel';

// import
import React, { useEffect, useState } from 'react';
import { filter } from 'graphql-anywhere';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

import Image from '@meepshop/image';

import { DEFAULT_IMAGES } from './constants';
import styles from './styles/index.less';

// graphql typescript
import {
  JustifyContent,
  carouselFragment,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { imageFragment } from '@meepshop/image/gqls';

// typescript definition
export interface PropsType
  extends carouselFragment,
    Omit<CarouselProps, 'asNavFor'> {
  carouselRef?: React.Ref<CarouselRef>;
  asNavFor?: React.RefObject<CarouselRef>;
}

// definition
// FIXME: react-slick bug : unknown props `currentSlide`, `slideCount`
// https://github.com/akiran/react-slick/pull/1453
const CustomArrow = ({
  currentSlide, // eslint-disable-line @typescript-eslint/no-unused-vars
  slideCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  Icon,
  ...props
}: {
  currentSlide?: string;
  slideCount?: string;
  Icon: typeof IconType;
}): React.ReactElement => (
  <span {...props}>
    <Icon />
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
    const displayedImages = !images?.length ? DEFAULT_IMAGES : images;

    useEffect(() => {
      if (asNavFor?.current) setSliderRef(asNavFor.current);
    }, [asNavFor]);

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
          nextArrow={<CustomArrow Icon={RightOutlined} />}
          prevArrow={<CustomArrow Icon={LeftOutlined} />}
          lazyLoad="ondemand"
          adaptiveHeight
        >
          {displayedImages.map(({ image, link }) => (
            <Image
              {...filter(imageFragment, {
                __typename: 'ImageModule',
                id: image?.id || 'null-id',
                image,
                link,
                width: 100,
                justifyContent: 'CENTER' as JustifyContent,
                alt,
              })}
              key={image?.id || 'null-id'}
            />
          ))}
        </Carousel>
      </div>
    );
  },
);
