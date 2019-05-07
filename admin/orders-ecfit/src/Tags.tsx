// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import { Tag } from 'antd';
import { gql } from 'apollo-boost';
import idx from 'idx';

import { withNamespaces } from '@admin/utils/lib/i18n';

import { TAGS_KEYS } from './constants';
import emptyArrayToUndefined from './utils/emptyArrayToUndefined';
import styles from './styles/tags.less';

// graphql typescript
import { tagsPaymentListFragment as tagsPaymentListFragmentType } from './__generated__/tagsPaymentListFragment';
import { tagsShipmentListFragment as tagsShipmentListFragmentType } from './__generated__/tagsShipmentListFragment';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

// definition
export const tagsPaymentListFragment = gql`
  fragment tagsPaymentListFragment on StorePaymentList {
    data {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;

export const tagsShipmentListFragment = gql`
  fragment tagsShipmentListFragment on StoreShipmentList {
    data {
      id
      title {
        ...localeFragment
      }
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
    getStorePaymentList,
    getStoreShipmentList,
  }: I18nPropsType &
    Pick<getEcfitListQueryPropsType, 'variables' | 'refetch'> & {
      getStorePaymentList: tagsPaymentListFragmentType;
      getStoreShipmentList: tagsShipmentListFragmentType;
    }) => (
    <div className={styles.root}>
      {TAGS_KEYS.map(key => {
        const options = idx(variables, _ => _.filter[key]) || [];

        return options.map((option: string) => (
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
            {key !== 'paymentIdList' && key !== 'shipmentIdList'
              ? t(`${key}.${option}`)
              : idx(
                  ({
                    paymentIdList: getStorePaymentList.data,
                    shipmentIdList: getStoreShipmentList.data,
                  }[key] as {
                    id: string;
                    title: {
                      zh_TW: string;
                      en_US: string;
                      ja_JP: string;
                    };
                  }[]).find(({ id }) => id === option),
                  _ => _.title[i18n.language],
                ) || ''}
          </Tag>
        ));
      })}
    </div>
  ),
);

export default withNamespaces('orders-ecfit')(Tags);
