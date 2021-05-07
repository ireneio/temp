// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Icon } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { convenienceStoreMapStore } from '@meepshop/images';

import useCheckStoreDisabled from './hooks/useCheckStoreDisabled';
import styles from './styles/storeList.less';

// graphql typescript
import {
  storeDetailFragment as storeDetailFragmentType,
  ConvenienceStoreTypeEnum as ConvenienceStoreTypeEnumType,
  getValidatedConvenienceStores as getValidatedConvenienceStoresType,
  ConvenienceStoreShipmentTypeEnum as ConvenienceStoreShipmentTypeEnumType,
  ValidatedConvenienceStoreFilterInput as ValidatedConvenienceStoreFilterInputType,
  getValidatedConvenienceStoresVariables as getValidatedConvenienceStoresVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getValidatedConvenienceStores } from './gqls/storeList';

// typescript definition
export type ConvenienceStoresInputType = Omit<
  ValidatedConvenienceStoreFilterInputType,
  'shipmentType' | 'storeTypes'
>;

interface PropsType {
  variables: ConvenienceStoresInputType;
  storeTypes: ConvenienceStoreTypeEnumType[];
  shipmentType: ConvenienceStoreShipmentTypeEnumType;
  selectedStoreNumber?: string | null;
  selectStore: (store: storeDetailFragmentType) => void;
}

// definition
export default React.memo(
  ({
    variables,
    selectedStoreNumber,
    shipmentType,
    storeTypes,
    selectStore,
  }: PropsType) => {
    const { t } = useTranslation('convenience-store-map');
    const checkStoreDisabled = useCheckStoreDisabled(shipmentType);
    const { data } = useQuery<
      getValidatedConvenienceStoresType,
      getValidatedConvenienceStoresVariablesType
    >(getValidatedConvenienceStores, {
      skip: Object.keys(variables).length === 0,
      variables: { input: { ...variables, shipmentType, storeTypes } },
      onCompleted: ({ validatedConvenienceStores }) => {
        if (variables?.storeNumber)
          selectStore(validatedConvenienceStores[0] || null);
      },
    });

    const stores = data?.validatedConvenienceStores;

    if (!stores || (variables?.storeNumber && stores.length)) return null;

    if (!stores.length) {
      return (
        <div className={styles.noData}>
          <Icon type="search" />
          <img src={convenienceStoreMapStore} alt="Store List" />
          {t('noStore')}
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div className={styles.label}>
          {t('pleaseChooseStore')}
          <span>*{t('disabledStore')}</span>
        </div>
        <div className={styles.wrapper}>
          {stores.map(store => (
            <div
              key={store.storeNumber}
              className={`${
                store.storeNumber === selectedStoreNumber ? styles.selected : ''
              } ${checkStoreDisabled(store) ? styles.disabled : ''}`}
              onClick={() =>
                checkStoreDisabled(store) ? null : selectStore(store)
              }
            >
              {store.name}
              <div className={styles.address}>{store.address}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
