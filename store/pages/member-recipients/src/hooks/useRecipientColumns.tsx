// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { Divider } from 'antd';
import { filter } from 'graphql-anywhere';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';

import useDeleteRecipientAddress from './useDeleteRecipientAddress';
import styles from '../styles/useColumns.less';

// graphql typescript
import {
  useRecipientColumnsUserFragment as useRecipientColumnsUserFragmentType,
  useRecipientColumnsRecipientAddressFragment as useRecipientColumnsRecipientAddressFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useDeleteRecipientAddressFragment } from '../gqls/useDeleteRecipientAddress';

// definition
export default (
  viewer: useRecipientColumnsUserFragmentType | null,
  setSelectedId: (id: string | null) => void,
): ColumnProps<useRecipientColumnsRecipientAddressFragmentType>[] => {
  const { t } = useTranslation('member-recipients');
  const getLanguage = useGetLanguage();
  const deleteRecipientAddress = useDeleteRecipientAddress(
    filter(useDeleteRecipientAddressFragment, viewer),
  );

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
          }: useRecipientColumnsRecipientAddressFragmentType,
        ) =>
          [
            zipCode,
            getLanguage(country?.name),
            `${getLanguage(city?.name)}${getLanguage(area?.name)}${street ||
              ''}`,
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
        render: (
          value: useRecipientColumnsRecipientAddressFragmentType['id'],
        ) => (
          <>
            <Link href="#recipient">
              <span
                className={styles.action}
                onClick={() => setSelectedId(value)}
              >
                {t('edit')}
              </span>
            </Link>

            <Divider type="vertical" />

            <span
              className={styles.action}
              onClick={() => deleteRecipientAddress(value)}
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
          value: useRecipientColumnsRecipientAddressFragmentType['id'],
          {
            name,
            mobile,
            zipCode,
            country,
            city,
            area,
            street,
          }: useRecipientColumnsRecipientAddressFragmentType,
        ) => (
          <div className={styles.mobile}>
            <span>{t('name')}</span>
            <span>{name}</span>

            <span>{t('address')}</span>
            <span>{`${zipCode || ''}${getLanguage(country?.name)}${getLanguage(
              city?.name,
            )}${getLanguage(area?.name)}${street || ''}`}</span>

            <span>{t('mobile')}</span>
            <span>{mobile}</span>

            <span />
            <div>
              <Link href="#recipient">
                <span
                  className={styles.action}
                  onClick={() => setSelectedId(value)}
                >
                  {t('edit')}
                </span>
              </Link>

              <Divider type="vertical" />

              <span
                className={styles.action}
                onClick={() => deleteRecipientAddress(value)}
              >
                {t('remove')}
              </span>
            </div>
          </div>
        ),
      },
    ],
    [t, getLanguage, setSelectedId, deleteRecipientAddress],
  );
};
