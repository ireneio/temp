// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import PaymentInfo from './paymentInfo';
import ShipmentInfo from './ShipmentInfo';
import LogisticTracking from './LogisticTracking';
import InvoiceInfo from './invoiceInfo';
import styles from './styles/index.less';

// graphql typescript
import { blocksFragment as blocksFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { paymentInfoFragment } from './paymentInfo/gqls';
import { shipmentInfoFragment } from './gqls/shipmentInfo';
import { logisticTrackingFragment } from './gqls/logisticTracking';
import { invoiceInfoFragment } from './invoiceInfo/gqls';

// typescript definition
interface PropsType {
  order: blocksFragmentType;
}

// definition
export default React.memo(
  ({
    order: {
      userInfo,
      shipmentInfo,
      paymentInfo,
      status,
      invoices,
      latestLogisticTracking,
      ...order
    },
  }: PropsType) => {
    const colors = useContext(ColorsContext);
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
                cvsShipmentNo={latestLogisticTracking?.cvsShipmentNo}
              />

              {!latestLogisticTracking ? null : (
                <LogisticTracking
                  latestLogisticTracking={filter(
                    logisticTrackingFragment,
                    latestLogisticTracking,
                  )}
                />
              )}
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
