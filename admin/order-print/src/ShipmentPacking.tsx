// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import StoreShipmentDetail from './StoreShipmentDetail';
import PackingListDetail from './PackingListDetail';
import styles from './styles/shipmentPacking.less';

// graphql typescript
import { shipmentPackingFragment as shipmentPackingFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { storeShipmentDetailFragment } from './gqls/storeShipmentDetail';
import { packingListDetailFragment } from './gqls/packingListDetail';

// typescript definition
interface PropsType {
  viewer: shipmentPackingFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  return (
    <div className={styles.root}>
      <div className={styles.shipment}>
        <StoreShipmentDetail
          viewer={filter(storeShipmentDetailFragment, viewer || null)}
        />
      </div>
      <div className={styles.line} />
      <PackingListDetail
        viewer={filter(packingListDetailFragment, viewer || null)}
      />
    </div>
  );
});
