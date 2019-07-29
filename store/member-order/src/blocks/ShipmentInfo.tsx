// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

import { Blocks } from './index';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import idx from 'idx';

import { withNamespaces } from '@store/utils/lib/i18n';

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

export default withNamespaces('member-order')(
  ({
    t,
    children,
    shipmentInfo: { number, recipient, description },
  }: PropsType) => {
    const receiverStoreName = idx(recipient, _ => _.receiverStoreName);

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
            {idx(recipient, _ => _.receiverStoreID)}
          </div>

          <div>
            {t('blocks.shipment.store.name')}
            {receiverStoreName}
          </div>

          <div>
            {t('blocks.shipment.store.address')}
            {idx(recipient, _ => _.receiverStoreAddress)}
          </div>
        </>
      ),
      !description ? null : <pre>{description}</pre>,
    ]);
  },
);
