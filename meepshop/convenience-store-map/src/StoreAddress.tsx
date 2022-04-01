// typescript import
import { ConvenienceStorePropsType } from './constants';
import { ConvenienceStoresInputType } from './StoreList';

// import
import React, { useState } from 'react';

import filter from '@meepshop/utils/lib/filter';

import AddressSelect from './AddressSelect';
import StoreList from './StoreList';
import StoreDetail from './StoreDetail';

// graphql typescript
import { storeDetailFragment as storeDetailFragmentType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { storeDetailFragment } from './gqls/storeDetail';

// definition
export default React.memo(
  ({ shipmentType, storeTypes, confirmStore }: ConvenienceStorePropsType) => {
    const [store, setStore] = useState<storeDetailFragmentType | null>(null);
    const [variables, setVariables] = useState<ConvenienceStoresInputType>({});

    return (
      <>
        <div>
          <AddressSelect
            shipmentType={shipmentType}
            storeTypes={storeTypes}
            variables={variables}
            setVariables={setVariables}
          />
          <StoreList
            shipmentType={shipmentType}
            storeTypes={storeTypes}
            selectedStoreNumber={store?.storeNumber}
            variables={variables}
            selectStore={setStore}
          />
        </div>
        <StoreDetail
          shipmentType={shipmentType}
          store={filter<storeDetailFragmentType>(storeDetailFragment, store)}
          reselectStore={() => setStore(null)}
          confirmStore={confirmStore}
        />
      </>
    );
  },
);
