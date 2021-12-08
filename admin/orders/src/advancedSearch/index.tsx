// typescript import
import { OrdersQueryResult } from '../constants';

// import
import React, { useState } from 'react';
import { Popover, Divider, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import { ADVANCED_SEARCH_ITEMS } from '../constants';
import Select from './Select';
import useAdvancedSearch from './hooks/useAdvancedSearch';
import styles from './styles/index.less';

// graphql typescript
import {
  advancedSearchStorePaymentFragment as advancedSearchStorePaymentFragmentType,
  advancedSearchStoreShipmentFragment as advancedSearchStoreShipmentFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends Pick<OrdersQueryResult, 'variables' | 'refetch'> {
  rootRef: React.RefObject<HTMLDivElement>;
  storePayments: advancedSearchStorePaymentFragmentType[];
  storeShipments: advancedSearchStoreShipmentFragmentType[];
}

// definition
export default React.memo(
  ({
    variables,
    refetch,
    rootRef,
    storePayments,
    storeShipments,
  }: PropsType) => {
    const { t } = useTranslation('orders');
    const [isVisible, setIsVisible] = useState(false);
    const [filter, setFilter] = useState(variables?.filter);
    const { advancedSearch, onVisibleChange } = useAdvancedSearch({
      variables,
      refetch,
      setIsVisible,
      filter,
      setFilter,
    });

    return (
      <Popover
        overlayClassName={styles.root}
        visible={isVisible}
        content={
          <>
            {ADVANCED_SEARCH_ITEMS.map(({ optionsKey, options }, index) =>
              optionsKey === 'divider' ? (
                // eslint-disable-next-line react/no-array-index-key
                <Divider key={`${optionsKey}-${index}`} />
              ) : (
                <div key={optionsKey} className={styles.item}>
                  <span className={styles.title}>
                    {t(`advanced-search.${optionsKey}-title`)}
                  </span>

                  <Select
                    storePayments={storePayments}
                    storeShipments={storeShipments}
                    optionsKey={optionsKey}
                    options={options || []}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </div>
              ),
            )}

            <div className={styles.buttons}>
              <span onClick={() => setFilter(null)}>
                {t('advanced-search.reset')}
              </span>

              <Button
                type="primary"
                onClick={() => {
                  setIsVisible(false);
                  advancedSearch();
                }}
              >
                {t('advanced-search.filter')}
              </Button>
            </div>
          </>
        }
        onVisibleChange={onVisibleChange}
        placement="bottomLeft"
        trigger="click"
        getPopupContainer={() => rootRef.current || document.body}
      >
        <Button>{t('filter.advanced-search')}</Button>
      </Popover>
    );
  },
);
