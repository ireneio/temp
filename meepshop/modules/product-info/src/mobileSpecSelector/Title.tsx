// import
import React, { useContext } from 'react';

import { Currency as CurrencyContext } from '@meepshop/context';
import Thumbnail from '@meepshop/thumbnail';

import styles from './styles/title.less';

// graphql typescript
import {
  titleProductFragment,
  titleVariantFragment,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  product: titleProductFragment;
  variant: titleVariantFragment | null;
}

// definition
export default React.memo(({ product, variant }: PropsType) => {
  const { c } = useContext(CurrencyContext);

  return (
    <div className={styles.root}>
      <Thumbnail
        size={100}
        mobileSize={100}
        image={product.coverImage}
        className={styles.thumbnail}
      />

      <div className={styles.description}>
        <div className={styles.title}>{product.title?.zh_TW || ''}</div>
        <div className={styles.other}>
          {!variant?.listPrice ? '' : c(variant.listPrice)}
        </div>
        <div className={styles.other}>
          {!variant?.suggestedPrice ? '' : c(variant.suggestedPrice)}
        </div>
        <div className={styles.price}>
          {!variant?.totalPrice ? '' : c(variant.totalPrice)}
        </div>
      </div>
    </div>
  );
});
