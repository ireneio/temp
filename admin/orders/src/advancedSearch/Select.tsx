// typescript import
import { languageType } from '@meepshop/utils/lib/i18n';

import { OrdersQueryResult } from '../constants';

// import
import React, { useMemo } from 'react';
import { Select } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import emptyArrayToUndefined from '../utils/emptyArrayToUndefined';

// graphql typescript
import {
  advancedSearchStorePaymentFragment as advancedSearchStorePaymentFragmentType,
  advancedSearchStorePaymentFragment_title as advancedSearchStorePaymentFragmentTitle,
  advancedSearchStoreShipmentFragment as advancedSearchStoreShipmentFragmentType,
  EcfitOrderFilterInput,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  storePayments: advancedSearchStorePaymentFragmentType[];
  storeShipments: advancedSearchStoreShipmentFragmentType[];
  optionsKey: keyof EcfitOrderFilterInput;
  options: string[];
  filter: OrdersQueryResult['variables']['filter'];
  setFilter: (filter: OrdersQueryResult['variables']['filter']) => void;
}

// definition
const { Option } = Select;

export default ({
  storePayments,
  storeShipments,
  optionsKey,
  options,
  filter,
  setFilter,
}: PropsType): React.ReactElement => {
  const { t, i18n } = useTranslation('orders');
  const Options = useMemo(() => {
    switch (optionsKey) {
      case 'paymentIdList':
      case 'shipmentIdList':
        return ({
          paymentIdList: storePayments,
          shipmentIdList: storeShipments,
        }[optionsKey] as {
          id: string;
          title: advancedSearchStorePaymentFragmentTitle;
        }[]).map(({ id, title }) => (
          <Option key={id} value={id}>
            {title[i18n.language as languageType] || title.zh_TW}
          </Option>
        ));
      default:
        return options.map(key =>
          !key ? null : (
            <Option key={key} value={key}>
              {t(`${optionsKey}.${key}`)}
            </Option>
          ),
        );
    }
  }, [t, i18n, options, optionsKey, storePayments, storeShipments]);

  return (
    <Select
      value={(filter?.[optionsKey] || []) as string[]}
      onChange={(value?: string[]) =>
        setFilter({
          ...filter,
          [optionsKey]: emptyArrayToUndefined(value || []),
        })
      }
      placeholder={`${t('advanced-search.pre-placeholder')}${t(
        `advanced-search.${optionsKey}-title`,
      )}`}
      mode="multiple"
    >
      {Options}
    </Select>
  );
};
