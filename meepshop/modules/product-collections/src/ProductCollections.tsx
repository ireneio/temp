// typescript import
import { languageType } from '@meepshop/locales';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import Image from '@meepshop/image';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/index.less';

// graphql typescript
import {
  JustifyContent,
  productCollectionsFragment,
  productCollectionsFragment_product_galleries_images as productCollectionsFragmentProductGalleriesImages,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { imageFragment } from '@meepshop/image/gqls';

// typescript definition
interface PropsType extends productCollectionsFragment {
  className?: string;
}

// definition
export default React.memo(
  ({ className, productCollectionsType, percentWidth, product }: PropsType) => {
    const { i18n } = useTranslation();
    const images = (product?.galleries?.[1]?.images || []).filter(
      Boolean,
    ) as productCollectionsFragmentProductGalleriesImages[];

    return !images.length ? null : (
      <div
        className={`${styles.root} ${
          styles[productCollectionsType]
        } ${className || ''}`}
      >
        {images.map(({ id, scaledSrc, imageExists }) =>
          !imageExists ? null : (
            <div
              key={id}
              className={`${styles.img} ${styles[productCollectionsType]}`}
            >
              <Image
                {...filter(imageFragment, {
                  __typename: 'ImageModule',
                  id,
                  image: {
                    __typename: 'Image',
                    id,
                    scaledSrc,
                  },
                  link: null,
                  width: parseInt(percentWidth.replace(/WIDTH/, ''), 10),
                  justifyContent: 'CENTER' as JustifyContent,
                  alt:
                    product?.title?.[i18n.language as languageType] ||
                    product?.title?.zh_TW ||
                    null,
                })}
              />
            </div>
          ),
        )}
      </div>
    );
  },
);
