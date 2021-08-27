// import
import React, { useContext } from 'react';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { cart_react as Cart } from '@meepshop/images';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/empty.less';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { t } = useTranslation('cart');

  return (
    <>
      <div className={styles.root}>
        <div>{t('cart')}</div>
        <Cart className={styles.cart} />
        <p>{t('empty-cart')}</p>

        <Link href={window.storePreviousPageUrl || '/'}>
          <div className={styles.button}>{t('go-back-to-store')}</div>
        </Link>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              color: ${colors[3]};
            }

            .${styles.root} p {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.cart} {
              fill: ${transformColor(colors[3]).alpha(0.3)};
            }

            .${styles.button} {
              color: ${colors[2]};
              background-color: ${colors[4]};
              box-shadow: 0 1px 5px 0 ${transformColor(colors[2]).alpha(0.2)};
            }
          `,
        }}
      />
    </>
  );
});
