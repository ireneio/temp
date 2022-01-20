// imoprt
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Button } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';

import StoreShipmentDetail from './StoreShipmentDetail';
import styles from './styles/storeShipment.less';

// graphql typescript
import {
  storeShipmentUserFragment as storeShipmentUserFragmentType,
  storeShipmentUniMartC2CRedirectInfoFragment as storeShipmentUniMartC2CRedirectInfoFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { storeShipmentDetailFragment } from './gqls/storeShipmentDetail';

// typescript definition
interface PropsType {
  viewer: storeShipmentUserFragmentType | null;
  uniMartC2CRedirectInfo: storeShipmentUniMartC2CRedirectInfoFragmentType | null;
}

// definition
export default React.memo(({ viewer, uniMartC2CRedirectInfo }: PropsType) => {
  const { t } = useTranslation('order-print');
  const logisticsSubType =
    viewer?.order?.shipmentInfo?.list?.[0]?.storeShipmentDetails?.accountInfo
      ?.allPay?.logisticsSubType || null;

  return (
    <>
      {!uniMartC2CRedirectInfo || logisticsSubType !== 'UNIMARTC2C' ? null : (
        <form
          action={uniMartC2CRedirectInfo.requestUrl}
          target="_blank"
          method="post"
        >
          {Object.entries(uniMartC2CRedirectInfo.requestOption).map(
            ([key, value]) => (
              <input key={key} value={value} name={key} type="hidden" />
            ),
          )}
          <Tooltip
            placement="bottom"
            title={
              <>
                {t('store-shipment.tooltip')}
                <br />
                <a
                  href="https://supportmeepshop.com/knowledgebase/列印出貨單-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('store-shipment.how')}
                </a>
              </>
            }
          >
            <Button className={styles.submit} type="primary" htmlType="submit">
              {t('store-shipment.print-shipment')}
            </Button>
          </Tooltip>
        </form>
      )}
      <div className={styles.root}>
        <StoreShipmentDetail
          viewer={filter(storeShipmentDetailFragment, viewer)}
        />
      </div>
    </>
  );
});
