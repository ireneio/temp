// import
import React from 'react';

import Image from '@meepshop/image';
import { useGetLanguage } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

import styles from './styles/index.less';

// graphql typescript
import {
  JustifyContent,
  productCollectionsProductCollectionsModuleFragment,
  productCollectionsProductCollectionsModuleFragment_product_galleries_images as productCollectionsProductCollectionsModuleFragmentProductGalleriesImages,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { imageFragment } from '@meepshop/image/gqls';

// typescript definition
interface PropsType extends productCollectionsProductCollectionsModuleFragment {
  className?: string;
}

// definition
export default React.memo(
  ({ className, productCollectionsType, percentWidth, product }: PropsType) => {
    const getLanguage = useGetLanguage();
    const images = (product?.galleries?.[1]?.images || []).filter(
      Boolean,
    ) as productCollectionsProductCollectionsModuleFragmentProductGalleriesImages[];

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
                  alt: getLanguage(product?.title) || null,
                })}
              />
            </div>
          ),
        )}
      </div>
    );
  },
);
