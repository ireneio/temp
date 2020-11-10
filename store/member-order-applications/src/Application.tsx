// typescript import
import { ColumnProps } from 'antd/lib/table';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context/lib/Colors';

// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Table } from 'antd';
import moment from 'moment';
import memoizeOne from 'memoize-one';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import Thumbnail, { thumbnailFragment } from '@meepshop/thumbnail';

import styles from './styles/application.less';

// graphql typescript
import {
  getMemberOrderApplications_viewer_order_applications as getMemberOrderApplicationsViewerOrderApplications,
  getMemberOrderApplications_viewer_order_applications_extra as getMemberOrderApplicationsViewerOrderApplicationsExtra,
} from './__generated__/getMemberOrderApplications';
import { applicationOrderApplyFragment as applicationOrderApplyFragmentType } from './__generated__/applicationOrderApplyFragment';
import { applicationProductsObjectTypeFragment as applicationProductsObjectTypeFragmentType } from './__generated__/applicationProductsObjectTypeFragment';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

// typescript definition
interface PropTypes extends I18nPropsType {
  data: getMemberOrderApplicationsViewerOrderApplications;
}

// definition
export const applicationOrderApplyFragment = gql`
  fragment applicationOrderApplyFragment on OrderApply {
    id
    applicationType
    createdAt
    recipient {
      name
      mobile
      address {
        streetAddress
      }
    }
    applicationInfo {
      comment
    }
    quantity
    status
    applicationStatus
  }
`;

export const applicationProductsObjectTypeFragment = gql`
  fragment applicationProductsObjectTypeFragment on productsObjectType {
    id
    coverImage {
      ...thumbnailFragment
    }
    title {
      ...localeFragment
    }
    specs {
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
  ${thumbnailFragment}
`;

class Application extends React.PureComponent<PropTypes> {
  private columns: (
    t: I18nPropsType['t'],
    type: string,
    applicationType: getMemberOrderApplicationsViewerOrderApplications['applicationType'],
  ) => ColumnProps<
    getMemberOrderApplicationsViewerOrderApplicationsExtra
  >[] = memoizeOne((t, type, applicationType) => {
    const {
      i18n: { language },
    } = this.props;

    return [
      {
        dataIndex: 'product.coverImage',
        render: (
          value: applicationProductsObjectTypeFragmentType['coverImage'],
        ) => <Thumbnail image={filter(thumbnailFragment, value || null)} />,
        width: '10%',
        align: 'center',
      },
      {
        title: t('product.title'),
        dataIndex: 'product.title',
        render: (
          value: applicationProductsObjectTypeFragmentType['title'],
          { applicationInfo, product },
        ) => (
          <>
            <div>{!value ? null : value[language] || value.zh_TW}</div>

            <div>
              {(product?.specs || [])
                .map(spec => spec?.title?.[language] || spec?.title?.zh_TW)
                .filter(Boolean)
                .join(' / ')}
            </div>

            <div className={styles.mobileShow}>{applicationInfo?.comment}</div>
          </>
        ),
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
        render: (
          value: applicationOrderApplyFragmentType['status'],
          { applicationStatus },
        ) => (
          <div className={styles.tag}>
            {[1, 2].includes(value || 0) ? (
              t(`status.${applicationType}.${value}`)
            ) : (
              <span>
                {(applicationStatus || 0) > 0 ? type : null}
                {t(`status.${applicationStatus}`)}
              </span>
            )}
          </div>
        ),
        align: 'center',
      },
    ];
  });

  public render(): React.ReactNode {
    const {
      /** context */
      t,

      /** props */
      data,
    } = this.props;
    const { applicationType, createdAt, recipient } = data;
    const type = t(`type.${applicationType}`);

    return (
      <div className={styles.root}>
        <div className={styles.receiverInfo}>
          <h4>
            {t('apply')}
            {type}
          </h4>
          <h4>
            {t('date')}
            {moment(createdAt).format('YYYY/MM/DD')}
          </h4>
          {applicationType === 'return' ? null : (
            <>
              <h4>
                {t('recipient')}
                {recipient?.name}
              </h4>
              <h4>
                {t('phone')}
                {recipient?.mobile}
              </h4>
              <h4>
                {t('address')}
                {recipient?.address?.streetAddress}
              </h4>
            </>
          )}
        </div>

        <Table
          rowKey="id"
          dataSource={data.extra}
          columns={this.columns(t, type, applicationType)}
          pagination={false}
        />
      </div>
    );
  }
}

export const getApplicationStyles = (colors: ColorsType): string => `
  .${styles.tag} {
    color: ${colors[2]};
    background: ${colors[4]};
  }
`;

export default withTranslation('member-order-applications')(Application);
