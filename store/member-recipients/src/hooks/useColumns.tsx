// typescript import
import { ColumnProps } from 'antd/lib/table';

import { languageType } from '@meepshop/utils/lib/i18n';

// import
import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { Divider } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import useDeleteRecipientAddress from './useDeleteRecipientAddress';
import styles from './styles/useColumns.less';

// graphql typescript
import { useColumnsRecipientAddressFragment as useColumnsRecipientAddressFragmentType } from './__generated__/useColumnsRecipientAddressFragment';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

// definition
export const useColumnsRecipientAddressFragment = gql`
  fragment useColumnsRecipientAddressFragment on RecipientAddress {
    id
    name
    mobile
    country {
      id
      name {
        ...localeFragment
      }
    }
    city {
      id
      name {
        ...localeFragment
      }
    }
    area {
      id
      name {
        ...localeFragment
      }
    }
    zipCode
    street
  }

  ${localeFragment}
`;

export default (
  setSelectedId: (id: string | null) => void,
): ColumnProps<useColumnsRecipientAddressFragmentType>[] => {
  const { t, i18n } = useTranslation('member-recipients');
  const deleteRecipientAddress = useDeleteRecipientAddress();

  return useMemo(
    () => [
      {
        title: t('name'),
        dataIndex: 'name',
      },
      {
        title: t('address'),
        dataIndex: 'address',
        render: (
          _: unknown,
          {
            country,
            city,
            area,
            zipCode,
            street,
          }: useColumnsRecipientAddressFragmentType,
        ) =>
          [
            zipCode,
            !country
              ? null
              : country.name[i18n.language as languageType] ||
                country.name.zh_TW,
            `${
              !city
                ? ''
                : city.name[i18n.language as languageType] || city.name.zh_TW
            }${
              !area
                ? ''
                : area.name[i18n.language as languageType] || area.name.zh_TW
            }${street || ''}`,
          ]
            .filter(Boolean)
            .join(' '),
      },
      {
        title: t('mobile'),
        dataIndex: 'mobile',
      },
      {
        key: 'action',
        dataIndex: 'id',
        render: (value: useColumnsRecipientAddressFragmentType['id']) => (
          <>
            <span
              className={styles.action}
              onClick={() => setSelectedId(value)}
            >
              {t('edit')}
            </span>

            <Divider type="vertical" />

            <span
              className={styles.action}
              onClick={() =>
                deleteRecipientAddress({ variables: { input: { id: value } } })
              }
            >
              {t('remove')}
            </span>
          </>
        ),
      },
      {
        key: 'mobileStyle',
        dataIndex: 'id',
        render: (
          value: useColumnsRecipientAddressFragmentType['id'],
          {
            name,
            mobile,
            zipCode,
            country,
            city,
            area,
            street,
          }: useColumnsRecipientAddressFragmentType,
        ) => (
          <div className={styles.mobile}>
            <span>{t('name')}</span>
            <span>{name}</span>

            <span>{t('address')}</span>
            <span>{`${zipCode || ''}${
              !country
                ? ''
                : country.name[i18n.language as languageType] ||
                  country.name.zh_TW
            }${
              !city
                ? ''
                : city.name[i18n.language as languageType] || city.name.zh_TW
            }${
              !area
                ? ''
                : area.name[i18n.language as languageType] || area.name.zh_TW
            }${street || ''}`}</span>

            <span>{t('mobile')}</span>
            <span>{mobile}</span>

            <span />
            <div>
              <span
                className={styles.action}
                onClick={() => setSelectedId(value)}
              >
                {t('edit')}
              </span>

              <Divider type="vertical" />

              <span
                className={styles.action}
                onClick={() =>
                  deleteRecipientAddress({
                    variables: { input: { id: value } },
                  })
                }
              >
                {t('remove')}
              </span>
            </div>
          </div>
        ),
      },
    ],
    [t, i18n, setSelectedId, deleteRecipientAddress],
  );
};
