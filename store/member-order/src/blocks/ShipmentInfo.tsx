// import
import React from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { shipmentInfoFragment as shipmentInfoFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  shipmentInfo: shipmentInfoFragmentType;
}

// definition
export default React.memo(
  ({ shipmentInfo: { number, recipient, description } }: PropsType) => {
    const { t } = useTranslation('member-order');
    const receiverStoreName = recipient?.receiverStoreName;

    return (
      <>
        {!number ? null : (
          <div>
            {t('blocks.shipment.number')}

            {number}
          </div>
        )}

        {!receiverStoreName ? null : (
          <div>
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
          </div>
        )}

        {!description ? null : <pre>{description}</pre>}
      </>
    );
  },
);
