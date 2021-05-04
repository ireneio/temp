// typescript import
import { ColumnProps } from 'antd/lib/table';

import { languageType } from '@meepshop/locales';

// import
import React, { useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import Thumbnail from '@meepshop/thumbnail';

import styles from '../styles/application.less';

// graphql typescript
import {
  useColumnsOrderApplyFragment as useColumnsOrderApplyFragmentType,
  useColumnsFragment_applications_extra as useColumnsFragmentApplicationsExtraType,
  useColumnsFragment_applications_extra_product as useColumnsFragmentApplicationsExtraProductType,
} from '@meepshop/types/gqls/store';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export default (
  applicationType: useColumnsOrderApplyFragmentType['applicationType'],
): ColumnProps<useColumnsFragmentApplicationsExtraType>[] => {
  const {
    t,
    i18n: { language },
  } = useTranslation('member-order-applications');

  const type = t(`type.${applicationType}`);

  return useMemo(
    () => [
      {
        dataIndex: 'product.coverImage',
        width: '10%',
        align: 'center',
        render: (
          value: useColumnsFragmentApplicationsExtraProductType['coverImage'],
        ) => <Thumbnail image={filter(thumbnailFragment, value || null)} />,
      },
      {
        title: t('product.title'),
        dataIndex: 'product.title',
        render: (
          value: useColumnsFragmentApplicationsExtraProductType['title'],
          {
            applicationInfo,
            product,
          }: {
            applicationInfo: useColumnsFragmentApplicationsExtraType['applicationInfo'];
            product: useColumnsFragmentApplicationsExtraType['product'];
          },
        ) => {
          return (
            <>
              <div>
                {!value ? null : value[language as languageType] || value.zh_TW}
              </div>

              <div>
                {(product?.specs || [])
                  .map(
                    spec =>
                      spec?.title?.[language as languageType] ||
                      spec?.title?.zh_TW,
                  )
                  .filter(Boolean)
                  .join(' / ')}
              </div>

              <div className={styles.mobileShow}>
                {applicationInfo?.comment}
              </div>
            </>
          );
        },
      },
      {
        title: `${type}${t('reason')}`,
        dataIndex: 'applicationInfo.comment',
      },
      {
        title: t('product.quantity'),
        dataIndex: 'quantity',
        align: 'center',
      },
      {
        title: `${type}${t('status.title')}`,
        dataIndex: 'status',
        align: 'center',
        render: (
          value: useColumnsFragmentApplicationsExtraType['status'],
          {
            applicationStatus,
          }: {
            applicationStatus: useColumnsFragmentApplicationsExtraType['applicationStatus'];
          },
        ) => (
          <div className={styles.tag}>
            {[1, 2].includes(value || 0) ? (
              t(`status.${applicationType}.${value}`)
            ) : (
              <>
                {(applicationStatus || 0) > 0 ? type : null}
                {t(`status.${applicationStatus}`)}
              </>
            )}
          </div>
        ),
      },
    ],
    [t, language, type, applicationType],
  );
};
