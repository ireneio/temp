// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

import { Blocks } from './index';

// import
import React from 'react';
import gql from 'graphql-tag';

import { withTranslation } from '@store/utils/lib/i18n';

// graphql typescript
import { shipmentInfoFragment as shipmentInfoFragmentType } from './__generated__/shipmentInfoFragment';

// typescript definition
interface PropsType extends I18nPropsType {
  shipmentInfo: shipmentInfoFragmentType;
  children: Blocks['renderDescription'];
}

// definition
export const shipmentInfoFragment = gql`
  fragment shipmentInfoFragment on shipmentObjectType {
    number
    recipient {
      receiverStoreName
      receiverStoreID
      receiverStoreAddress
    }
    description
  }
`;

export default withTranslation('member-order')(
  ({
    t,
    children,
    shipmentInfo: { number, recipient, description },
  }: PropsType) => {
    const receiverStoreName = recipient?.receiverStoreName;

    return children([
      !number ? null : (
        <div>
          {t('blocks.shipment.number')}
          {number}
        </div>
      ),
      !receiverStoreName ? null : (
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
      ),
      !description ? null : <pre>{description}</pre>,
    ]);
  },
);
