// import
import React from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { shipmentInfoFragment as shipmentInfoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  shipmentInfo: shipmentInfoFragmentType;
  cvsShipmentNo?: string | null;
}

// definition
export default React.memo(
  ({
    shipmentInfo: { template, number, recipient, description },
    cvsShipmentNo,
  }: PropsType) => {
    const { t } = useTranslation('member-order');
    const receiverStoreName = recipient?.receiverStoreName;
    const isAllpay = template === 'allpay';

    return (
      <>
        <div>
          {!number && !cvsShipmentNo ? null : (
            <div>
              {t('blocks.shipment.number')}

              {isAllpay ? cvsShipmentNo : number}
            </div>
          )}

          {!receiverStoreName ? null : (
            <>
              <div>
                {t('blocks.shipment.store.id')}

                {recipient?.receiverStoreID}
              </div>

              <div>
                {t('blocks.shipment.store.name')}

                {receiverStoreName}
              </div>

              <div>
                {t('blocks.shipment.store.address')}

                {recipient?.receiverStoreAddress}
              </div>
            </>
          )}
        </div>

        {!description ? null : <pre>{description}</pre>}
      </>
    );
  },
);
