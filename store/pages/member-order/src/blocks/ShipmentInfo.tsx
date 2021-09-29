// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

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
    shipmentInfo: { number, recipient, description },
    cvsShipmentNo,
  }: PropsType) => {
    const { t } = useTranslation('member-order');
    const receiverStoreName = recipient?.receiverStoreName;

    return (
      <>
        <div>
          {!(number || cvsShipmentNo) ? null : (
            <div>
              {t('blocks.shipment.number')}

              {number || cvsShipmentNo}
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
