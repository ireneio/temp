// typescript import
import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React, { useState } from 'react';
import moment from 'moment';
import { Icon, Drawer } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import Link from '@store/link';

import styles from './styles/mobileColumn.less';

// graphql typescript
import {
  getOrders_viewer_orders_edges_node as getOrdersViewerOrdersEdgesNode,
  getOrders_getColorList as getOrdersGetColorList,
} from './__generated__/getOrders';

// typescript definition
interface PropsType extends I18nPropsType, getOrdersViewerOrdersEdgesNode {
  children: React.ReactNode;
}

// definition
const MobileColumn = React.memo(
  ({
    t,
    id,
    createdOn,
    orderNo,
    paymentInfo,
    shipmentInfo,
    status,
    children,
  }: PropsType) => {
    const [drawerVisible, toggleDrawer] = useState(false);

    return (
      <>
        <div className={styles.root} onClick={() => toggleDrawer(true)}>
          <div>
            {moment
              .unix(createdOn || 0 /** TODO: should not be null */)
              .format('YYYY/MM/DD')}
          </div>

          <h4>
            {t('order.no')}：<div className={styles.link}>{orderNo}</div>
          </h4>

          <div className={styles.status}>
            <div>
              <Icon type="pay-circle-o" />

              {t(
                `payment.${
                  paymentInfo?.status
                  /** TODO: should not be null */
                }`,
              )}
            </div>

            <div>
              <Icon type="inbox" />

              {t(
                `shipment.${
                  shipmentInfo?.status
                  /** TODO: should not be null */
                }`,
              )}
            </div>

            <div>
              <Icon type="profile" />

              {t(`status.${status}`)}
            </div>
          </div>
        </div>

        <Drawer
          className={styles.drawer}
          onClose={() => toggleDrawer(false)}
          visible={drawerVisible}
          placement="bottom"
          closable={false}
          height="auto"
        >
          <h5>
            {t('order.no')}：{orderNo}
          </h5>

          <Link href={`/order/${id}`}>
            <a href={`/order/${id}`}>{t('order.detail')}</a>
          </Link>

          {children}
        </Drawer>
      </>
    );
  },
);

/**
 * Mobile style will render to many times. Should not use style dom.
 */
export const getMobileStyles = (
  colors: getOrdersGetColorList['colors'],
): string => `
  .${styles.drawer} {
    color: ${colors[3]};
  }

  .${styles.drawer} h5 {
    background: ${colors[4]};
  }
`;

export default withTranslation('member-orders')(MobileColumn);
