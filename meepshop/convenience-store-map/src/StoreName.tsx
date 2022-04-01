// typescript import
import { ConvenienceStorePropsType } from './constants';
import { ConvenienceStoresInputType } from './StoreList';

// import
import React, { useState } from 'react';

import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

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
            label={t('pleaseEnterName')}
            setVariables={(value: string) => setVariables({ name: value })}
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
          confirmStore={confirmStore}
          reselectStore={() => setStore(null)}
        />
      </>
    );
  },
);
