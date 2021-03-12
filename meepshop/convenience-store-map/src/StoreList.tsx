// typescript import
import { I18nPropsType } from '@meepshop/locales';

// import
import React from 'react';
import { Icon } from 'antd';
import memoizeOne from 'memoize-one';

import { withTranslation } from '@meepshop/locales';

import StoreIcon from './StoreIcon';
import styles from './styles/storeList.less';

// graphql typescript
import { getValidatedConvenienceStores_validatedConvenienceStores as getValidatedConvenienceStoresValidatedConvenienceStores } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType extends I18nPropsType {
  shipmentType?: string;
  stores: getValidatedConvenienceStoresValidatedConvenienceStores[];
  selectedStoreNumber?: string | null;
  selectStore?: (
    store: getValidatedConvenienceStoresValidatedConvenienceStores,
  ) => void;
}

// definition
class StoreList extends React.PureComponent<PropsType> {
  private isStoreDisabled = memoizeOne(
    (store: getValidatedConvenienceStoresValidatedConvenienceStores) => {
      const { shipmentType } = this.props;

      switch (shipmentType) {
        case 'EZSHIP':
          return !store.ezshipStoreNumber;
        default:
          return !store.ecpayStoreNumber;
      }
    },
  );

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      stores,
      selectedStoreNumber,
      selectStore,
    } = this.props;

    return (
      <div>
        {!stores.length ? (
          <div className={styles.noData}>
            <Icon type="search" />
            <StoreIcon />
            {t('noStore')}
          </div>
        ) : (
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
                    store.storeNumber === selectedStoreNumber
                      ? styles.selected
                      : ''
                  } ${this.isStoreDisabled(store) ? styles.disabled : ''}`}
                  onClick={() =>
                    this.isStoreDisabled(store) || !selectStore
                      ? null
                      : selectStore(store)
                  }
                >
                  {store.name}
                  <div className={styles.address}>{store.address}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation('convenience-store-map')(StoreList);
