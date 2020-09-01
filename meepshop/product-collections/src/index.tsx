// typescript import
import { languageType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';

import Image from '@meepshop/image';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/index.less';

// graphql typescript
import {
  productCollectionsFragment,
  productCollectionsFragment_product_galleries_images as productCollectionsFragmentProductGalleriesImages,
} from './__generated__/productCollectionsFragment';
import { JustifyContent } from '../../../__generated__/meepshop';

// definition
export default React.memo(
  ({
    productCollectionsType,
    percentWidth,
    product,
  }: productCollectionsFragment) => {
    const { i18n } = useTranslation();

    const images = (product?.galleries?.[1]?.images || []).filter(
      Boolean,
    ) as productCollectionsFragmentProductGalleriesImages[];

    return !images.length ? null : (
      <div className={`${styles.root} ${styles[productCollectionsType]}`}>
        {images.map(({ fileId, scaledSrc }) => (
          <div
            key={fileId}
            className={`${styles.img} ${styles[productCollectionsType]}`}
          >
            <Image
              id={fileId}
              image={{
                __typename: 'Image',
                id: fileId,
                scaledSrc,
              }}
              link={null}
              width={percentWidth.split('WIDTH')[1]}
              justifyContent={'CENTER' as JustifyContent}
              alt={
                product?.title?.[i18n.language as languageType] ||
                product?.title?.zh_TW ||
                null
              }
              __typename="ImageModule"
            />
          </div>
        ))}
      </div>
    );
  },
);
