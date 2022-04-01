// typescript import
import { CarouselRef } from 'antd/lib/carousel';

// import
import React, { useRef } from 'react';

import Carousel from '@meepshop/carousel';
import { useGetLanguage } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

import useImages from './hooks/useImages';
import useSlickActive from './hooks/useSlickActive';
import styles from './styles/index.less';

// graphql typescript
import { productCarouselProductCarouselModuleFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import { carouselFragment } from '@meepshop/carousel/gqls';

import { useImagesFragment } from './gqls/useImages';

// typescript definition
interface PropsType extends productCarouselProductCarouselModuleFragment {
  className?: string;
}

// definition
export default React.memo(
  ({ id, className, productCarouselType, autoPlay, product }: PropsType) => {
    const getLanguage = useGetLanguage();
    const carouselRef = useRef<CarouselRef>(null);
    const bottomRef = useRef<CarouselRef>(null);
    const images = useImages(filter(useImagesFragment, product));
    const setSlickActive = useSlickActive(bottomRef);
    const defaultCarouselProps = {
      __typename: 'CarouselModule' as const,
      id,
      images,
      autoPlay,
      alt: getLanguage(product?.title) || null,
      width: 100,
      hoverPause: false,
      showIndicator: false,
    };

    return (
      <div className={`${styles.root} ${className || ''}`}>
        <div
          className={`${
            images?.[0]?.image?.id !== 'product-carousel-placeholder-id'
              ? styles.carousel
              : ''
          }`}
        >
          <Carousel
            {...filter(carouselFragment, {
              ...defaultCarouselProps,
              showController: true,
            })}
            carouselRef={carouselRef}
            asNavFor={bottomRef}
          />
        </div>

        {productCarouselType === 'NONE' || images?.length === 1 ? null : (
          <div className={styles.bottom}>
            <Carousel
              {...filter(carouselFragment, {
                ...defaultCarouselProps,
                showController: false,
              })}
              carouselRef={bottomRef}
              asNavFor={carouselRef}
              slidesToShow={(images || []).length > 4 ? 4 : images?.length}
              afterChange={setSlickActive}
              focusOnSelect
            />
          </div>
        )}
      </div>
    );
  },
);
