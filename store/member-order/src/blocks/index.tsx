// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import transformColor from 'color';

import { useTranslation } from '@store/utils/lib/i18n';

import PaymentInfo from './paymentInfo';
import ShipmentInfo from './ShipmentInfo';
import InvoiceInfo from './invoiceInfo';
import styles from './styles/index.less';

// graphql typescript
import { getMemberOrder_getColorList as getMemberOrderGetColorList } from '../__generated__/getMemberOrder';
import { blocksFragment as blocksFragmentType } from './__generated__/blocksFragment';

// graphql import
import { paymentInfoFragment } from './paymentInfo';
import { shipmentInfoFragment } from './ShipmentInfo';
import { invoiceInfoFragment } from './invoiceInfo';

// typescript definition
interface PropsType {
  order: blocksFragmentType;
  colors: getMemberOrderGetColorList['colors'];
}

// definition
export const blocksFragment = gql`
  fragment blocksFragment on Order {
    id
    userInfo {
      name
      email
      mobile
    }
    address {
      fullAddress
    }
    shipmentInfo {
      status
      list {
        id
        name
        recipient {
          name
          email
          mobile
          comment
        }
        storeShipmentDetails {
          id
          searchLink
        }
        ...shipmentInfoFragment
      }
    }
    paymentInfo {
      id
      status
      list {
        id
        name
      }
    }
    invoices {
      ...invoiceInfoFragment
    }
    status
    ...paymentInfoFragment
  }
  ${paymentInfoFragment}
  ${shipmentInfoFragment}
  ${invoiceInfoFragment}
`;

export default React.memo(
  ({
    colors,
    order: { userInfo, shipmentInfo, paymentInfo, status, invoices, ...order },
  }: PropsType) => {
    const { t } = useTranslation('member-order');
    const shipmentObj = shipmentInfo?.list?.[0];
    const paymentObj = paymentInfo?.list?.[0];
    const searchLink = shipmentObj?.storeShipmentDetails?.searchLink;

    return (
      <div className={styles.root}>
        <div>
          <h4>{t('blocks.buyer')}</h4>

          <div className={styles.description}>
            {['name', 'email', 'mobile'].map(
              (key: 'name' | 'email' | 'mobile') => (
                <div key={key}>{userInfo?.[key]}</div>
              ),
            )}
          </div>
        </div>

        <div>
          <h4>{t('blocks.recipient')}</h4>

          <div className={styles.description}>
            {['name', 'email', 'mobile', 'address'].map(
              (key: 'name' | 'email' | 'mobile' | 'address') => (
                <div key={key}>
                  {key === 'address'
                    ? order?.address?.fullAddress
                    : shipmentObj?.recipient?.[key]}
                </div>
              ),
            )}
          </div>
        </div>

        <div>
          <h4>{t('blocks.payment.title')}</h4>

          <div className={styles.status}>
            {t(`blocks.payment.status.${paymentInfo?.status}`)}
          </div>
        </div>

        <div>
          <h4>{t('blocks.shipment.title')}</h4>

          <div className={styles.status}>
            {t(`blocks.shipment.status.${shipmentInfo?.status}`)}
          </div>
        </div>

        <div>
          <h4>{t('blocks.payment.type')}</h4>

          <div className={styles.status}>{paymentObj?.name}</div>

          <div className={`${styles.description} ${styles.border}`}>
            <PaymentInfo
              order={filter(paymentInfoFragment, {
                ...order,
                paymentInfo,
              })}
            />
          </div>
        </div>

        <div>
          <h4>{t('blocks.shipment.type')}</h4>

          <div className={styles.status}>{shipmentObj?.name}</div>

          {!searchLink ? null : (
            <a
              className={styles.link}
              href={searchLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('blocks.shipment.link')}
            </a>
          )}

          {!shipmentObj ? null : (
            <div className={`${styles.description} ${styles.border}`}>
              <ShipmentInfo
                shipmentInfo={filter(shipmentInfoFragment, shipmentObj)}
              />
            </div>
          )}
        </div>

        <div>
          <h4>{t('blocks.invoice.title')}</h4>

          <InvoiceInfo invoices={filter(invoiceInfoFragment, invoices)}>
            {(type: string | null, description: React.ReactNode) => (
              <>
                <div className={styles.status}>{type}</div>

                <div className={styles.description}>{description}</div>
              </>
            )}
          </InvoiceInfo>
        </div>

        <div>
          <h4>{t('blocks.order.title')}</h4>

          <div className={styles.status}>
            {t(`blocks.order.status.${status}`)}
          </div>

          <div className={styles.description}>
            {shipmentObj?.recipient?.comment?.split('\n').map((str: string) => (
              <div key={str}>{str}</div>
            ))}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.description} {
              color: ${colors[3]};
              background: ${transformColor(colors[4]).alpha(0.1)};
            }

            .${styles.description}.${styles.border} > *::after {
              background: ${colors[5]};
            }

            .${styles.status} {
              color: ${colors[2]};
              background: ${colors[4]};
            }

            .${styles.link} {
              border: 1px solid ${colors[3]};
            }
          `,
          }}
        />
      </div>
    );
  },
);
