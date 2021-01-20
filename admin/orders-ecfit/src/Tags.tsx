// typescript import
import { I18nPropsType } from '@meepshop/utils/lib/i18n';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import { Tag } from 'antd';
import gql from 'graphql-tag';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import { TAGS_KEYS } from './constants';
import emptyArrayToUndefined from './utils/emptyArrayToUndefined';
import styles from './styles/tags.less';

// graphql typescript
import {
  tagsStorePaymentFragment as tagsStorePaymentFragmentType,
  tagsStorePaymentFragment_title as tagsStorePaymentFragmentTitle,
  tagsStoreShipmentFragment as tagsStoreShipmentFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// typescript definition
interface PropsType
  extends I18nPropsType,
    Pick<getEcfitListQueryPropsType, 'variables' | 'refetch'> {
  storePayments: tagsStorePaymentFragmentType[];
  storeShipments: tagsStoreShipmentFragmentType[];
}

// definition
export const tagsStorePaymentFragment = gql`
  fragment tagsStorePaymentFragment on StorePayment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export const tagsStoreShipmentFragment = gql`
  fragment tagsStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

const Tags = React.memo(
  ({
    t,
    i18n,
    variables,
    refetch,
    storePayments,
    storeShipments,
  }: PropsType) => (
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
                      ...variables.filter,
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
                {!title
                  ? t(`${key}.${option}`)
                  : title[i18n.language] || title.zh_TW}
              </Tag>
            );
          },
        ),
      )}
    </div>
  ),
);

export default withTranslation('orders-ecfit')(Tags);
