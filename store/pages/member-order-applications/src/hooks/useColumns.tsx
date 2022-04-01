// typescript import
import { ColumnProps } from 'antd/lib/table';

import { languageType } from '@meepshop/locales';

// import
import React, { useMemo, useContext } from 'react';

import { useTranslation } from '@meepshop/locales';
import Thumbnail from '@meepshop/thumbnail';
import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import styles from '../styles/useColumns.less';

// graphql typescript
import {
  useColumnsOrderApplyFragment as useColumnsOrderApplyFragmentType,
  useColumnsMemberOrderApplicationsFragment_applications_extra as useColumnsMemberOrderApplicationsFragmentApplicationsExtraType,
  useColumnsMemberOrderApplicationsFragment_applications_extra_product as useColumnsMemberOrderApplicationsFragmentApplicationsExtraProductType,
} from '@meepshop/types/gqls/store';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export default (
  applicationType: useColumnsOrderApplyFragmentType['applicationType'],
): ColumnProps<
  useColumnsMemberOrderApplicationsFragmentApplicationsExtraType
>[] => {
  const {
    t,
    i18n: { language },
  } = useTranslation('member-order-applications');
  const colors = useContext(ColorsContext);
  const type = t(`type.${applicationType}`);

  return useMemo(
    () => [
      {
        dataIndex: ['product', 'coverImage'],
        width: '10%',
        align: 'center',
        render: (
          value: useColumnsMemberOrderApplicationsFragmentApplicationsExtraProductType['coverImage'],
        ) => (
          <Thumbnail
            size={80}
            mobileSize={64}
            image={filter(thumbnailFragment, value || null)}
          />
        ),
      },
      {
        title: t('product.title'),
        dataIndex: ['product', 'title'],
        render: (
          value: useColumnsMemberOrderApplicationsFragmentApplicationsExtraProductType['title'],
          {
            applicationInfo,
            product,
          }: {
            applicationInfo: useColumnsMemberOrderApplicationsFragmentApplicationsExtraType['applicationInfo'];
            product: useColumnsMemberOrderApplicationsFragmentApplicationsExtraType['product'];
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
        dataIndex: ['applicationInfo', 'comment'],
      },
      {
        title: t('product.quantity'),
        dataIndex: ['quantity'],
        align: 'center',
      },
      {
        title: `${type}${t('status.title')}`,
        dataIndex: ['status'],
        align: 'center',
        render: (
          value: useColumnsMemberOrderApplicationsFragmentApplicationsExtraType['status'],
          {
            applicationStatus,
          }: {
            applicationStatus: useColumnsMemberOrderApplicationsFragmentApplicationsExtraType['applicationStatus'];
          },
        ) => (
          <div
            className={styles.tag}
            style={{ color: colors[2], background: colors[4] }}
          >
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
    [t, language, colors, type, applicationType],
  );
};
