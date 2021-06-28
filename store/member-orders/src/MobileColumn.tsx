// typescript import
import { ColorsType } from '@meepshop/context';

// import
import React, { useState } from 'react';
import moment from 'moment';
import {
  InboxOutlined,
  PayCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

import styles from './styles/mobileColumn.less';

// graphql typescript
import { useColumnsOrdersFragment_node as useColumnsOrdersFragmentNode } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType extends useColumnsOrdersFragmentNode {
  children: React.ReactNode;
}

// definition
export default React.memo(
  ({
    id,
    createdAt,
    orderNo,
    paymentInfo,
    shipmentInfo,
    status,
    children,
  }: PropsType) => {
    const { t } = useTranslation('member-orders');
    const [drawerVisible, toggleDrawer] = useState(false);

    return (
      <>
        <div className={styles.root} onClick={() => toggleDrawer(true)}>
          <div>{moment(createdAt).format('YYYY/MM/DD')}</div>

          <h4>
            {t('order.no')}：<div className={styles.link}>{orderNo}</div>
          </h4>

          <div className={styles.status}>
            <div>
              <PayCircleOutlined />

              {t(
                `payment.${
                  paymentInfo?.status
                  /** SHOULD_NOT_BE_NULL */
                }`,
              )}
            </div>

            <div>
              <InboxOutlined />

              {t(
                `shipment.${
                  shipmentInfo?.status
                  /** SHOULD_NOT_BE_NULL */
                }`,
              )}
            </div>

            <div>
              <ProfileOutlined />

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
export const getMobileStyles = (colors: ColorsType): string => `
  .${styles.drawer} {
    color: ${colors[3]};
  }

  .${styles.drawer} h5 {
    background: ${colors[4]};
  }
`;
