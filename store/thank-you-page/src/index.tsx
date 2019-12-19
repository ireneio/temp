// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';
import { OptionType } from '@store/ad-track/lib/utils/getPurchaseTrack';

// import
import React, { useEffect, useContext } from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Spin, Icon, Progress, Button, message } from 'antd';
import Clipboard from 'clipboard';

import { withTranslation } from '@store/utils/lib/i18n';
import getLinkProps from '@store/utils/lib/getLinkProps';
import adTrackContext from '@store/ad-track';

import styles from './styles/index.less';

// graphql typescript
import {
  getOrderInThankYouPage,
  getOrderInThankYouPage_viewer as getOrderInThankYouPageViewer,
} from './__generated__/getOrderInThankYouPage';

// typescript definition
interface PropsType extends I18nPropsType {
  order: getOrderInThankYouPageViewer['order'];
  href: string;
}

// definition
const ThankYouPage = withTranslation('thank-you-page')(
  React.memo(({ t, href, order }: PropsType) => {
    const { adTrack } = useContext(adTrackContext);

    useEffect(() => {
      if (!order)
        new Clipboard('button[role="copy"]', {
          text: () => `${t('data-error')}${href}`,
        }).on('success', () => {
          message.success(t('copied'));
        });
    }, [t, order, href]);
    useEffect(() => {
      if (order)
        adTrack.purchase({
          orderNo: order.orderNo || '', // FIXME: should not be null
          products: (order?.products || []).reduce(
            // FIXME: should not be null
            (result: OptionType['products'], data) => {
              if (!data) return result;

              const product = result.find(
                ({ productId }) => productId === data.productId,
              );

              if (!product)
                return [...result, data as OptionType['products'][number]];

              product.quantity += data.quantity || 0;

              return result;
            },
            [],
          ),
          total: order?.priceInfo?.total || 0, // FIXME: should not be null
          currency: order?.priceInfo?.currency || 'TWD', // FIXME: should not be null
          shipmentFee: order?.priceInfo?.shipmentFee || 0, // FIXME: should not be null
          paymentFee: order?.priceInfo?.paymentFee || 0, // FIXME: should not be null
        });
    }, [order, adTrack]);

    return (
      <div className={styles.root}>
        <div className={styles.header} />

        <div>
          <Progress
            type="circle"
            percent={100}
            width={72}
            {...(!order ? { status: 'exception', format: () => '!' } : {})}
          />

          <h1>{!order ? t('title.error') : t('title.default')}</h1>

          <p>{!order ? t('info.error') : t('info.default')}</p>

          <div className={styles.buttonRoot}>
            <Button onClick={() => Router.push('/')}>{t('return')}</Button>

            <Button
              {...(!order
                ? {
                    role: 'copy',
                  }
                : {
                    onClick: () => {
                      const linkProps = getLinkProps(`/order/${order.id}`);

                      Router.push(linkProps.href, linkProps.as);
                    },
                  })}
            >
              {!order ? t('copy') : t('order')}
            </Button>
          </div>
        </div>
      </div>
    );
  }),
);

export default ({
  orderId,
  href,
}: {
  orderId: string;
  href: string;
}): React.ReactElement => (
  <Query<getOrderInThankYouPage>
    query={gql`
      query getOrderInThankYouPage($orderId: ID!) {
        viewer {
          id
          order(orderId: $orderId) {
            id
            orderNo
            products {
              id
              productId
              type
              sku
              title {
                zh_TW
              }
              specs {
                title {
                  zh_TW
                }
              }
              totalPrice
              quantity
            }

            priceInfo {
              total
              shipmentFee
              paymentFee
              currency
            }
          }
        }
      }
    `}
    variables={{
      orderId,
    }}
  >
    {({ loading, data }) => {
      if (loading) return <Spin indicator={<Icon type="loading" spin />} />;

      return <ThankYouPage order={data?.viewer?.order || null} href={href} />;
    }}
  </Query>
);
