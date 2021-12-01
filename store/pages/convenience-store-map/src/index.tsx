// import
import React from 'react';
import { Modal } from 'antd';

import ConvenienceStoreMap from '@meepshop/convenience-store-map';

import styles from './styles/index.less';

// graphql typescript
import {
  ConvenienceStoreTypeEnum,
  ConvenienceStoreShipmentTypeEnum,
} from '@meepshop/types/gqls/store';

// definition
export default React.memo(() => (
  <div className={styles.root}>
    <ConvenienceStoreMap
      shipmentType={'ECPAY_B2C' as ConvenienceStoreShipmentTypeEnum}
      storeTypes={['UNIMART' as ConvenienceStoreTypeEnum]}
      confirmStore={value =>
        Modal.success({
          content: JSON.stringify(value),
        })
      }
    />
  </div>
));
