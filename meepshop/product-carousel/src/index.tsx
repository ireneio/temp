// typescript import
import { languageType } from '@meepshop/utils/lib/i18n';
import { Carousel as AntdCarousel } from 'antd';

// import
import React, { useRef } from 'react';

import Carousel from '@meepshop/carousel';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import useImages from './hooks/useImages';
import useSlickActive from './hooks/useSlickActive';
import styles from './styles/index.less';

// graphql typescript
import { productCarouselFragment } from './__generated__/productCarouselFragment';

// definition
export default React.memo(
  ({ id, productCarouselType, autoPlay, product }: productCarouselFragment) => {
    const { i18n } = useTranslation();
    const carouselRef = useRef<AntdCarousel>(null);
    const bottomRef = useRef<AntdCarousel>(null);
    const images = useImages(product);
    const setSlickActive = useSlickActive(bottomRef);

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
            id={id}
            images={images}
            width={100}
            autoPlay={autoPlay}
            hoverPause={false}
            showIndicator={false}
            showController
            alt={
              product?.title?.[i18n.language as languageType] ||
              product?.title?.zh_TW ||
              null
            }
            carouselRef={carouselRef}
            asNavFor={bottomRef}
            __typename="CarouselModule"
          />
        </div>

        {productCarouselType === 'NONE' || images?.length === 1 ? null : (
          <div className={styles.bottom}>
            <Carousel
              id={id}
              images={images}
              width={100}
              autoPlay={autoPlay}
              hoverPause={false}
              showIndicator={false}
              showController={false}
              alt={
                product?.title?.[i18n.language as languageType] ||
                product?.title?.zh_TW ||
                null
              }
              carouselRef={bottomRef}
              asNavFor={carouselRef}
              slidesToShow={(images || []).length > 4 ? 4 : images?.length}
              focusOnSelect
              afterChange={setSlickActive}
              __typename="CarouselModule"
            />
          </div>
        )}
      </div>
    );
  },
);
