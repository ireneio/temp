// typescript import
import { ConvenienceStorePropsType } from './constants';
import { ConvenienceStoresInputType } from './StoreList';

// import
import React, { useState } from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';

import SearchInput from './SearchInput';
import StoreList from './StoreList';
import StoreDetail from './StoreDetail';

// graphql typescript
import { storeDetailFragment as storeDetailFragmentType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { storeDetailFragment } from './gqls/storeDetail';

// definition
export default React.memo(
  ({ shipmentType, storeTypes, confirmStore }: ConvenienceStorePropsType) => {
    const { t } = useTranslation('convenience-store-map');
    const [store, setStore] = useState<storeDetailFragmentType | null>(null);
    const [variables, setVariables] = useState<ConvenienceStoresInputType>({});

    return (
      <>
        <div>
          <SearchInput
            label={t('pleaseEnterStoreNumber')}
            setVariables={(value: string) => {
              setVariables({ storeNumber: value });
            }}
          />
          <StoreList
            variables={variables}
            shipmentType={shipmentType}
            storeTypes={storeTypes}
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
