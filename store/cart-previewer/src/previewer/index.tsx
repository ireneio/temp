// import
import React, { useContext, useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined, LeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import transformColor from 'color';
import { filter } from 'graphql-anywhere';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import Empty from './Empty';
import Products from './Products';
import Price from './Price';
import styles from './styles/index.less';

// graphql typescript
import {
  getCartListInPreviewer as getCartListInPreviewerType,
  getCartListInPreviewer_getCartList_data_categories_products as getCartListInPreviewerGetCartListDataCategoriesProductsType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getCartListInPreviewer } from './gqls';
import { useProductsColumnsInPreviewerFragment } from './gqls/useProductsColumns';
import { priceInPreviewerFragment } from './gqls/price';

// typescript definition
interface PropsType {
  onClose: () => void;
}

// definition
export default React.memo(({ onClose }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { c } = useContext(CurrencyContext);
  const { t } = useTranslation('cart');
  const { data } = useQuery<getCartListInPreviewerType>(getCartListInPreviewer);
  const productsRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const productsNode = productsRef.current;
    const onScroll = (): void => {
      if ((productsNode?.scrollTop || 0) > 0) setScrolled(true);
      else setScrolled(false);
    };

    if (productsNode) {
      productsNode.addEventListener('scroll', onScroll);
    }

    return () => {
      if (productsNode) productsNode.removeEventListener('scroll', onScroll);
    };
  }, []);

  const order = data?.getCartList?.data?.[0];

  if (!order) return <Spin indicator={<LoadingOutlined spin />} />;

  const products = order?.categories?.[0]?.products || [];

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <LeftOutlined onClick={onClose} />
          {t('cart')}
        </div>

        {!products.length ? (
          <Empty />
        ) : (
          <>
            <div className={styles.products} ref={productsRef}>
              <Products
                products={filter(
                  useProductsColumnsInPreviewerFragment,
                  products as getCartListInPreviewerGetCartListDataCategoriesProductsType[],
                )}
              />

              <Price order={filter(priceInPreviewerFragment, order)} />
            </div>

            <div className={styles.footer}>
              <div>
                <span>{t('total')}</span>
                <span>{c(order.priceInfo?.total || 0)}</span>
              </div>

              <Link href="/cart">
                <div className={styles.button}>{t('go-to-cart')}</div>
              </Link>
            </div>
          </>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              color: ${colors[3]};
              background-color: ${colors[0]};
              box-shadow: 0 2px 15px -3px ${transformColor(colors[3]).alpha(
                0.65,
              )};
            }

            .${styles.footer} {
              border-top-color: ${transformColor(colors[5]).alpha(0.5)};
            }

            .${styles.button} {
              color: ${colors[2]};
              background-color: ${colors[4]};
              box-shadow: 0 1px 5px 0 ${transformColor(colors[2]).alpha(0.2)};
            }

            ${
              !scrolled
                ? ''
                : `
              @media (max-width: ${styles.screenSmMax}) {
                .${styles.footer} {
                  box-shadow: 0 -2px 6px 0 ${transformColor(colors[3]).alpha(
                    0.1,
                  )};
                }
              }
            `
            }
          `,
        }}
      />
    </>
  );
});
