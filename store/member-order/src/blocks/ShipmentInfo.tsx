// import
import React from 'react';
import gql from 'graphql-tag';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { shipmentInfoFragment as shipmentInfoFragmentType } from './__generated__/shipmentInfoFragment';

// typescript definition
interface PropsType {
  shipmentInfo: shipmentInfoFragmentType;
}

// definition
export const shipmentInfoFragment = gql`
  fragment shipmentInfoFragment on shipmentObjectType {
    id
    number
    recipient {
      receiverStoreName
      receiverStoreID
      receiverStoreAddress
    }
    description
  }
`;

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
