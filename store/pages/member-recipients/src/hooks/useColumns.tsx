// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { Divider } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';

import useDeleteRecipientAddress from './useDeleteRecipientAddress';
import styles from '../styles/useColumns.less';

// graphql typescript
import { useColumnsRecipientAddressFragment as useColumnsRecipientAddressFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  setSelectedId: (id: string | null) => void,
): ColumnProps<useColumnsRecipientAddressFragmentType>[] => {
  const { t } = useTranslation('member-recipients');
  const getLanguage = useGetLanguage();
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
        render: (value: useColumnsRecipientAddressFragmentType['id']) => (
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
