// typescript import
import { OrdersQueryResult } from './constants';

// import
import React from 'react';
import { Tag } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

import { TAGS_KEYS } from './constants';
import emptyArrayToUndefined from './utils/emptyArrayToUndefined';
import styles from './styles/tags.less';

// graphql typescript
import {
  tagsStorePaymentFragment as tagsStorePaymentFragmentType,
  tagsStorePaymentFragment_title as tagsStorePaymentFragmentTitle,
  tagsStoreShipmentFragment as tagsStoreShipmentFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends Pick<OrdersQueryResult, 'variables' | 'refetch'> {
  storePayments: tagsStorePaymentFragmentType[];
  storeShipments: tagsStoreShipmentFragmentType[];
}

// definition
export default React.memo(
  ({ variables, refetch, storePayments, storeShipments }: PropsType) => {
    const { t } = useTranslation('orders');
    const getLanguage = useGetLanguage();

    return (
      <div className={styles.root}>
        {TAGS_KEYS.map(key =>
          (variables?.filter?.[key] || []).map(
            (option: string, _: number, options: string[]) => {
              const title =
                key !== 'paymentIdList' && key !== 'shipmentIdList'
                  ? null
                  : ({
                      paymentIdList: storePayments,
                      shipmentIdList: storeShipments,
                    }[key] as {
                      id: string;
                      title: tagsStorePaymentFragmentTitle;
                    }[]).find(({ id }) => id === option)?.title;

              return (
                <Tag
                  key={option}
                  onClose={() =>
                    refetch({
                      ...variables,
                      filter: {
                        ...variables?.filter,
                        [key]: emptyArrayToUndefined(
                          options.filter(
                            (optionName: string) => optionName !== option,
                          ),
                        ),
                      },
                    })
                  }
                  closable
                >
                  {t(`advanced-search.${key}-title`)}：
                  {!title ? t(`${key}.${option}`) : getLanguage(title)}
                </Tag>
              );
            },
          ),
        )}
      </div>
    );
  },
);
