// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { shipmentInfoFragment as shipmentInfoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  shipmentInfo: shipmentInfoFragmentType;
  cvsShipmentNo?: string | null;
  prescoShipmentNumber?: string | null;
}

// definition
export default React.memo(
  ({
    shipmentInfo: { template, number, recipient, description },
    cvsShipmentNo,
    prescoShipmentNumber,
  }: PropsType) => {
    const { t } = useTranslation('member-order');
    const receiverStoreName = recipient?.receiverStoreName;

    return (
      <>
        <div>
          {!(number || cvsShipmentNo || prescoShipmentNumber) ? null : (
            <div>
              {t('blocks.shipment.number')}

              {template === 'presco'
                ? prescoShipmentNumber
                : number || cvsShipmentNo}
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
