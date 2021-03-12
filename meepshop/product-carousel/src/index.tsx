// typescript import
import { languageType } from '@meepshop/locales';
import { Carousel as AntdCarousel } from 'antd';

// import
import React, { useRef } from 'react';
import { filter } from 'graphql-anywhere';

import Carousel from '@meepshop/carousel';
import { useTranslation } from '@meepshop/locales';

import useImages from './hooks/useImages';
import useSlickActive from './hooks/useSlickActive';
import styles from './styles/index.less';

// graphql typescript
import { productCarouselFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import { carouselFragment } from '@meepshop/carousel/gqls';

import { useImagesFragment } from './gqls/useImages';

// definition
export default React.memo(
  ({ id, productCarouselType, autoPlay, product }: productCarouselFragment) => {
    const { i18n } = useTranslation();
    const carouselRef = useRef<AntdCarousel>(null);
    const bottomRef = useRef<AntdCarousel>(null);
    const images = useImages(filter(useImagesFragment, product));
    const setSlickActive = useSlickActive(bottomRef);
    const defaultCarouselProps = {
      __typename: 'CarouselModule' as const,
      id,
      images,
      autoPlay,
      alt:
        product?.title?.[i18n.language as languageType] ||
        product?.title?.zh_TW ||
        null,
      width: 100,
      hoverPause: false,
      showIndicator: false,
    };

    return (
      <div className={styles.root}>
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
              carouselRef,
              asNavFor: bottomRef,
            })}
          />
        </div>

        {productCarouselType === 'NONE' || images?.length === 1 ? null : (
          <div className={styles.bottom}>
            <Carousel
              {...filter(carouselFragment, {
                ...defaultCarouselProps,
                showController: false,
                focusOnSelect: true,
                carouselRef: bottomRef,
                asNavFor: carouselRef,
                slidesToShow: (images || []).length > 4 ? 4 : images?.length,
                afterChange: setSlickActive,
              })}
            />
          </div>
        )}
      </div>
    );
  },
);
