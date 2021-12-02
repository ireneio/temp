// import
import React, { useContext } from 'react';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Thumbnail from '@meepshop/thumbnail';

import styles from './styles/product.less';

// graphql typescript
import { productFragment as productFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  product: productFragmentType;
  status?: string;
  onClick: () => void;
}

// definition
export default React.memo(({ product, status, onClick }: PropsType) => {
  const { t } = useTranslation('cart');
  const getLanguage = useGetLanguage();
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const variant = product.variants?.[0];
  const title = getLanguage(product.title);

  return (
    <>
      <div className={styles.root}>
        <div>
          <Thumbnail
            image={product.coverImage}
            className={styles.image}
            source="w240"
            onClick={onClick}
          />

          {!title ? null : (
            <div className={styles.title} onClick={onClick}>
              {title}
            </div>
          )}
        </div>

        <div>
          {!variant?.listPrice ? null : (
            <div className={styles.price}>{c(variant.listPrice)}</div>
          )}

          {!variant?.suggestedPrice ? null : (
            <div className={styles.price}>{c(variant.suggestedPrice)}</div>
          )}

          {!variant?.totalPrice ? null : (
            <div className={styles.totalPrice}>{c(variant.totalPrice)}</div>
          )}

          {status === 'disabled' ? null : (
            <div
              className={`${styles.button} ${status ? styles.status : ''}`}
              onClick={!status ? onClick : undefined}
            >
              {status ? t(status) : t('upselling.add-to-cart')}
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${colors[0]};
            }

            .${styles.image} {
              border-color: ${transformColor(colors[3]).alpha(0.1)};
            }

            .${styles.title},
            .${styles.totalPrice} {
              color: ${colors[3]};
            }

            .${styles.price} {
              color: ${transformColor(colors[3]).alpha(0.65)};
            }

            .${styles.button} {
              color: ${colors[0]};
              background-color: ${colors[3]};
            }
          `,
        }}
      />
    </>
  );
});
